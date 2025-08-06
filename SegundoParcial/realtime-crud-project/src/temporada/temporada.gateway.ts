import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { TemporadaService } from './temporada.service';
import { CreateTemporadaDto } from './dto/create-temporada.dto';
import { UpdateTemporadaDto } from './dto/update-temporada.dto';

@WebSocketGateway({ 
  cors: true,
  namespace: '/temporada'
})
export class TemporadaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('TemporadaGateway');

  constructor(private readonly temporadaService: TemporadaService) {}

  afterInit(server: Server) {
    this.logger.log('TemporadaGateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createTemporada')
  async create(@MessageBody() createTemporadaDto: CreateTemporadaDto, @ConnectedSocket() client: Socket) {
    try {
      const nuevaTemporada = await this.temporadaService.create(createTemporadaDto);
      
      // Emitir a todos los clientes conectados
      this.wss.emit('temporadaCreada', nuevaTemporada);
      
      // Actualizar lista completa
      const temporadas = await this.temporadaService.findAll();
      this.wss.emit('temporadasActualizadas', temporadas);
      
      return { success: true, data: nuevaTemporada };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findAllTemporada')
  async findAll(@ConnectedSocket() client: Socket) {
    try {
      const temporadas = await this.temporadaService.findAll();
      client.emit('temporadasEncontradas', temporadas);
      return temporadas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findOneTemporada')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      const temporada = await this.temporadaService.findOne(id);
      client.emit('temporadaEncontrada', temporada);
      return temporada;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findTemporadaActual')
  async findTemporadaActual(@ConnectedSocket() client: Socket) {
    try {
      const temporada = await this.temporadaService.findTemporadaActual();
      client.emit('temporadaActualEncontrada', temporada);
      return temporada;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findTemporadasProximas')
  async findTemporadasProximas(@MessageBody() dias: number, @ConnectedSocket() client: Socket) {
    try {
      const temporadas = await this.temporadaService.findTemporadasProximas(dias);
      client.emit('temporadasProximasEncontradas', temporadas);
      return temporadas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('calcularPrecioConTemporada')
  async calcularPrecioConTemporada(
    @MessageBody() data: { precioBase: number; fecha: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const precio = await this.temporadaService.calcularPrecioConTemporada(
        data.precioBase,
        new Date(data.fecha)
      );
      client.emit('precioCalculado', { precioBase: data.precioBase, precioFinal: precio });
      return { precioBase: data.precioBase, precioFinal: precio };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('updateTemporada')
  async update(@MessageBody() updateTemporadaDto: UpdateTemporadaDto, @ConnectedSocket() client: Socket) {
    try {
      const temporadaActualizada = await this.temporadaService.update(
        updateTemporadaDto.id,
        updateTemporadaDto
      );
      
      // Emitir a todos los clientes
      this.wss.emit('temporadaActualizada', temporadaActualizada);
      
      // Actualizar lista completa
      const temporadas = await this.temporadaService.findAll();
      this.wss.emit('temporadasActualizadas', temporadas);
      
      return { success: true, data: temporadaActualizada };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('removeTemporada')
  async remove(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      await this.temporadaService.remove(id);
      
      // Emitir a todos los clientes
      this.wss.emit('temporadaEliminada', { id });
      
      // Actualizar lista completa
      const temporadas = await this.temporadaService.findAll();
      this.wss.emit('temporadasActualizadas', temporadas);
      
      return { success: true, message: 'Temporada eliminada correctamente' };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  // Método para notificar cambios automáticos de temporada
  async notificarCambioTemporada() {
    try {
      const temporadaActual = await this.temporadaService.findTemporadaActual();
      this.wss.emit('temporadaActualCambiada', temporadaActual);
    } catch (error) {
      this.logger.error('Error al notificar cambio de temporada:', error);
    }
  }
}
