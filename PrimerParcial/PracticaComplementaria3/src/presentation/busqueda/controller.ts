import { Request, Response } from 'express';
import { CreateBusquedaDto, BusquedaRepository } from '../../domain';

export class BusquedaController {

  constructor(
    private readonly busquedaRepository: BusquedaRepository,
  ) { }

  public getBusquedas = async ( req: Request, res: Response ) => {
    try {
      const busquedas = await this.busquedaRepository.getAll();
      return res.json( busquedas );
    } catch ( error ) {
      res.status( 400 ).json( { error } );
    }
  };

  public getBusquedaById = async ( req: Request, res: Response ) => {
    const id = +req.params.id;

    try {
      const busqueda = await this.busquedaRepository.findById( id );
      res.json( busqueda );
    } catch ( error ) {
      res.status( 400 ).json( { error } );
    }
  };

  public createBusqueda = async ( req: Request, res: Response ) => {
    const [ error, createBusquedaDto ] = CreateBusquedaDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    try {
      const busqueda = await this.busquedaRepository.create( createBusquedaDto! );
      res.json( busqueda );
    } catch ( error ) {
      res.status( 400 ).json( { error } );
    }
  };

  public deleteBusqueda = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    
    try {
      const deletedBusqueda = await this.busquedaRepository.deleteById( id );
      res.json( deletedBusqueda );
    } catch ( error ) {
      res.status( 400 ).json( { error } );
    }
  };
}
