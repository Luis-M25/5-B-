import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { BusquedaService } from './busqueda.service';
import { CreateBusquedaDto } from './dto/create-busqueda.dto';
import { UpdateBusquedaDto } from './dto/update-busqueda.dto';
import { Busqueda } from './entities/busqueda.entity';

@Controller('busqueda')
export class BusquedaController {
  constructor(private readonly busquedaService: BusquedaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBusquedaDto: CreateBusquedaDto): Promise<Busqueda> {
    return await this.busquedaService.create(createBusquedaDto);
  }

  @Get()
  async findAll(): Promise<Busqueda[]> {
    return await this.busquedaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Busqueda> {
    return await this.busquedaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateBusquedaDto: UpdateBusquedaDto
  ): Promise<Busqueda> {
    return await this.busquedaService.update(id, updateBusquedaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.busquedaService.remove(id);
  }
}
