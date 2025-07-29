
# Travel Planning System

Proyecto NestJS + GraphQL para la gestión de viajes y turismo. Incluye autenticación JWT, TypeORM con SQLite y operaciones CRUD para las entidades principales del sistema.

## Entidades principales

- **Busqueda**: Registra búsquedas realizadas por usuarios.
- **LugarTuristico**: Lugares turísticos disponibles en el sistema.
- **Valoracion**: Valoraciones y comentarios de usuarios sobre lugares turísticos.
- **Temporada**: Periodos o temporadas asociadas a los lugares turísticos.

## Estructura del Proyecto

```
src/
├── auth/                  # Autenticación JWT
├── busqueda/              # CRUD de búsquedas
├── lugar-turistico/       # CRUD de lugares turísticos
├── valoracion/            # CRUD de valoraciones
├── temporada/             # CRUD de temporadas
├── user/                  # Gestión de usuarios
├── common/                # Decoradores y utilidades
├── app.module.ts          # Módulo principal
└── main.ts                # Punto de entrada
```

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev
```

Accede a la interfaz GraphQL en:
http://localhost:3000/graphql

## Ejemplo de operaciones GraphQL

### Crear una búsqueda
```graphql
mutation {
  createBusqueda(createBusquedaInput: {
    query: "playa"
    fecha: "2025-07-29T00:00:00.000Z"
    usuarioId: 1
  }) {
    id
    query
    fecha
    usuarioId
  }
}
```

### Crear un lugar turístico
```graphql
mutation {
  createLugarTuristico(createLugarTuristicoInput: {
    nombre: "Playa Bonita"
    descripcion: "Una playa paradisíaca."
    ubicacion: "Caribe"
    temporadaId: 1
  }) {
    id
    nombre
    descripcion
    ubicacion
    temporadaId
  }
}
```

### Crear una valoración
```graphql
mutation {
  createValoracion(createValoracionInput: {
    puntuacion: 5
    comentario: "Excelente lugar!"
    usuarioId: 1
    lugarTuristicoId: 1
  }) {
    id
    puntuacion
    comentario
    usuarioId
    lugarTuristicoId
  }
}
```

### Crear una temporada
```graphql
mutation {
  createTemporada(createTemporadaInput: {
    nombre: "Verano"
    fechaInicio: "2025-06-01T00:00:00.000Z"
    fechaFin: "2025-08-31T00:00:00.000Z"
  }) {
    id
    nombre
    fechaInicio
    fechaFin
  }
}
```

## Notas de seguridad

- Las contraseñas de usuario se almacenan con hash (bcrypt).
- Los endpoints protegidos requieren autenticación JWT.
- Validación de datos con class-validator.

## Base de datos

El sistema utiliza SQLite y crea automáticamente el archivo `database.sqlite`.

## Variables de entorno recomendadas

```env
JWT_SECRET=your-very-secure-secret-key
JWT_EXPIRES_IN=24h
DATABASE_URL=your-database-url
PORT=3000
```

## Comandos útiles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test
npm run test:e2e

# Linting
npm run lint
```

## Autor y licencia

Desarrollado para práctica académica.
Licencia MIT.
