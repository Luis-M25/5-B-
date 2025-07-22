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
import { ValoracionService } from './valoracion.service';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { UpdateValoracionDto } from './dto/update-valoracion.dto';

@WebSocketGateway({ 
  cors: true,
  namespace: '/valoracion'
})
export class ValoracionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('ValoracionGateway');

  constructor(private readonly valoracionService: ValoracionService) {}

  afterInit(server: Server) {
    this.logger.log('ValoracionGateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createValoracion')
  async create(@MessageBody() createValoracionDto: CreateValoracionDto, @ConnectedSocket() client: Socket) {
    try {
      const nuevaValoracion = await this.valoracionService.create(createValoracionDto);
      
      // Emitir a todos los clientes conectados
      this.wss.emit('valoracionCreada', nuevaValoracion);
      
      // Emitir estadísticas actualizadas del lugar
      const estadisticas = await this.valoracionService.getEstadisticasLugar(
        createValoracionDto.lugarTuristicoId
      );
      this.wss.emit('estadisticasActualizadas', {
        lugarTuristicoId: createValoracionDto.lugarTuristicoId,
        estadisticas
      });
      
      // Actualizar lista completa
      const valoraciones = await this.valoracionService.findAll();
      this.wss.emit('valoracionesActualizadas', valoraciones);
      
      return { success: true, data: nuevaValoracion };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findAllValoracion')
  async findAll(@ConnectedSocket() client: Socket) {
    try {
      const valoraciones = await this.valoracionService.findAll();
      client.emit('valoracionesEncontradas', valoraciones);
      return valoraciones;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findOneValoracion')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      const valoracion = await this.valoracionService.findOne(id);
      client.emit('valoracionEncontrada', valoracion);
      return valoracion;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findValoracionesByLugar')
  async findByLugarTuristico(@MessageBody() lugarTuristicoId: number, @ConnectedSocket() client: Socket) {
    try {
      const valoraciones = await this.valoracionService.findByLugarTuristico(lugarTuristicoId);
      client.emit('valoracionesPorLugarEncontradas', valoraciones);
      return valoraciones;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findValoracionesByCalificacion')
  async findByCalificacion(@MessageBody() calificacion: number, @ConnectedSocket() client: Socket) {
    try {
      const valoraciones = await this.valoracionService.findByCalificacion(calificacion);
      client.emit('valoracionesPorCalificacionEncontradas', valoraciones);
      return valoraciones;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findValoracionesByUsuario')
  async findByUsuario(@MessageBody() nombreUsuario: string, @ConnectedSocket() client: Socket) {
    try {
      const valoraciones = await this.valoracionService.findByUsuario(nombreUsuario);
      client.emit('valoracionesPorUsuarioEncontradas', valoraciones);
      return valoraciones;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findValoracionesRecientes')
  async findRecientes(@MessageBody() limit: number, @ConnectedSocket() client: Socket) {
    try {
      const valoraciones = await this.valoracionService.findRecientes(limit);
      client.emit('valoracionesRecientesEncontradas', valoraciones);
      return valoraciones;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('getEstadisticasLugar')
  async getEstadisticasLugar(@MessageBody() lugarTuristicoId: number, @ConnectedSocket() client: Socket) {
    try {
      const estadisticas = await this.valoracionService.getEstadisticasLugar(lugarTuristicoId);
      client.emit('estadisticasLugarObtenidas', { lugarTuristicoId, estadisticas });
      return { lugarTuristicoId, estadisticas };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('updateValoracion')
  async update(@MessageBody() updateValoracionDto: UpdateValoracionDto, @ConnectedSocket() client: Socket) {
    try {
      const valoracionActualizada = await this.valoracionService.update(
        updateValoracionDto.id,
        updateValoracionDto
      );
      
      // Emitir a todos los clientes
      this.wss.emit('valoracionActualizada', valoracionActualizada);
      
      // Emitir estadísticas actualizadas si se cambió la calificación
      if (updateValoracionDto.calificacion && updateValoracionDto.lugarTuristicoId) {
        const estadisticas = await this.valoracionService.getEstadisticasLugar(
          updateValoracionDto.lugarTuristicoId
        );
        this.wss.emit('estadisticasActualizadas', {
          lugarTuristicoId: updateValoracionDto.lugarTuristicoId,
          estadisticas
        });
      }
      
      // Actualizar lista completa
      const valoraciones = await this.valoracionService.findAll();
      this.wss.emit('valoracionesActualizadas', valoraciones);
      
      return { success: true, data: valoracionActualizada };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('removeValoracion')
  async remove(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      // Obtener la valoración antes de eliminarla para las estadísticas
      const valoracion = await this.valoracionService.findOne(id);
      const lugarTuristicoId = valoracion.lugarTuristico.id;
      
      await this.valoracionService.remove(id);
      
      // Emitir a todos los clientes
      this.wss.emit('valoracionEliminada', { id });
      
      // Emitir estadísticas actualizadas
      const estadisticas = await this.valoracionService.getEstadisticasLugar(lugarTuristicoId);
      this.wss.emit('estadisticasActualizadas', {
        lugarTuristicoId,
        estadisticas
      });
      
      // Actualizar lista completa
      const valoraciones = await this.valoracionService.findAll();
      this.wss.emit('valoracionesActualizadas', valoraciones);
      
      return { success: true, message: 'Valoración eliminada correctamente' };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  // Método para notificar nuevas valoraciones en tiempo real
  async notificarNuevaValoracion(lugarTuristicoId: number) {
    try {
      const valoraciones = await this.valoracionService.findByLugarTuristico(lugarTuristicoId);
      const estadisticas = await this.valoracionService.getEstadisticasLugar(lugarTuristicoId);
      
      this.wss.emit('nuevaValoracionEnLugar', {
        lugarTuristicoId,
        valoraciones,
        estadisticas
      });
    } catch (error) {
      this.logger.error('Error al notificar nueva valoración:', error);
    }
  }
}
