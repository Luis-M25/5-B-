import { Request, Response } from 'express';
import { CreateLugarTuristicoDto, UpdateLugarTuristicoDto } from '../../domain/dtos';
import { CreateLugarTuristico, DeleteLugarTuristico, GetLugarTuristico, GetLugaresTuristicos, LugarTuristicoRepository, UpdateLugarTuristico } from '../../domain';

export class LugarTuristicoController {
  constructor(
    private readonly lugarTuristicoRepository: LugarTuristicoRepository,
  ) { }

  public getLugaresTuristicos = ( req: Request, res: Response ) => {
    new GetLugaresTuristicos( this.lugarTuristicoRepository )
      .execute()
      .then( lugares => res.json( lugares ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  };

  public getLugarTuristicoById = ( req: Request, res: Response ) => {
    const id = req.params.id;

    new GetLugarTuristico( this.lugarTuristicoRepository )
      .execute( id )
      .then( lugar => res.json( lugar ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  };

  public createLugarTuristico = ( req: Request, res: Response ) => {
    const [ error, createLugarTuristicoDto ] = CreateLugarTuristicoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    new CreateLugarTuristico( this.lugarTuristicoRepository )
      .execute( createLugarTuristicoDto! )
      .then( lugar => res.json( lugar ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  };

  public updateLugarTuristico = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [ error, updateLugarTuristicoDto ] = UpdateLugarTuristicoDto.create( { ...req.body, id } );
    if ( error ) return res.status( 400 ).json( { error } );

    new UpdateLugarTuristico( this.lugarTuristicoRepository )
      .execute( updateLugarTuristicoDto! )
      .then( lugar => res.json( lugar ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  };

  public deleteLugarTuristico = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    new DeleteLugarTuristico( this.lugarTuristicoRepository )
      .execute( id )
      .then( lugar => res.json( lugar ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  };
}
