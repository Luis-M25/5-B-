import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../shared/data-persistence.service';
import { 
  FormaPagoDto, 
  ClienteDto, 
  ProcesarVentaDto, 
  VentaEnProcesoDto, 
  RegistrarClienteDto, 
  BuscarClienteDto 
} from '../../../websocket-api/shared/dtos';
import { Venta, Cliente, FormaPago } from '../../../shared/interfaces';

@Injectable()
export class VentasService {
  private ventasEnProceso: Map<string, VentaEnProcesoDto> = new Map();

  constructor(private readonly dataService: DataPersistenceService) {}

  // ==================== FORMAS DE PAGO ====================
  async obtenerFormasPago(): Promise<FormaPago[]> {
    try {
      const formasPago = await this.dataService.getAllFormasPago();
      return formasPago.filter(fp => fp.activo);
    } catch (error) {
      throw new Error(`Error al obtener formas de pago: ${error.message}`);
    }
  }

  async validarFormaPago(tipoFormaPago: string): Promise<boolean> {
    try {
      const formaPago = await this.dataService.getFormaPagoByTipo(tipoFormaPago);
      return formaPago?.activo || false;
    } catch (error) {
      return false;
    }
  }

  // ==================== CLIENTES ====================
  async buscarClientes(filtros: BuscarClienteDto): Promise<Cliente[]> {
    try {
      const clientes = await this.dataService.getAllClientes();

      if (filtros.cedula) {
        return clientes.filter(c => c.cedula.includes(filtros.cedula!));
      }

      if (filtros.nombre) {
        return clientes.filter(c => 
          c.nombre.toLowerCase().includes(filtros.nombre!.toLowerCase())
        );
      }

      if (filtros.telefono) {
        return clientes.filter(c => 
          c.telefono?.includes(filtros.telefono!)
        );
      }

      return clientes;
    } catch (error) {
      throw new Error(`Error al buscar clientes: ${error.message}`);
    }
  }

  async obtenerClientePorCedula(cedula: string): Promise<Cliente | null> {
    try {
      const clientes = await this.buscarClientes({ cedula });
      return clientes.find(c => c.cedula === cedula) || null;
    } catch (error) {
      return null;
    }
  }

  async registrarCliente(datos: RegistrarClienteDto): Promise<Cliente> {
    try {
      // Verificar si ya existe un cliente con esa cédula
      const clienteExistente = await this.obtenerClientePorCedula(datos.cedula);
      if (clienteExistente) {
        throw new Error('Ya existe un cliente con esa cédula');
      }

      const nuevoCliente: Cliente = {
        id: `cli_${Date.now()}`,
        ...datos,
        fechaRegistro: new Date(),
        tipoCliente: datos.tipoCliente || 'nuevo',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      };

      return await this.dataService.createCliente(nuevoCliente);
    } catch (error) {
      throw new Error(`Error al registrar cliente: ${error.message}`);
    }
  }

  // ==================== VENTAS ====================
  async iniciarVenta(datos: ProcesarVentaDto): Promise<VentaEnProcesoDto> {
    try {
      // Validaciones previas
      await this.validarDatosVenta(datos);

      const ventaId = `venta_${Date.now()}`;
      const tiempoEstimado = this.calcularTiempoEstimado(datos.litros);

      const ventaEnProceso: VentaEnProcesoDto = {
        id: ventaId,
        ...datos,
        estado: 'pendiente',
        fechaInicio: new Date(),
        progreso: 0,
        tiempoEstimado,
        numeroRecibo: this.generarNumeroRecibo()
      };

      this.ventasEnProceso.set(ventaId, ventaEnProceso);

      // Actualizar estado del surtidor
      await this.dataService.updateSurtidor(datos.surtidorId, { estado: 'ocupado' });

      return ventaEnProceso;
    } catch (error) {
      throw new Error(`Error al iniciar venta: ${error.message}`);
    }
  }

  async procesarVenta(ventaId: string): Promise<VentaEnProcesoDto> {
    try {
      const venta = this.ventasEnProceso.get(ventaId);
      if (!venta) {
        throw new Error('Venta no encontrada');
      }

      // Actualizar estado a procesando
      venta.estado = 'procesando';
      venta.progreso = 10;
      this.ventasEnProceso.set(ventaId, venta);

      // Simular procesamiento asíncrono
      this.simularProcesamientoVenta(ventaId);

      return venta;
    } catch (error) {
      throw new Error(`Error al procesar venta: ${error.message}`);
    }
  }

