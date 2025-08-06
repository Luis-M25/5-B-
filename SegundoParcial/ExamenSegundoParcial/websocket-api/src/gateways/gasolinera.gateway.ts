import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VentasSimpleService } from '../modules/ventas/ventas-simple.service';

@WebSocketGateway({ 
  cors: { 
    origin: "*",
    methods: ["GET", "POST"]
  },
  namespace: '/gasolinera'
})
export class GasolineraGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clientesConectados: Map<string, Socket> = new Map();

  constructor(private readonly ventasService: VentasService) {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    this.clientesConectados.set(client.id, client);
    
    // Enviar estado inicial
    this.enviarEstadoInicial(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    this.clientesConectados.delete(client.id);
  }

  // ==================== FORMAS DE PAGO ====================
  @SubscribeMessage('obtener_formas_pago')
  async obtenerFormasPago(@ConnectedSocket() client: Socket) {
    try {
      const formasPago = await this.ventasService.obtenerFormasPago();
      client.emit('formas_pago_obtenidas', {
        success: true,
        data: formasPago,
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('validar_forma_pago')
  async validarFormaPago(
    @MessageBody() data: { tipoFormaPago: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const esValida = await this.ventasService.validarFormaPago(data.tipoFormaPago);
      client.emit('forma_pago_validada', {
        success: true,
        data: { tipoFormaPago: data.tipoFormaPago, valida: esValida },
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  // ==================== CLIENTES ====================
  @SubscribeMessage('buscar_clientes')
  async buscarClientes(
    @MessageBody() filtros: BuscarClienteDto,
    @ConnectedSocket() client: Socket
  ) {
    try {
      const clientes = await this.ventasService.buscarClientes(filtros);
      client.emit('clientes_encontrados', {
        success: true,
        data: clientes,
        message: `Se encontraron ${clientes.length} clientes`,
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('buscar_cliente_por_cedula')
  async buscarClientePorCedula(
    @MessageBody() data: { cedula: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const cliente = await this.ventasService.obtenerClientePorCedula(data.cedula);
      client.emit('cliente_encontrado', {
        success: true,
        data: cliente,
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('registrar_cliente')
  async registrarCliente(
    @MessageBody() datos: RegistrarClienteDto,
    @ConnectedSocket() client: Socket
  ) {
    try {
      const cliente = await this.ventasService.registrarCliente(datos);
      
      client.emit('cliente_registrado', {
        success: true,
        data: cliente,
        message: 'Cliente registrado exitosamente',
        timestamp: new Date()
      });

      // Notificar a todos los clientes conectados
      this.server.emit('nuevo_cliente_registrado', {
        data: cliente,
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  // ==================== VENTAS ====================
  @SubscribeMessage('iniciar_venta')
  async iniciarVenta(
    @MessageBody() datos: ProcesarVentaDto,
    @ConnectedSocket() client: Socket
  ) {
    try {
      const venta = await this.ventasService.iniciarVenta(datos);
      
      client.emit('venta_iniciada', {
        success: true,
        data: venta,
        message: 'Venta iniciada exitosamente',
        timestamp: new Date()
      });

      // Notificar a todos los clientes sobre la nueva venta
      this.server.emit('nueva_venta_iniciada', {
        data: venta,
        timestamp: new Date()
      });

    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('procesar_venta')
  async procesarVenta(
    @MessageBody() data: { ventaId: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const venta = await this.ventasService.procesarVenta(data.ventaId);
      
      client.emit('venta_procesandose', {
        success: true,
        data: venta,
        message: 'Venta en proceso',
        timestamp: new Date()
      });

      // Notificar progreso en tiempo real
      this.monitorearProgresoVenta(data.ventaId);

    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('completar_venta')
  async completarVenta(
    @MessageBody() data: { ventaId: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const venta = await this.ventasService.completarVenta(data.ventaId);
      
      client.emit('venta_completada', {
        success: true,
        data: venta,
        message: 'Venta completada exitosamente',
        timestamp: new Date()
      });

      // Notificar a todos los clientes
      this.server.emit('venta_finalizada', {
        data: venta,
        timestamp: new Date()
      });

    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('cancelar_venta')
  async cancelarVenta(
    @MessageBody() data: { ventaId: string, motivo?: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      await this.ventasService.cancelarVenta(data.ventaId, data.motivo);
      
      client.emit('venta_cancelada', {
        success: true,
        message: 'Venta cancelada exitosamente',
        timestamp: new Date()
      });

      // Notificar a todos los clientes
      this.server.emit('venta_cancelada_notificacion', {
        ventaId: data.ventaId,
        motivo: data.motivo,
        timestamp: new Date()
      });

    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  @SubscribeMessage('obtener_ventas_en_proceso')
  async obtenerVentasEnProceso(@ConnectedSocket() client: Socket) {
    try {
      const ventas = await this.ventasService.obtenerVentasEnProceso();
      client.emit('ventas_en_proceso', {
        success: true,
        data: ventas,
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: error.message,
        timestamp: new Date()
      });
    }
  }

  // ==================== MÉTODOS PRIVADOS ====================
  private async enviarEstadoInicial(client: Socket) {
    try {
      // Enviar formas de pago disponibles
      const formasPago = await this.ventasService.obtenerFormasPago();
      client.emit('estado_inicial', {
        formasPago,
        ventasEnProceso: await this.ventasService.obtenerVentasEnProceso(),
        timestamp: new Date()
      });
    } catch (error) {
      client.emit('error', {
        success: false,
        error: 'Error al obtener estado inicial',
        timestamp: new Date()
      });
    }
  }

  private async monitorearProgresoVenta(ventaId: string) {
    const intervalo = setInterval(async () => {
      try {
        const venta = await this.ventasService.obtenerVentaEnProceso(ventaId);
        
        if (!venta || venta.estado !== 'procesando') {
          clearInterval(intervalo);
          return;
        }

        // Emitir progreso a todos los clientes
        this.server.emit('progreso_venta', {
          ventaId: venta.id,
          progreso: venta.progreso,
          estado: venta.estado,
          timestamp: new Date()
        });

        if (venta.progreso >= 100) {
          clearInterval(intervalo);
        }

      } catch (error) {
        clearInterval(intervalo);
        console.error('Error monitoreando progreso:', error);
      }
    }, 2000); // Actualizar cada 2 segundos
  }
}
