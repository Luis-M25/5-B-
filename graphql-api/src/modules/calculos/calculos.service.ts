import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { 
  CalculoResultType, 
  ComparacionPreciosType, 
  CalcularCostoDetalladoInput, 
  SimulacionVentaInput 
} from './dto/calculo.dto';

@Injectable()
export class CalculosService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async calcularCostoDetallado(input: CalcularCostoDetalladoInput): Promise<CalculoResultType> {
    try {
      // Obtener precio actual
      const precios = await this.dataService.getAllPrecios();
      const precioActual = precios.find(p => p.tipoGasolina === input.tipoGasolina && p.activo);
      
      if (!precioActual) {
        throw new Error(`No se encontró precio para el tipo de gasolina: ${input.tipoGasolina}`);
      }

      // Verificar disponibilidad
      const tipo = await this.dataService.getTipoGasolinaByTipo(input.tipoGasolina);
      const disponible = tipo?.disponible && tipo.stock >= input.litros;
      const stockDisponible = tipo?.stock || 0;

      // Calcular costos
      const subtotal = input.litros * precioActual.precioLitro;
      
      // Calcular impuestos (18% IVA)
      const impuestos = input.incluirImpuestos !== false ? subtotal * 0.18 : 0;
      
      // Calcular descuentos
      let descuentos = 0;
      if (input.aplicarDescuentos && input.clienteId) {
        const cliente = await this.dataService.getClienteById(input.clienteId);
        if (cliente?.tipoCliente === 'vip') {
          descuentos = subtotal * 0.05; // 5% descuento VIP
        } else if (cliente?.tipoCliente === 'frecuente') {
          descuentos = subtotal * 0.02; // 2% descuento frecuente
        }
      }

      const total = subtotal + impuestos - descuentos;

      return {
        tipoGasolina: input.tipoGasolina,
        litros: input.litros,
        precioLitro: precioActual.precioLitro,
        subtotal,
        impuestos,
        descuentos,
        total,
        disponible: disponible || false,
        stockDisponible,
        fechaCalculo: new Date()
      };
    } catch (error) {
      throw new Error(`Error al calcular costo: ${error.message}`);
    }
  }

  async simularVenta(input: SimulacionVentaInput): Promise<CalculoResultType> {
    try {
      // Reutilizar el cálculo detallado
      const calculo = await this.calcularCostoDetallado({
        tipoGasolina: input.tipoGasolina,
        litros: input.litros,
        surtidorId: input.surtidorId,
        aplicarDescuentos: true,
        incluirImpuestos: true
      });

      // Verificar disponibilidad del surtidor si se especifica
      if (input.surtidorId) {
        const surtidor = await this.dataService.getSurtidorById(input.surtidorId);
        if (!surtidor || surtidor.estado !== 'disponible') {
          throw new Error('Surtidor no disponible');
        }
        
        if (!surtidor.tiposGasolinaDisponibles.includes(input.tipoGasolina)) {
          throw new Error('Tipo de gasolina no disponible en este surtidor');
        }
      }

      return calculo;
    } catch (error) {
      throw new Error(`Error en simulación de venta: ${error.message}`);
    }
  }

  async compararPrecios(): Promise<ComparacionPreciosType[]> {
    try {
      const precios = await this.dataService.getAllPrecios();
      const tiposGasolina = await this.dataService.getAllTiposGasolina();

      const comparaciones: ComparacionPreciosType[] = [];

      for (const tipo of tiposGasolina) {
        const preciosDelTipo = precios.filter(p => p.tipoGasolina === tipo.tipo);
        preciosDelTipo.sort((a, b) => new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime());

        if (preciosDelTipo.length >= 2) {
          const precioActual = preciosDelTipo[0].precioLitro;
          const precioAnterior = preciosDelTipo[1].precioLitro;
          const diferencia = precioActual - precioAnterior;
          const porcentajeCambio = (diferencia / precioAnterior) * 100;

          let tendencia = 'estable';
          if (diferencia > 0.01) tendencia = 'subida';
          else if (diferencia < -0.01) tendencia = 'bajada';

          comparaciones.push({
            tipoGasolina: tipo.tipo,
            precioActual,
            precioAnterior,
            diferencia,
            porcentajeCambio,
            tendencia
          });
        }
      }

      return comparaciones;
    } catch (error) {
      throw new Error(`Error al comparar precios: ${error.message}`);
    }
  }

  async calcularCostoBasico(tipoGasolina: string, litros: number): Promise<CalculoResultType> {
    return this.calcularCostoDetallado({
      tipoGasolina,
      litros,
      aplicarDescuentos: false,
      incluirImpuestos: true
    });
  }

  async validarCapacidadSurtidor(surtidorId: string, litros: number): Promise<boolean> {
    try {
      const surtidor = await this.dataService.getSurtidorById(surtidorId);
      if (!surtidor) return false;

      return surtidor.combustibleActual >= litros;
    } catch (error) {
      return false;
    }
  }

  async estimarTiempoDespacho(litros: number): Promise<number> {
    // Estimar tiempo en segundos (aproximadamente 1 litro por segundo)
    const tiempoBase = litros;
    const tiempoAdicional = Math.random() * 10; // Factor aleatorio de 0-10 segundos
    return Math.round(tiempoBase + tiempoAdicional);
  }
}
