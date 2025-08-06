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
    methods: ["GET", "POST"],
    credentials: true 
  },
  port: 3003
})
export class GasolineraSimpleGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ventasService: VentasSimpleService) {}

  handleConnection(client: Socket): void {
    console.log(`Cliente conectado: ${client.id}`);
    client.emit('connection', { message: 'Conectado al servidor WebSocket' });
  }

  handleDisconnect(client: Socket): void {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('obtenerFormasPago')
  async obtenerFormasPago(@ConnectedSocket() client: Socket): Promise<void> {
    console.log('🔥 Mensaje obtenerFormasPago recibido');
    try {
      console.log('📞 Llamando al servicio de ventas...');
      const formasPago = await this.ventasService.obtenerFormasPago();
      console.log('📊 Formas de pago obtenidas:', formasPago);
      client.emit('formasPago', { success: true, data: formasPago });
      console.log('✅ Respuesta enviada al cliente');
    } catch (error) {
      console.error('❌ Error en obtenerFormasPago:', error);
      client.emit('error', { message: 'Error al obtener formas de pago' });
    }
  }

  @SubscribeMessage('obtenerClientes')
  async obtenerClientes(@ConnectedSocket() client: Socket): Promise<void> {
    try {
      const clientes = await this.ventasService.obtenerClientes();
      client.emit('clientes', { success: true, data: clientes });
    } catch (error) {
      client.emit('error', { message: 'Error al obtener clientes' });
    }
  }

  @SubscribeMessage('procesarVenta')
  async procesarVenta(
    @MessageBody() ventaData: any,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    try {
      const venta = await this.ventasService.procesarVenta(ventaData);
      client.emit('ventaProcesada', { success: true, data: venta });
    } catch (error) {
      client.emit('error', { message: 'Error al procesar venta' });
    }
  }
}
