# 🏖️ Sistema de Gestión Turística

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">API REST para gestión de lugares turísticos, temporadas y búsquedas desarrollada con NestJS y TypeORM.</p>

## 📋 Descripción del Proyecto

Este proyecto es una **API REST completa** para la gestión de un sistema turístico que incluye:

- **🔍 Búsquedas**: Gestión de consultas de usuarios sobre destinos turísticos
- **🏞️ Lugares Turísticos**: CRUD completo con funcionalidades de geolocalización
- **📅 Temporadas**: Sistema de gestión de temporadas altas, medias y bajas con factores de precio

### ✨ Características Principales

- **Arquitectura modular** siguiendo las mejores prácticas de NestJS
- **Base de datos SQLite** con TypeORM para desarrollo
- **Validación de datos** con DTOs y decoradores
- **Búsqueda geoespacial** para lugares cercanos
- **Gestión inteligente de temporadas** con validación de fechas
- **API RESTful** con endpoints especializados

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para TypeScript
- **SQLite** - Base de datos
- **Class Validator** - Validación de DTOs
- **TypeScript** - Lenguaje de programación

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Ejecutar el Proyecto

```bash
# Modo desarrollo (recomendado)
npm run start:dev

# Modo desarrollo simple
npm run start

# Modo producción
npm run start:prod
```

La aplicación estará disponible en: `http://localhost:3000`

## 📡 Endpoints Disponibles

### 🔍 Búsquedas (`/busqueda`)
- `POST /busqueda` - Crear nueva búsqueda
- `GET /busqueda` - Obtener todas las búsquedas
- `GET /busqueda/:id` - Obtener búsqueda específica
- `PATCH /busqueda/:id` - Actualizar búsqueda
- `DELETE /busqueda/:id` - Eliminar búsqueda

### 🏞️ Lugares Turísticos (`/lugar-turisitco`)
- `POST /lugar-turisitco` - Crear nuevo lugar
- `GET /lugar-turisitco` - Obtener todos los lugares
- `GET /lugar-turisitco/:id` - Obtener lugar específico
- `GET /lugar-turisitco/categoria/:categoria` - Buscar por categoría
- `GET /lugar-turisitco/ubicacion/:ubicacion` - Buscar por ubicación
- `GET /lugar-turisitco/nearby?latitud=X&longitud=Y&radio=Z` - Lugares cercanos
- `PATCH /lugar-turisitco/:id` - Actualizar lugar
- `DELETE /lugar-turisitco/:id` - Eliminar lugar

### 📅 Temporadas (`/temporada`)
- `POST /temporada` - Crear nueva temporada
- `GET /temporada` - Obtener todas las temporadas
- `GET /temporada/:id` - Obtener temporada específica
- `GET /temporada/tipo/:tipo` - Buscar por tipo (alta/media/baja/especial)
- `GET /temporada/activas` - Obtener temporadas activas
- `GET /temporada/actual` - Obtener temporada actual
- `GET /temporada/proximas` - Obtener próximas temporadas
- `PATCH /temporada/:id` - Actualizar temporada
- `DELETE /temporada/:id` - Eliminar temporada

## 🧪 Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## 📂 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── busqueda/                  # Módulo de búsquedas
│   ├── dto/                   # DTOs de validación
│   ├── entities/              # Entidad de base de datos
│   ├── busqueda.controller.ts # Controlador REST
│   ├── busqueda.service.ts    # Lógica de negocio
│   └── busqueda.module.ts     # Configuración del módulo
├── lugar-turisitco/          # Módulo de lugares turísticos
│   └── ...                   # Estructura similar
└── temporada/                # Módulo de temporadas
    └── ...                   # Estructura similar
```

## 🌟 Ejemplos de Uso

### Crear un Lugar Turístico
```bash
POST /lugar-turisitco
{
  "nombre": "Playa del Carmen",
  "descripcion": "Hermosa playa con aguas cristalinas",
  "ubicacion": "Quintana Roo, México",
  "categoria": "playa",
  "latitud": 20.6296,
  "longitud": -87.0739,
  "precio": 50.00,
  "valoracion": 4.5
}
```

### Buscar Lugares Cercanos
```bash
GET /lugar-turisitco/nearby?latitud=20.6296&longitud=-87.0739&radio=10
```

### Crear Temporada Alta
```bash
POST /temporada
{
  "nombre": "Temporada Alta Navideña",
  "descripcion": "Período navideño con alta demanda",
  "fechaInicio": "2025-12-15",
  "fechaFin": "2026-01-15",
  "tipo": "alta",
  "factorPrecio": 1.8,
  "popularidad": 95
}
```

## 🧪 Pruebas con cURL

A continuación se presentan ejemplos de cURL para probar todos los 15 endpoints implementados:

### 🔍 Endpoints de Búsquedas (5)

#### 1. Crear búsqueda
```bash
curl -X POST http://localhost:3000/busqueda \
  -H "Content-Type: application/json" \
  -d '{
    "termino": "playas paradisíacas",
    "ubicacion": "Riviera Maya",
    "categoria": "playa",
    "fechaInicio": "2025-07-01",
    "fechaFin": "2025-07-15",
    "resultados": 25
  }'
