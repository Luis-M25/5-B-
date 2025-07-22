// src/seeds/seed.ts
import { createConnection } from 'typeorm';
import { CategoriaDestino } from '../entidades/ICategoriadestino';
import { Destino } from '../entidades/IDestino';
import { Experiencia } from '../entidades/IExperiencia';
import { PreferenciaTuristica } from '../entidades/IPreferenciaturistica';
import { Recomendacion } from '../entidades/IRecomendaciones';

async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'turismo_db',
    entities: [
      CategoriaDestino,
      Destino,
      Experiencia,
      PreferenciaTuristica,
      Recomendacion
    ],
    synchronize: true,
  });

  // Crear categorías
  const categorias = [
    { nombre: 'Playa', descripcion: 'Destinos con hermosas playas' },
    { nombre: 'Montaña', descripcion: 'Destinos con montañas y senderismo' },
    { nombre: 'Ciudad', descripcion: 'Destinos urbanos con cultura y historia' },
    { nombre: 'Rural', descripcion: 'Destinos en el campo y naturaleza' },
    { nombre: 'Aventura', descripcion: 'Destinos para deportes extremos y aventuras' }
  ];

  const categoriasCreadas = [];
  for (const categoria of categorias) {
    const nuevaCategoria = connection.getRepository(CategoriaDestino).create(categoria);
    categoriasCreadas.push(await connection.getRepository(CategoriaDestino).save(nuevaCategoria));
  }

  // Crear destinos
  const destinos = [
    {
      nombre: 'Cancún',
      ubicacion: 'México',
      descripcion: 'Hermosas playas de arena blanca y aguas cristalinas',
      categorias: [categoriasCreadas[0], categoriasCreadas[4]] // Playa, Aventura
    },
    {
      nombre: 'Barcelona',
      ubicacion: 'España',
      descripcion: 'Ciudad cosmopolita con arquitectura única y playas urbanas',
      categorias: [categoriasCreadas[0], categoriasCreadas[2]] // Playa, Ciudad
    },
    {
      nombre: 'Alpes Suizos',
      ubicacion: 'Suiza',
      descripcion: 'Impresionantes montañas con pueblos pintorescos',
      categorias: [categoriasCreadas[1], categoriasCreadas[3]] // Montaña, Rural
    },
    {
      nombre: 'Tokio',
      ubicacion: 'Japón',
      descripcion: 'Metrópolis moderna con tradiciones milenarias',
      categorias: [categoriasCreadas[2]] // Ciudad
    },
    {
      nombre: 'Selva Amazónica',
      ubicacion: 'Brasil',
      descripcion: 'La selva tropical más grande del mundo',
      categorias: [categoriasCreadas[3], categoriasCreadas[4]] // Rural, Aventura
    }
  ];

  const destinosCreados = [];
  for (const destino of destinos) {
    const nuevoDestino = connection.getRepository(Destino).create(destino);
    destinosCreados.push(await connection.getRepository(Destino).save(nuevoDestino));
  }

  // Crear preferencias turísticas
  const preferencias = [
    { nombre: 'Relax', descripcion: 'Vacaciones para descansar y relajarse' },
    { nombre: 'Cultural', descripcion: 'Visitas culturales y conocimiento histórico' },
    { nombre: 'Deportiva', descripcion: 'Actividades deportivas y físicas' },
    { nombre: 'Gastronómica', descripcion: 'Enfocada en la comida local' },
    { nombre: 'Familiar', descripcion: 'Apta para toda la familia' }
  ];

  const preferenciasCreadas = [];
  for (const preferencia of preferencias) {
    const nuevaPreferencia = connection.getRepository(PreferenciaTuristica).create(preferencia);
    preferenciasCreadas.push(await connection.getRepository(PreferenciaTuristica).save(nuevaPreferencia));
  }

  // Crear experiencias
  const experiencias = [
    {
      titulo: 'Snorkel en Cancún',
      descripcion: 'Excelente vista de la vida marina',
      calificacion: 5,
      destino: destinosCreados[0]
    },
    {
      titulo: 'Visita a la Sagrada Familia',
      descripcion: 'Impresionante arquitectura de Gaudí',
      calificacion: 4,
      destino: destinosCreados[1]
    },
    {
      titulo: 'Esquí en los Alpes',
      descripcion: 'Las mejores pistas para todos los niveles',
      calificacion: 5,
      destino: destinosCreados[2]
    },
    {
      titulo: 'Visita a Shibuya',
      descripcion: 'Cruce más concurrido del mundo',
      calificacion: 4,
      destino: destinosCreados[3]
    },
    {
      titulo: 'Expedición por el Amazonas',
      descripcion: 'Aventura inolvidable en la selva',
      calificacion: 5,
      destino: destinosCreados[4]
    }
  ];

  for (const experiencia of experiencias) {
    const nuevaExperiencia = connection.getRepository(Experiencia).create(experiencia);
    await connection.getRepository(Experiencia).save(nuevaExperiencia);
  }

  // Crear recomendaciones
  const recomendaciones = [
    {
      titulo: 'Mejor época para Cancún',
      descripcion: 'Visita entre diciembre y abril para evitar la temporada de huracanes',
      destino: destinosCreados[0],
      preferenciaTuristica: preferenciasCreadas[0] // Relax
    },
    {
      titulo: 'Barcelona cultural',
      descripcion: 'No te pierdas el Barrio Gótico y las obras de Gaudí',
      destino: destinosCreados[1],
      preferenciaTuristica: preferenciasCreadas[1] // Cultural
    },
    {
      titulo: 'Deportes de invierno en Suiza',
      descripcion: 'Esquí y snowboard para todos los niveles',
      destino: destinosCreados[2],
      preferenciaTuristica: preferenciasCreadas[2] // Deportiva
    },
    {
      titulo: 'Gastronomía en Tokio',
      descripcion: 'Mercado de Tsukiji y mejores restaurantes de sushi',
      destino: destinosCreados[3],
      preferenciaTuristica: preferenciasCreadas[3] // Gastronómica
    },
    {
      titulo: 'Amazonas en familia',
      descripcion: 'Tours adaptados para niños con actividades educativas',
      destino: destinosCreados[4],
      preferenciaTuristica: preferenciasCreadas[4] // Familiar
    }
  ];

  for (const recomendacion of recomendaciones) {
    const nuevaRecomendacion = connection.getRepository(Recomendacion).create(recomendacion);
    await connection.getRepository(Recomendacion).save(nuevaRecomendacion);
  }

  console.log('¡Datos de prueba creados con éxito!');
  await connection.close();
}

seed().catch(error => console.error('Error al crear datos de prueba:', error));