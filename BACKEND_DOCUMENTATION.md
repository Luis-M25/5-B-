# Backend Implementation - Sistema de Gasolinera

Este proyecto implementa el backend necesario para las tres pantallas del sistema de gasolinera, utilizando diferentes tecnologías para cada una:

## Arquitectura del Sistema

### 1. REST API - Pantalla 1: Selección de Operadores y Surtidores
**Puerto**: 3001
**Tecnología**: NestJS con REST API
**Funcionalidad**: Gestión de operadores y surtidores para iniciar el proceso de venta

#### Endpoints Principales:

**Operadores:**
- `GET /operadores` - Obtener lista de operadores con filtros opcionales
- `GET /operadores/disponibles` - Obtener operadores disponibles para asignar
- `GET /operadores/:id` - Obtener detalles específicos de un operador

**Surtidores:**
- `GET /surtidores` - Obtener lista de surtidores con filtros opcionales
- `GET /surtidores/disponibles` - Obtener surtidores disponibles
- `GET /surtidores/:id` - Obtener detalles específicos de un surtidor
- `POST /surtidores/asignar` - Asignar un surtidor a un operador
- `POST /surtidores/liberar` - Liberar un surtidor

#### Ejemplo de uso:

```bash
# Obtener operadores disponibles
curl -X GET http://localhost:3001/operadores/disponibles

# Obtener surtidores con filtros
curl -X GET "http://localhost:3001/surtidores?estado=disponible&ubicacion=Zona A"

# Asignar surtidor
curl -X POST http://localhost:3001/surtidores/asignar \
  -H "Content-Type: application/json" \
  -d '{"surtidorId": "surt_001", "operadorId": "op_001"}'
```

### 2. GraphQL API - Pantalla 2: Tipos de Gasolina y Cálculos
**Puerto**: 3002
**Tecnología**: NestJS con GraphQL
**Funcionalidad**: Consulta de tipos de gasolina, cálculos de costos y simulaciones

#### Schema Principal:

```graphql
type Query {
  # Tipos de Gasolina
  tiposGasolina(filtros: FiltroTiposGasolinaInput): [TipoGasolinaType!]!
  tiposGasolinaDisponibles: [TipoGasolinaType!]!
  tipoGasolina(id: ID!): TipoGasolinaType
  verificarDisponibilidadGasolina(tipoGasolina: String!, cantidadRequerida: Float!): Boolean!
  stockDisponible(tipoGasolina: String!): Float!
  
  # Cálculos
  calcularCosto(input: CalcularCostoDetalladoInput!): CalculoResultType!
  calcularCostoBasico(tipoGasolina: String!, litros: Float!): CalculoResultType!
  simularVenta(input: SimulacionVentaInput!): CalculoResultType!
  compararPrecios: [ComparacionPreciosType!]!
  validarCapacidadSurtidor(surtidorId: String!, litros: Float!): Boolean!
  estimarTiempoDespacho(litros: Float!): Float!
}
```

#### Ejemplo de uso:

```graphql
# Obtener tipos de gasolina disponibles
query {
  tiposGasolinaDisponibles {
    id
    tipo
    nombre
    precioActual
    stock
    disponible
  }
}

# Calcular costo detallado
query {
  calcularCosto(input: {
    tipoGasolina: "regular"
    litros: 10.5
    surtidorId: "surt_001"
    aplicarDescuentos: true
    incluirImpuestos: true
  }) {
    tipoGasolina
    litros
    precioLitro
    subtotal
    impuestos
    descuentos
    total
    disponible
    stockDisponible
  }
}

# Simular venta
query {
  simularVenta(input: {
    tipoGasolina: "premium"
    litros: 20.0
    surtidorId: "surt_002"
    operadorId: "op_001"
  }) {
    total
    disponible
    tiempoEstimado
  }
}
```

### 3. WebSocket API - Pantalla 3: Formas de Pago y Clientes
**Puerto**: 3003
**Tecnología**: NestJS con Socket.IO
**Funcionalidad**: Procesamiento de ventas en tiempo real, gestión de clientes y formas de pago

#### Eventos Principales:

**Formas de Pago:**
- `obtener_formas_pago` - Obtener formas de pago disponibles
- `validar_forma_pago` - Validar una forma de pago específica

**Clientes:**
- `buscar_clientes` - Buscar clientes por filtros
- `buscar_cliente_por_cedula` - Buscar cliente específico por cédula
- `registrar_cliente` - Registrar nuevo cliente

**Ventas:**
- `iniciar_venta` - Iniciar proceso de venta
- `procesar_venta` - Procesar venta (con progreso en tiempo real)
- `completar_venta` - Finalizar venta
- `cancelar_venta` - Cancelar venta
- `obtener_ventas_en_proceso` - Obtener ventas actualmente en proceso

#### Ejemplo de uso con JavaScript:

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3003/gasolinera');

// Buscar cliente por cédula
socket.emit('buscar_cliente_por_cedula', { cedula: '12345678' });

socket.on('cliente_encontrado', (response) => {
  if (response.success && response.data) {
    console.log('Cliente encontrado:', response.data);
  } else {
    console.log('Cliente no encontrado');
  }
});