```

#### 2. Obtener todas las búsquedas
```bash
curl -X GET http://localhost:3000/busqueda
```

#### 3. Obtener búsqueda por ID
```bash
curl -X GET http://localhost:3000/busqueda/1
```

#### 4. Actualizar búsqueda
```bash
curl -X PATCH http://localhost:3000/busqueda/1 \
  -H "Content-Type: application/json" \
  -d '{
    "termino": "hoteles de lujo",
    "resultados": 15
  }'
```

#### 5. Eliminar búsqueda
```bash
curl -X DELETE http://localhost:3000/busqueda/1
```

### 🏞️ Endpoints de Lugares Turísticos (5)

#### 1. Crear lugar turístico
```bash
curl -X POST http://localhost:3000/lugar-turisitco \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Cenote Dos Ojos",
    "descripcion": "Impresionante cenote con aguas cristalinas perfectas para buceo",
    "ubicacion": "Tulum, Quintana Roo, México",
    "categoria": "cenote",
    "latitud": 20.2285,
    "longitud": -87.3654,
    "precio": 350.00,
    "estado": "abierto",
    "valoracion": 4.8
  }'
```

#### 2. Obtener todos los lugares turísticos
```bash
curl -X GET http://localhost:3000/lugar-turisitco
```

#### 3. Obtener lugar turístico por ID
```bash
curl -X GET http://localhost:3000/lugar-turisitco/1
```

#### 4. Actualizar lugar turístico
```bash
curl -X PATCH http://localhost:3000/lugar-turisitco/1 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 400.00,
    "valoracion": 4.9
  }'
```

#### 5. Eliminar lugar turístico
```bash
curl -X DELETE http://localhost:3000/lugar-turisitco/1
```

### 📅 Endpoints de Temporadas (5)

#### 1. Crear temporada
```bash
curl -X POST http://localhost:3000/temporada \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Temporada de Verano",
    "descripcion": "Período de mayor afluencia turística con clima perfecto",
    "fechaInicio": "2025-06-21",
    "fechaFin": "2025-09-21",
    "tipo": "alta",
    "factorPrecio": 2.0,
    "estado": "activa",
    "popularidad": 90,
    "clima": "Soleado y cálido"
  }'
```

#### 2. Obtener todas las temporadas
```bash
curl -X GET http://localhost:3000/temporada
```

#### 3. Obtener temporada por ID
```bash
curl -X GET http://localhost:3000/temporada/1
```

#### 4. Actualizar temporada
```bash
curl -X PATCH http://localhost:3000/temporada/1 \
  -H "Content-Type: application/json" \
  -d '{
    "factorPrecio": 2.2,
    "popularidad": 95
  }'
```

#### 5. Eliminar temporada
```bash
curl -X DELETE http://localhost:3000/temporada/1
```

### 🎯 Endpoints Especializados Adicionales

#### Buscar lugares por categoría
```bash
curl -X GET http://localhost:3000/lugar-turisitco/categoria/playa
```

#### Buscar lugares por ubicación
```bash
curl -X GET http://localhost:3000/lugar-turisitco/ubicacion/tulum
```

#### Buscar lugares cercanos (geolocalización)
```bash
curl -X GET "http://localhost:3000/lugar-turisitco/nearby?latitud=20.2285&longitud=-87.3654&radio=5"
```

#### Buscar temporadas por tipo
```bash
curl -X GET http://localhost:3000/temporada/tipo/alta
```

#### Obtener temporadas activas
```bash
curl -X GET http://localhost:3000/temporada/activas
```

#### Obtener temporada actual
```bash
curl -X GET http://localhost:3000/temporada/actual
```

#### Obtener próximas temporadas
```bash
curl -X GET http://localhost:3000/temporada/proximas
```

### 📝 Notas para las Pruebas

- **Asegúrate** de que el servidor esté ejecutándose en `http://localhost:3000`
- **Sustituye los IDs** (1, 2, etc.) por IDs reales devueltos por la API
- **Headers necesarios**: Los POST y PATCH requieren `Content-Type: application/json`
- **Códigos de respuesta esperados**:
  - `201`: Creación exitosa (POST)
  - `200`: Operación exitosa (GET, PATCH)
  - `204`: Eliminación exitosa (DELETE)
  - `400`: Error de validación
  - `404`: Recurso no encontrado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
