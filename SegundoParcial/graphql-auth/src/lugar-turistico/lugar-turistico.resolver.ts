import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LugarTuristicoService } from './lugar-turistico.service';
import { LugarTuristico } from './lugar-turistico.entity';
import { CreateLugarTuristicoInput } from './dto/create-lugar-turistico.input';
import { UpdateLugarTuristicoInput } from './dto/update-lugar-turistico.input';

@Resolver(() => LugarTuristico)
export class LugarTuristicoResolver {
  constructor(private readonly lugarTuristicoService: LugarTuristicoService) {}

  @Mutation(() => LugarTuristico)
  createLugarTuristico(@Args('createLugarTuristicoInput') createLugarTuristicoInput: CreateLugarTuristicoInput) {
    return this.lugarTuristicoService.create(createLugarTuristicoInput);
  }

  @Query(() => [LugarTuristico], { name: 'lugaresTuristicos' })
  findAll() {
    return this.lugarTuristicoService.findAll();
  }

  @Query(() => LugarTuristico, { name: 'lugarTuristico' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lugarTuristicoService.findOne(id);
  }

  @Mutation(() => LugarTuristico)
  updateLugarTuristico(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateLugarTuristicoInput') updateLugarTuristicoInput: UpdateLugarTuristicoInput,
  ) {
    return this.lugarTuristicoService.update(id, updateLugarTuristicoInput);
  }

  @Mutation(() => Boolean)
  removeLugarTuristico(@Args('id', { type: () => Int }) id: number) {
    return this.lugarTuristicoService.remove(id);
  }
}
