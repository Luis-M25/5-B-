# Repositorio 5-B - Luis Méndoza

Este repositorio contiene proyectos y prácticas de la materia de Arquitectura de Software Web.

## 📁 Estructura del Repositorio

### **SegundoParcial - Sistema de Gestión de Gasolinera**

**ExamenSegundoParcial/** - Sistema completo de gestión de gasolinera con tres tipos de APIs:

- **REST API** (Puerto 3001) - Pantalla 1: Selección de operadores y surtidores
- **GraphQL API** (Puerto 3002) - Pantalla 2: Tipos de gasolina y cálculos de costo  
- **WebSocket API** (Puerto 3003) - Pantalla 3: Formas de pago y datos de clientes

#### 🏗️ Arquitectura del Sistema

**Entidades Principales:**
1. **Operador**: Trabajadores que gestionan las ventas
2. **Surtidor**: Bombas de gasolina con diferentes estados
3. **TipoGasolina**: Tipos de combustible disponibles
4. **Precio**: Precios por tipo de gasolina
5. **FormaPago**: Métodos de pago aceptados
6. **Cliente**: Clientes registrados (opcional)
7. **Venta**: Transacciones de venta de combustible

**Estructura de Archivos Compartidos:**
```
/shared/
├── interfaces.ts          # Definiciones de tipos TypeScript
├── dtos.ts               # Data Transfer Objects con validación
└── data-persistence.service.ts  # Servicio de persistencia JSON
```

#### 🚀 Instalación y Configuración del ExamenSegundoParcial

**Prerequisitos:**
- Node.js 18+
- npm o yarn

**Instalación:**

1. **REST API**
```bash
cd rest-api

**Descripción**: Sistema CRUD en tiempo real para manejo de lugares turísticos con WebSocket y Socket.IO

**Tecnologías**:
- NestJS (Framework Node.js)
- Socket.IO (WebSocket en tiempo real)
- TypeScript
- SQLite (Base de datos)
- Postman (Documentación y pruebas)

**Características**:
- ✅ CRUD completo para lugares turísticos
- ✅ Sistema de temporadas
- ✅ Valoraciones y comentarios
- ✅ Búsqueda con geolocalización
- ✅ Comunicación en tiempo real con WebSocket
- ✅ Documentación completa con Postman
- ✅ Guía específica para pruebas WebSocket

**Cómo usar**:
```bash
cd realtime-crud-project
>>>>>>> 666ac5e0f14503b4be95f0b80126aa259c327dca
npm install
npm run start:dev
```

<<<<<<< HEAD
2. **GraphQL API**
```bash
cd graphql-api
npm install
npm run start:dev
```

3. **WebSocket API**
```bash
cd websocket-api
npm install
npm run start:dev
```

## 📡 REST API (Puerto 3001)

### Endpoints Principales

#### Operadores
- `GET /operadores` - Listar operadores
- `POST /operadores` - Crear operador
- `GET /operadores/:id` - Obtener operador por ID
- `PUT /operadores/:id` - Actualizar operador
- `DELETE /operadores/:id` - Eliminar operador

#### Surtidores
- `GET /surtidores` - Listar surtidores
- `POST /surtidores` - Crear surtidor
- `GET /surtidores/:id` - Obtener surtidor por ID
- `PUT /surtidores/:id` - Actualizar surtidor
- `DELETE /surtidores/:id` - Eliminar surtidor

#### Ventas
- `GET /ventas` - Listar ventas (con paginación)
- `POST /ventas` - Crear venta
- `GET /ventas/:id` - Obtener venta por ID
- `PUT /ventas/:id` - Actualizar venta

#### Cálculos
- `POST /calculos/costo` - Calcular costo de combustible

#### Estadísticas
- `GET /estadisticas` - Obtener estadísticas generales
- `GET /estadisticas/operador/:id` - Estadísticas por operador
- `GET /estadisticas/fecha/:fecha` - Estadísticas por fecha

### Ejemplo de Uso REST

```bash
# Crear una venta
curl -X POST http://localhost:3001/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "operadorId": "1",
    "surtidorId": "1",
    "tipoGasolina": "regular",
    "litros": 20,
    "formaPago": "efectivo"
  }'

# Obtener estadísticas
curl http://localhost:3001/estadisticas
```

## 🎯 GraphQL API (Puerto 3002)

### Playground
Accede al GraphQL Playground en: `http://localhost:3002/graphql`

### Queries Principales

```graphql
# Obtener operadores
query {
  operadores {
    id
    nombre
    turno
    estado
  }
}

# Obtener surtidores
query {
  surtidores {
    id
    numero
    estado
    tipoGasolina
  }
}

# Obtener ventas con paginación
query {
  ventas(page: 1, limit: 10) {
    id
    operadorId
    surtidorId
    tipoGasolina
    litros
    montoTotal
    fechaCreacion
  }
}
```

### Mutations

```graphql
# Crear operador
mutation {
  createOperador(input: {
    nombre: "Juan Pérez"
    identificacion: "12345678"
    turno: "mañana"
    telefono: "555-0123"
  }) {
    id
    nombre
    estado
  }
}

# Crear venta
mutation {
  createVenta(input: {
    operadorId: "1"
    surtidorId: "1"
    tipoGasolina: "regular"
    litros: 25.5
    formaPago: "tarjeta"
  }) {
    id
    montoTotal
    fechaCreacion
  }
}
```

## 🔄 WebSocket API (Puerto 3000)

### Cliente de Prueba
Abre `websocket-api/client-test.html` en tu navegador para probar la funcionalidad WebSocket.

### Eventos Disponibles

#### Autenticación
```javascript
// Autenticar operador
socket.emit('autenticar-operador', { operadorId: '1' });

// Respuesta
socket.on('autenticacion-exitosa', (data) => {
  console.log('Operador autenticado:', data.operador);
});
```

#### Gestión de Surtidores
```javascript
// Seleccionar surtidor
socket.emit('seleccionar-surtidor', { surtidorId: '1' });

// Liberar surtidor
socket.emit('liberar-surtidor', { surtidorId: '1' });

// Escuchar cambios de estado
socket.on('surtidor-estado-cambiado', (data) => {
  console.log(`Surtidor ${data.surtidorId}: ${data.nuevoEstado}`);
});
```

#### Ventas en Tiempo Real
```javascript
// Calcular costo
socket.emit('calcular-costo', {
  tipoGasolina: 'regular',
  litros: 20
});

// Crear venta
socket.emit('crear-venta', {
  surtidorId: '1',
  tipoGasolina: 'regular',
  litros: 20,
  formaPago: 'efectivo'
});

// Escuchar nuevas ventas
socket.on('nueva-venta', (data) => {
  console.log('Nueva venta:', data);
});
```

#### Estadísticas en Tiempo Real
```javascript
// Obtener estadísticas
socket.emit('obtener-estadisticas');

// Escuchar actualizaciones
socket.on('estadisticas-actualizadas', (stats) => {
  console.log('Estadísticas:', stats);
});
```

## 💾 Persistencia de Datos

Los datos se almacenan en un archivo JSON (`data.json`) que incluye:

```json
{
  "operadores": [...],
  "surtidores": [...],
  "tiposGasolina": [...],
  "precios": [...],
  "formasPago": [...],
  "clientes": [...],
  "ventas": [...]
}
```

### Datos de Prueba Incluidos

- 3 operadores de ejemplo
- 6 surtidores con diferentes tipos de gasolina
- Precios actuales para Regular, Premium y Diesel
- Formas de pago: Efectivo y Tarjeta
- Ventas de ejemplo para testing

## 🔧 Funcionalidades del Sistema

### Lógica de Negocio
- **Cálculo automático de costos** basado en precios actuales
- **Gestión de estados de surtidores** (disponible, ocupado, mantenimiento)
- **Validación de datos** en todas las capas
- **Estadísticas en tiempo real**
- **Notificaciones en tiempo real** vía WebSocket

### Validaciones Implementadas
- Operadores deben estar activos para realizar ventas
- Surtidores deben estar disponibles para ser seleccionados
- Tipos de gasolina deben tener stock disponible
- Validación de cantidades mínimas y máximas

### Características Avanzadas
- **Paginación** en consultas de ventas
- **Filtros por fecha** en estadísticas
- **Cálculo de promedios** y totales
- **Manejo de errores** consistente
- **Logging** de eventos importantes

## 🧪 Testing

### Probar REST API
```bash
# Usar el archivo de colección de Postman incluido
# O usar curl para pruebas rápidas
curl http://localhost:3001/operadores
```

### Probar GraphQL API
1. Ve a `http://localhost:3002/graphql`
2. Usa el playground integrado
3. Ejecuta las queries de ejemplo

### Probar WebSocket API
1. Abre `websocket-api/client-test.html`
2. Conecta al servidor
3. Autentica con un operador
4. Prueba las funcionalidades en tiempo real

## 📋 Estados del Sistema

### Estados de Surtidor
- `disponible`: Listo para usar
- `ocupado`: En uso por un operador
- `mantenimiento`: Fuera de servicio

### Estados de Operador
- `activo`: Puede realizar ventas
- `inactivo`: No puede realizar operaciones

### Estados de Venta
- `pendiente`: Venta iniciada pero no completada
- `completada`: Venta finalizada exitosamente
- `cancelada`: Venta cancelada

## 🚀 Despliegue

Para producción, considera:

1. **Base de datos real** (PostgreSQL, MongoDB)
2. **Variables de entorno** para configuración
3. **Autenticación JWT** para operadores
4. **Rate limiting** en APIs
5. **Monitoring** y logging avanzado
6. **Docker containers** para deployment

## 📚 Tecnologías Utilizadas

- **NestJS** - Framework Node.js
- **TypeScript** - Tipado estático
- **Socket.IO** - WebSockets en tiempo real
- **Apollo Server** - GraphQL
- **Class Validator** - Validación de DTOs
- **Class Transformer** - Transformación de datos

## 📞 Soporte

Para dudas o problemas:
1. Revisa los logs de la aplicación
2. Verifica que todos los servicios estén ejecutándose
3. Consulta la documentación de APIs
4. Usa el cliente de prueba WebSocket para debugging
=======
## Prácticas y Ejercicios

### 📁 Prácticas Complementarias
- **PracticaComplementaria1**: Fundamentos de desarrollo web
- **PracticaComplementaria2**: Aplicación de conceptos avanzados
- **PracticaComplementaria3**: Integración y despliegue
- **PracticaComplementaria(SegundoParcial)4**: Prácticas del segundo parcial

### 📁 Semanas de Aprendizaje
- **Semana1**: Introducción a arquitectura web
- **Semana2**: Conceptos fundamentales
- **Semana4**: Desarrollo de aplicaciones
- **Semana5**: Optimización y buenas prácticas

npm install
npm run start:dev
```

2. **GraphQL API**
```bash
cd graphql-api
npm install
npm run start:dev
```

3. **WebSocket API**
```bash
cd websocket-api
npm install
npm run start:dev
```

#### � Scripts de Inicio Rápido

**Iniciar todas las APIs:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Detener todas las APIs:**
```bash
chmod +x stop-backend.sh
./stop-backend.sh
```

### **PrimerParcial**

### 📂 [ExamenPrimerParcial](./PrimerParcial/ExamenPrimerParcial)
Sistema de gestión académica con arquitectura DDD (Domain-Driven Design)

### 📂 [PracticaComplementaria1](./PrimerParcial/PracticaComplementaria1)
Sistema de recomendaciones turísticas con TypeScript

### 📂 [PracticaComplementaria2](./PrimerParcial/PracticaComplementaria2)
API REST para gestión de destinos turísticos

### 📂 [PracticaComplementaria3](./PrimerParcial/PracticaComplementaria3)
Sistema avanzado con TypeORM y MongoDB

### 📂 [realtime-crud-project](./SegundoParcial/realtime-crud-project)
Sistema CRUD en tiempo real con WebSockets

### 📂 [graphql-auth](./SegundoParcial/graphql-auth)
API GraphQL con autenticación JWT

### 📂 [PracticaComplementaria(SegundoParcial)4](./SegundoParcial/PracticaComplementaria(SegundoParcial)4)
Práctica complementaria del segundo parcial

### 📁 Prácticas por Semana
- **Semana1**: Introducción a Python y TypeScript
- **Semana2**: Fundamentos de TypeScript
- **Semana4**: Base de datos con SQLite
- **Semana5**: Proyectos avanzados

## Estructura del Repositorio

```
📁 5-B/
├── 📄 README.md (este archivo)
├── 📄 .gitignore
├── 📁 ExamenSegundoParcial/ (🆕 NUEVO - Sistema Gasolinera)
│   ├── 📄 README.md
│   ├── � rest-api/ (Puerto 3001)
│   ├── 📁 graphql-api/ (Puerto 3002)
│   ├── 📁 websocket-api/ (Puerto 3003)
│   ├── 📁 shared/ (Interfaces comunes)
│   └── � start-backend.sh
├── 📁 PrimerParcial/
│   ├── 📁 ExamenPrimerParcial/
│   ├── 📁 PracticaComplementaria1/
│   ├── 📁 PracticaComplementaria2/
│   ├── 📁 PracticaComplementaria3/
│   ├── 📁 Semana1/
│   ├── 📁 Semana2/
│   ├── 📁 Semana4/
│   └── 📁 Semana5/
└── 📁 SegundoParcial/
    ├── 📁 realtime-crud-project/
    ├── 📁 graphql-auth/
    └── 📁 PracticaComplementaria(SegundoParcial)4/
```

## Documentación Específica

### Para el ExamenSegundoParcial:
- [Documentación completa](./ExamenSegundoParcial/README.md)
- [Documentación técnica](./ExamenSegundoParcial/BACKEND_DOCUMENTATION.md)
- [Proyecto completado](./ExamenSegundoParcial/PROYECTO-COMPLETADO.md)

### Para otros proyectos:
- [README del realtime-crud-project](./SegundoParcial/realtime-crud-project/README.md)
- [Guía de pruebas Postman](./SegundoParcial/realtime-crud-project/postman/README.md)
- [Guía de pruebas WebSocket](./SegundoParcial/realtime-crud-project/postman/WebSocket-Tests-Guide.md)

### Para las Prácticas:
- Cada carpeta contiene su propia documentación
- Revisa los archivos README.md en cada directorio
- Ejercicios organizados por semana y tipo

## Información del Estudiante

- **Nombre**: Luis Méndoza
- **Materia**: Arquitectura de Software Web
- **Grupo**: 5-B
- **Fecha**: Agosto 2025

## Notas Importantes

- **🆕 ExamenSegundoParcial**: Sistema completo de gasolinera con 3 APIs diferentes
- **Proyecto Principal**: `realtime-crud-project/` contiene el sistema completo
- **Prácticas**: Organizadas por semana y tipo de ejercicio
- **Documentación**: Cada proyecto tiene su propia documentación
- **Versionado**: Cada práctica mantiene su historial independiente

---

**¡Explora los proyectos y prácticas! 🚀**