  async completarVenta(ventaId: string): Promise<Venta> {
    try {
      const ventaEnProceso = this.ventasEnProceso.get(ventaId);
      if (!ventaEnProceso) {
        throw new Error('Venta no encontrada');
      }

      // Crear la venta final
      const ventaCompleta: Venta = {
        id: ventaId,
        operadorId: ventaEnProceso.operadorId,
        surtidorId: ventaEnProceso.surtidorId,
        clienteId: ventaEnProceso.clienteId,
        tipoGasolina: ventaEnProceso.tipoGasolina,
        litros: ventaEnProceso.litros,
        precioLitro: ventaEnProceso.precioLitro,
        montoTotal: ventaEnProceso.montoTotal,
        formaPago: ventaEnProceso.formaPago,
        fechaVenta: new Date(),
        estado: 'completada',
        numeroRecibo: ventaEnProceso.numeroRecibo!,
        fechaCreacion: ventaEnProceso.fechaInicio,
        fechaActualizacion: new Date()
      };

      // Guardar la venta
      const ventaGuardada = await this.dataService.createVenta(ventaCompleta);

      // Actualizar inventario
      await this.actualizarInventario(ventaCompleta.tipoGasolina, ventaCompleta.litros);

      // Liberar surtidor
      await this.dataService.updateSurtidor(ventaCompleta.surtidorId, { estado: 'disponible' });

      // Remover de ventas en proceso
      this.ventasEnProceso.delete(ventaId);

      return ventaGuardada;
    } catch (error) {
      throw new Error(`Error al completar venta: ${error.message}`);
    }
  }

  async cancelarVenta(ventaId: string, motivo?: string): Promise<void> {
    try {
      const venta = this.ventasEnProceso.get(ventaId);
      if (!venta) {
        throw new Error('Venta no encontrada');
      }

      // Actualizar estado
      venta.estado = 'cancelada';
      this.ventasEnProceso.set(ventaId, venta);

      // Liberar surtidor
      await this.dataService.updateSurtidor(venta.surtidorId, { estado: 'disponible' });

      // Remover de ventas en proceso después de un tiempo
      setTimeout(() => {
        this.ventasEnProceso.delete(ventaId);
      }, 5000);
    } catch (error) {
      throw new Error(`Error al cancelar venta: ${error.message}`);
    }
  }

  async obtenerVentaEnProceso(ventaId: string): Promise<VentaEnProcesoDto | null> {
    return this.ventasEnProceso.get(ventaId) || null;
  }

  async obtenerVentasEnProceso(): Promise<VentaEnProcesoDto[]> {
    return Array.from(this.ventasEnProceso.values());
  }

  // ==================== MÉTODOS PRIVADOS ====================
  private async validarDatosVenta(datos: ProcesarVentaDto): Promise<void> {
    // Validar operador
    const operador = await this.dataService.getOperadorById(datos.operadorId);
    if (!operador || operador.estado !== 'activo') {
      throw new Error('Operador no válido o inactivo');
    }

    // Validar surtidor
    const surtidor = await this.dataService.getSurtidorById(datos.surtidorId);
    if (!surtidor || surtidor.estado !== 'disponible') {
      throw new Error('Surtidor no disponible');
    }

    // Validar tipo de gasolina
    if (!surtidor.tiposGasolinaDisponibles.includes(datos.tipoGasolina)) {
      throw new Error('Tipo de gasolina no disponible en este surtidor');
    }

    // Validar forma de pago
    const formaPagoValida = await this.validarFormaPago(datos.formaPago);
    if (!formaPagoValida) {
      throw new Error('Forma de pago no válida');
    }

    // Validar cliente si se proporciona
    if (datos.clienteId) {
      const cliente = await this.dataService.getClienteById(datos.clienteId);
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
    }
  }

  private calcularTiempoEstimado(litros: number): number {
    // Aproximadamente 1 litro por segundo + tiempo de procesamiento
    return Math.round(litros + 30); // 30 segundos adicionales de procesamiento
  }

  private generarNumeroRecibo(): string {
    const fecha = new Date();
    const timestamp = fecha.getTime();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REC${timestamp}${random}`;
  }

  private async simularProcesamientoVenta(ventaId: string): Promise<void> {
    const venta = this.ventasEnProceso.get(ventaId);
    if (!venta) return;

    const intervalo = setInterval(() => {
      const ventaActual = this.ventasEnProceso.get(ventaId);
      if (!ventaActual || ventaActual.estado !== 'procesando') {
        clearInterval(intervalo);
        return;
      }

      ventaActual.progreso += 10;
      if (ventaActual.progreso >= 100) {
        ventaActual.progreso = 100;
        clearInterval(intervalo);
      }

      this.ventasEnProceso.set(ventaId, ventaActual);
    }, 2000); // Actualizar cada 2 segundos
  }

  private async actualizarInventario(tipoGasolina: string, litrosVendidos: number): Promise<void> {
    try {
      const tipo = await this.dataService.getTipoGasolinaByTipo(tipoGasolina);
      if (tipo) {
        // Simular actualización de inventario - en un caso real actualizaríamos la base de datos
        console.log(`Inventario actualizado: ${tipoGasolina} - ${litrosVendidos} litros vendidos`);
      }
    } catch (error) {
      console.error('Error actualizando inventario:', error);
    }
  }
}