// Registrar nuevo cliente
socket.emit('registrar_cliente', {
  nombre: 'Juan Pérez',
  cedula: '87654321',
  telefono: '555-0123',
  email: 'juan@email.com',
  tipoCliente: 'nuevo'
});

// Iniciar venta
socket.emit('iniciar_venta', {
  operadorId: 'op_001',
  surtidorId: 'surt_001',
  clienteId: 'cli_001',
  tipoGasolina: 'regular',
  litros: 15.0,
  precioLitro: 1.25,
  montoTotal: 18.75,
  formaPago: 'efectivo'
});

// Escuchar progreso de venta
socket.on('progreso_venta', (data) => {
  console.log(`Progreso de venta ${data.ventaId}: ${data.progreso}%`);
});

// Procesar venta
socket.emit('procesar_venta', { ventaId: 'venta_123456789' });

// Completar venta
socket.emit('completar_venta', { ventaId: 'venta_123456789' });
```

## Estructura de Datos

### Respuestas REST API
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
}
```

### Modelos GraphQL
```typescript
interface CalculoResultType {
  tipoGasolina: string;
  litros: number;
  precioLitro: number;
  subtotal: number;
  impuestos: number;
  descuentos: number;
  total: number;
  disponible: boolean;
  stockDisponible: number;
  fechaCalculo: Date;
}
```

### Eventos WebSocket
```typescript
interface VentaEnProcesoDto {
  id: string;
  operadorId: string;
  surtidorId: string;
  clienteId?: string;
  tipoGasolina: string;
  litros: number;
  precioLitro: number;
  montoTotal: number;
  formaPago: string;
  estado: 'pendiente' | 'procesando' | 'completada' | 'cancelada' | 'error';
  fechaInicio: Date;
  progreso: number; // 0-100
  tiempoEstimado: number; // segundos
  numeroRecibo?: string;
}
```

## Instalación y Ejecución

### Prerrequisitos
- Node.js v18 o superior
- npm o yarn

### Instalación

1. **REST API:**
```bash
cd rest-api
npm install
npm run start:dev
```

2. **GraphQL API:**
```bash
cd graphql-api
npm install
npm run start:dev
```

3. **WebSocket API:**
```bash
cd websocket-api
npm install
npm run start:dev
```

### Verificación

1. **REST API**: http://localhost:3001/operadores
2. **GraphQL API**: http://localhost:3002/graphql (GraphQL Playground)
3. **WebSocket API**: http://localhost:3003 (con cliente Socket.IO)

## Flujo de Trabajo Completo

### 1. Selección de Operador y Surtidor (REST API)
```bash
# Obtener operadores disponibles
GET /operadores/disponibles

# Obtener surtidores disponibles
GET /surtidores/disponibles

# Asignar surtidor a operador
POST /surtidores/asignar
```

### 2. Selección de Gasolina y Cálculo (GraphQL API)
```graphql
# Obtener tipos disponibles
query { tiposGasolinaDisponibles { ... } }

# Calcular costo
query { calcularCosto(input: { ... }) { ... } }
```

### 3. Proceso de Venta (WebSocket API)
```javascript
// Buscar/registrar cliente
socket.emit('buscar_cliente_por_cedula', { cedula: '...' });

// Iniciar venta
socket.emit('iniciar_venta', { ... });

// Procesar y completar
socket.emit('procesar_venta', { ventaId: '...' });
socket.emit('completar_venta', { ventaId: '...' });
```

## Características Implementadas

### REST API (Pantalla 1)
- ✅ Listado de operadores con filtros
- ✅ Verificación de disponibilidad de operadores
- ✅ Estadísticas de operadores (ventas del día, monto vendido)
- ✅ Listado de surtidores con filtros
- ✅ Estado en tiempo real de surtidores
- ✅ Asignación y liberación de surtidores
- ✅ Validación de capacidad y disponibilidad

### GraphQL API (Pantalla 2)
- ✅ Consulta de tipos de gasolina con filtros flexibles
- ✅ Cálculos detallados de costos (subtotal, impuestos, descuentos)
- ✅ Simulación de ventas
- ✅ Comparación de precios históricos
- ✅ Validación de stock y disponibilidad
- ✅ Estimación de tiempos de despacho

### WebSocket API (Pantalla 3)
- ✅ Búsqueda de clientes en tiempo real
- ✅ Registro de nuevos clientes
- ✅ Validación de formas de pago
- ✅ Procesamiento de ventas con progreso en tiempo real
- ✅ Notificaciones en tiempo real a todos los clientes conectados
- ✅ Gestión de estado de ventas en proceso
- ✅ Generación automática de números de recibo

## Tecnologías Utilizadas

- **NestJS**: Framework principal para todas las APIs
- **TypeScript**: Lenguaje de programación
- **Socket.IO**: WebSockets para comunicación en tiempo real
- **GraphQL**: Para consultas flexibles y eficientes
- **Class Validator**: Validación de datos de entrada
- **JSON**: Persistencia de datos (simulada)

Este backend está completamente preparado para que el frontend pueda desarrollarse posteriormente, con todas las funcionalidades necesarias para gestionar el flujo completo de una venta de gasolina.
