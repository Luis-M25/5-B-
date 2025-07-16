import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  ParseIntPipe,
  ParseFloatPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { LugarTurisitcoService } from './lugar-turisitco.service';
import { CreateLugarTurisitcoDto } from './dto/create-lugar-turisitco.dto';
import { UpdateLugarTurisitcoDto } from './dto/update-lugar-turisitco.dto';
import { LugarTurisitco } from './entities/lugar-turisitco.entity';

@Controller('lugar-turisitco')
export class LugarTurisitcoController {
  constructor(private readonly lugarTurisitcoService: LugarTurisitcoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLugarTurisitcoDto: CreateLugarTurisitcoDto): Promise<LugarTurisitco> {
    return await this.lugarTurisitcoService.create(createLugarTurisitcoDto);
  }

  @Get()
  async findAll(): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoService.findAll();
  }

  @Get('categoria/:categoria')
  async findByCategoria(@Param('categoria') categoria: string): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoService.findByCategoria(categoria);
  }

  @Get('ubicacion/:ubicacion')
  async findByUbicacion(@Param('ubicacion') ubicacion: string): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoService.findByUbicacion(ubicacion);
  }

  @Get('nearby')
  async findNearby(
    @Query('latitud', ParseFloatPipe) latitud: number,
    @Query('longitud', ParseFloatPipe) longitud: number,
    @Query('radio', ParseFloatPipe) radio: number = 10
  ): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoService.findNearby(latitud, longitud, radio);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LugarTurisitco> {
    return await this.lugarTurisitcoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateLugarTurisitcoDto: UpdateLugarTurisitcoDto
  ): Promise<LugarTurisitco> {
    return await this.lugarTurisitcoService.update(id, updateLugarTurisitcoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.lugarTurisitcoService.remove(id);
  }
}
