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
import { BusquedaService } from './busqueda.service';
import { CreateBusquedaDto } from './dto/create-busqueda.dto';
import { UpdateBusquedaDto } from './dto/update-busqueda.dto';

@WebSocketGateway({ 
  cors: true,
  namespace: '/busqueda'
})
export class BusquedaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('BusquedaGateway');

  constructor(private readonly busquedaService: BusquedaService) {}

  afterInit(server: Server) {
    this.logger.log('BusquedaGateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createBusqueda')
  async create(@MessageBody() createBusquedaDto: CreateBusquedaDto, @ConnectedSocket() client: Socket) {
    try {
      const nuevaBusqueda = await this.busquedaService.create(createBusquedaDto);
      
      // Emitir a todos los clientes conectados
      this.wss.emit('busquedaCreada', nuevaBusqueda);
      
      // Emitir estadísticas actualizadas
      const estadisticas = await this.busquedaService.getEstadisticasBusqueda();
      this.wss.emit('estadisticasBusquedaActualizadas', estadisticas);
      
      return { success: true, data: nuevaBusqueda };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('buscarLugares')
  async buscarLugaresTuristicos(
    @MessageBody() data: {
      termino: string;
      categoria?: string;
      latitud?: number;
      longitud?: number;
      radio?: number;
    },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const resultados = await this.busquedaService.buscarLugaresTuristicos(
        data.termino,
        data.categoria,
        data.latitud,
        data.longitud,
        data.radio
      );
      
      // Emitir resultados al cliente que hizo la búsqueda
      client.emit('resultadosBusqueda', {
        termino: data.termino,
        cantidadResultados: resultados.length,
        resultados
      });
      
      // Emitir estadísticas actualizadas a todos los clientes
      const estadisticas = await this.busquedaService.getEstadisticasBusqueda();
      this.wss.emit('estadisticasBusquedaActualizadas', estadisticas);
      
      return { success: true, data: resultados };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findAllBusqueda')
  async findAll(@ConnectedSocket() client: Socket) {
    try {
      const busquedas = await this.busquedaService.findAll();
      client.emit('busquedasEncontradas', busquedas);
      return busquedas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findOneBusqueda')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      const busqueda = await this.busquedaService.findOne(id);
      client.emit('busquedaEncontrada', busqueda);
      return busqueda;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findBusquedasByTermino')
  async findByTermino(@MessageBody() termino: string, @ConnectedSocket() client: Socket) {
    try {
      const busquedas = await this.busquedaService.findByTermino(termino);
      client.emit('busquedasPorTerminoEncontradas', busquedas);
      return busquedas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findBusquedasByCategoria')
  async findByCategoria(@MessageBody() categoria: string, @ConnectedSocket() client: Socket) {
    try {
      const busquedas = await this.busquedaService.findByCategoria(categoria);
      client.emit('busquedasPorCategoriaEncontradas', busquedas);
      return busquedas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('findBusquedasRecientes')
  async findRecientes(@MessageBody() limit: number, @ConnectedSocket() client: Socket) {
    try {
      const busquedas = await this.busquedaService.findRecientes(limit);
      client.emit('busquedasRecientesEncontradas', busquedas);
      return busquedas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('getTerminosMasPopulares')
  async getTerminosMasPopulares(@MessageBody() limit: number, @ConnectedSocket() client: Socket) {
    try {
      const terminos = await this.busquedaService.getTerminosMasPopulares(limit);
      client.emit('terminosMasPopularesObtenidos', terminos);
      return terminos;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('getCategoriasMasPopulares')
  async getCategoriasMasPopulares(@MessageBody() limit: number, @ConnectedSocket() client: Socket) {
    try {
      const categorias = await this.busquedaService.getCategoriasMasPopulares(limit);
      client.emit('categoriasMasPopularesObtenidas', categorias);
      return categorias;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('getEstadisticasBusqueda')
  async getEstadisticasBusqueda(@ConnectedSocket() client: Socket) {
    try {
      const estadisticas = await this.busquedaService.getEstadisticasBusqueda();
      client.emit('estadisticasBusquedaObtenidas', estadisticas);
      return estadisticas;
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('updateBusqueda')
  async update(@MessageBody() updateBusquedaDto: UpdateBusquedaDto, @ConnectedSocket() client: Socket) {
    try {
      const busquedaActualizada = await this.busquedaService.update(
        updateBusquedaDto.id,
        updateBusquedaDto
      );
      
      // Emitir a todos los clientes
      this.wss.emit('busquedaActualizada', busquedaActualizada);
      
      return { success: true, data: busquedaActualizada };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('removeBusqueda')
  async remove(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    try {
      await this.busquedaService.remove(id);
      
      // Emitir a todos los clientes
      this.wss.emit('busquedaEliminada', { id });
      
      // Emitir estadísticas actualizadas
      const estadisticas = await this.busquedaService.getEstadisticasBusqueda();
      this.wss.emit('estadisticasBusquedaActualizadas', estadisticas);
      
      return { success: true, message: 'Búsqueda eliminada correctamente' };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  // Método para notificar tendencias de búsqueda en tiempo real
  async notificarTendenciasBusqueda() {
    try {
      const terminosPopulares = await this.busquedaService.getTerminosMasPopulares(5);
      const categoriasPopulares = await this.busquedaService.getCategoriasMasPopulares(5);
      
      this.wss.emit('tendenciasBusquedaActualizadas', {
        terminosPopulares,
        categoriasPopulares
      });
    } catch (error) {
      this.logger.error('Error al notificar tendencias de búsqueda:', error);
    }
  }
}
