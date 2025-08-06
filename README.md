# Sistema de Gestión de Gasolinera

Este proyecto implementa un sistema completo de gestión de gasolinera con tres tipos de APIs diferentes:

- **REST API** (Puerto 3001)
- **GraphQL API** (Puerto 3002)  
- **WebSocket API** (Puerto 3000)

## 🏗️ Arquitectura del Sistema

### Entidades Principales

1. **Operador**: Trabajadores que gestionan las ventas
2. **Surtidor**: Bombas de gasolina con diferentes estados
3. **TipoGasolina**: Tipos de combustible disponibles
4. **Precio**: Precios por tipo de gasolina
5. **FormaPago**: Métodos de pago aceptados
6. **Cliente**: Clientes registrados (opcional)
7. **Venta**: Transacciones de venta de combustible

### Estructura de Archivos Compartidos

```
/shared/
├── interfaces.ts          # Definiciones de tipos TypeScript
├── dtos.ts               # Data Transfer Objects con validación
└── data-persistence.service.ts  # Servicio de persistencia JSON
```

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js 18+
- npm o yarn

### Instalación

1. **REST API**
```bash
cd rest-api
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
