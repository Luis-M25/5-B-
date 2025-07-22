import { CreateLugarTuristicoDto, LugarTuristicoDatasource, LugarTuristicoEntity } from '../../domain';
import { LugarTuristicoModel } from '../models/lugar-turistico.mongoose.model';

export class LugarTuristicoMongooseDatasourceImpl implements LugarTuristicoDatasource {
  buscarPorCategoria(categoria: string): Promise<LugarTuristicoEntity[]> {
    throw new Error('Method not implemented.');
  }

  async create(createLugarTuristicoDto: CreateLugarTuristicoDto): Promise<LugarTuristicoEntity> {
    const lugarTuristico = new LugarTuristicoModel(createLugarTuristicoDto);
    await lugarTuristico.save();
    
    return LugarTuristicoEntity.fromObject(lugarTuristico.toObject());
  }

  async getAll(): Promise<LugarTuristicoEntity[]> {
    const lugaresTuristicos = await LugarTuristicoModel.find();
    return lugaresTuristicos.map(lugar => LugarTuristicoEntity.fromObject(lugar.toObject()));
  }

  async findById(id: number): Promise<LugarTuristicoEntity> {
    const lugarTuristico = await LugarTuristicoModel.findById(id);
    if (!lugarTuristico) throw new Error(`Lugar turístico con id ${id} no encontrado`);
    
    return LugarTuristicoEntity.fromObject(lugarTuristico.toObject());
  }

  async updateById(id: number, updateLugarTuristicoDto: Partial<CreateLugarTuristicoDto>): Promise<LugarTuristicoEntity> {
    const lugarTuristico = await LugarTuristicoModel.findByIdAndUpdate(id, updateLugarTuristicoDto, { new: true });
    if (!lugarTuristico) throw new Error(`Lugar turístico con id ${id} no encontrado`);
    
    return LugarTuristicoEntity.fromObject(lugarTuristico.toObject());
  }

  async deleteById(id: number): Promise<LugarTuristicoEntity> {
    const lugarTuristico = await LugarTuristicoModel.findByIdAndDelete(id);
    if (!lugarTuristico) throw new Error(`Lugar turístico con id ${id} no encontrado`);
    
    return LugarTuristicoEntity.fromObject(lugarTuristico.toObject());
  }
}
