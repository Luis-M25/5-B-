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
import { LugarturisticoService } from './lugarturistico.service';
import { CreateLugarturisticoDto } from './dto/create-lugarturistico.dto';
import { UpdateLugarturisticoDto } from './dto/update-lugarturistico.dto';

@WebSocketGateway({ 
  cors: true,
  namespace: '/lugarturistico'
})
export class LugarturisticoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('LugarturisticoGateway');

  constructor(private readonly lugarturisticoService: LugarturisticoService) {}

  afterInit(server: Server) {
    this.logger.log('LugarturisticoGateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createLugarTuristico')
  async create(@MessageBody() createLugarturisticoDto: CreateLugarturisticoDto, @ConnectedSocket() client: Socket) {
    try {
      const nuevoLugar = await this.lugarturisticoService.create(createLugarturisticoDto);
      
      // Emitir a todos los clientes conectados
      this.wss.emit('lugarTuristicoCreado', nuevoLugar);
      
      // Actualizar lista completa
      const lugares = await this.lugarturisticoService.findAll();
      this.wss.emit('lugaresActualizados', lugares);
      
      return { success: true, data: nuevoLugar };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findAllLugarTuristico')
  async findAll(@ConnectedSocket() client: Socket) {
    try {
      const lugares = await this.lugarturisticoService.findAll();
      client.emit('lugaresEncontrados', lugares);
      return lugares;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findOneLugarTuristico')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      const lugar = await this.lugarturisticoService.findOne(id);
      client.emit('lugarEncontrado', lugar);
      return lugar;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findLugarByCategory')
  async findByCategory(@MessageBody() categoria: string, @ConnectedSocket() client: Socket) {
    try {
      const lugares = await this.lugarturisticoService.findByCategory(categoria);
      client.emit('lugaresPorCategoriaEncontrados', lugares);
      return lugares;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findLugarByLocation')
  async findByLocation(
    @MessageBody() data: { latitud: number; longitud: number; radio?: number },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const lugares = await this.lugarturisticoService.findByLocation(
        data.latitud,
        data.longitud,
        data.radio
      );
      client.emit('lugaresPorUbicacionEncontrados', lugares);
      return lugares;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('updateLugarTuristico')
  async update(@MessageBody() updateLugarturisticoDto: UpdateLugarturisticoDto, @ConnectedSocket() client: Socket) {
    try {
      const lugarActualizado = await this.lugarturisticoService.update(
        updateLugarturisticoDto.id,
        updateLugarturisticoDto
      );
      
      // Emitir a todos los clientes
      this.wss.emit('lugarTuristicoActualizado', lugarActualizado);
      
      // Actualizar lista completa
      const lugares = await this.lugarturisticoService.findAll();
      this.wss.emit('lugaresActualizados', lugares);
      
      return { success: true, data: lugarActualizado };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('removeLugarTuristico')
  async remove(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      await this.lugarturisticoService.remove(id);
      
      // Emitir a todos los clientes
      this.wss.emit('lugarTuristicoEliminado', { id });
      
      // Actualizar lista completa
      const lugares = await this.lugarturisticoService.findAll();
      this.wss.emit('lugaresActualizados', lugares);
      
      return { success: true, message: 'Lugar turístico eliminado correctamente' };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('getPromedioCalificacion')
  async getPromedioCalificacion(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      const promedio = await this.lugarturisticoService.getPromedioCalificacion(id);
      client.emit('promedioCalificacionObtenido', { id, promedio });
      return { id, promedio };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  // Método para notificar cambios desde otros gateways
  async notificarCambioEnLugar(lugarId: number) {
    try {
      const lugar = await this.lugarturisticoService.findOne(lugarId);
      this.wss.emit('lugarTuristicoModificado', lugar);
    } catch (error) {
      this.logger.error('Error al notificar cambio en lugar:', error);
    }
  }
}
