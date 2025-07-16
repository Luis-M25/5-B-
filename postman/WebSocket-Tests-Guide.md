# 🚀 Guía de Pruebas WebSocket en Postman

## ⚠️ Problema Común

**Error**: "Socket.IO requests cannot be saved to collections with HTTP requests"

**Solución**: Crear colecciones separadas para WebSocket y HTTP

## 🔧 Configuración Paso a Paso

### 1. Crear Colección Separada para WebSocket

1. **Abrir Postman**
2. **Crear nueva colección**:
   - Clic en "New" → "Collection"
   - Nombre: `WebSocket Tourism Tests`
   - Descripción: `Pruebas Socket.IO para el sistema de turismo`
   - Clic en "Create"

### 2. Crear Request WebSocket

1. **En la nueva colección WebSocket**:
   - Clic en "New" → "WebSocket Request"
   - URL: `ws://localhost:3000/lugarturistico`
   - Nombre: `Test Lugar Turístico WebSocket`

2. **Conectar**:
   - Haz clic en "Connect"
   - Verifica que aparezca "Connected" en verde

### 3. Enviar Mensajes

#### **Método A: Mensaje Simple**
```
findAllLugarTuristico
```

#### **Método B: Mensaje con Datos**
```json
{
  "event": "createLugarTuristico",
  "data": {
    "nombre": "Machu Picchu",
    "descripcion": "Ciudadela inca",
    "ubicacion": "Cusco, Perú",
    "latitud": -13.163141,
    "longitud": -72.544963,
    "categoria": "arqueológico",
    "precioPromedio": 152.00,
    "activo": true
  }
}
```

## 📂 Estructura de Colecciones Recomendada

```
📁 Realtime CRUD Tourism (HTTP)
  ├── 📄 Health Check
  ├── 📁 Lugares Turísticos
  ├── 📁 Temporadas
  ├── 📁 Valoraciones
  └── 📁 Búsquedas

📁 WebSocket Tourism Tests (WebSocket)
  ├── 📄 Lugar Turístico WebSocket
  ├── 📄 Temporada WebSocket
  ├── 📄 Valoración WebSocket
  └── 📄 Búsqueda WebSocket
```

## 🌐 Requests WebSocket por Módulo

### **Lugar Turístico** (`ws://localhost:3000/lugarturistico`)

#### **Eventos para Enviar:**
- `findAllLugarTuristico`
- `createLugarTuristico`
- `updateLugarTuristico`

#### **Eventos que Recibes:**
- `lugaresList`
- `lugarCreado`
- `lugarActualizado`

#### **Ejemplo de Mensaje para Crear:**
```json
{
  "event": "createLugarTuristico",
  "data": {
    "nombre": "Machu Picchu",
    "descripcion": "Ciudadela inca ubicada en los Andes peruanos",
    "ubicacion": "Cusco, Perú",
    "latitud": -13.163141,
    "longitud": -72.544963,
    "categoria": "arqueológico",
    "precioPromedio": 152.00,
    "imagenUrl": "https://example.com/machu-picchu.jpg",
    "horarios": "6:00 AM - 5:30 PM",
    "contacto": "info@machupicchu.gob.pe",
    "activo": true
  }
}
```

### **Temporada** (`ws://localhost:3000/temporada`)

#### **Eventos para Enviar:**
- `findAllTemporada`
- `findTemporadaActual`
- `createTemporada`

#### **Eventos que Recibes:**
- `temporadasList`
- `temporadaActual`
- `temporadaCreada`

#### **Ejemplo de Mensaje para Crear:**
```json
{
  "event": "createTemporada",
  "data": {
    "nombre": "Temporada Alta Verano",
    "descripcion": "Temporada de mayor afluencia turística",
    "fechaInicio": "2025-12-01",
    "fechaFin": "2026-03-31",
    "multiplicadorPrecio": 1.5,
    "activo": true
  }
}
```

### **Valoración** (`ws://localhost:3000/valoracion`)

#### **Eventos para Enviar:**
- `findAllValoracion`
- `createValoracion`
- `findValoracionesByLugar`

#### **Eventos que Recibes:**
- `valoracionesList`
- `valoracionCreada`

#### **Ejemplo de Mensaje para Crear:**
```json
{
  "event": "createValoracion",
  "data": {
    "nombreUsuario": "Juan Pérez",
    "emailUsuario": "juan.perez@email.com",
    "calificacion": 5,
    "comentario": "Experiencia increíble",
    "fechaVisita": "2025-07-10",
    "lugarTuristicoId": 1,
    "activo": true
  }
}
```

### **Búsqueda** (`ws://localhost:3000/busqueda`)

#### **Eventos para Enviar:**
- `findAllBusqueda`
- `buscarLugares`
- `createBusqueda`

#### **Eventos que Recibes:**
- `busquedasList`
- `busquedaRealizada`
- `busquedaCreada`

#### **Ejemplo de Mensaje para Buscar:**
```json
{
  "event": "buscarLugares",
  "data": {
    "terminoBusqueda": "Cusco",
    "categoria": "arqueológico",
    "latitudBusqueda": -13.531950,
    "longitudBusqueda": -71.967463,
    "radioKm": 50
  }
}
```

## 📋 Flujo de Pruebas WebSocket

### **1. Verificar Conexión**
```
URL: ws://localhost:3000/lugarturistico
Mensaje: findAllLugarTuristico
Respuesta esperada: lugaresList
```

### **2. Crear Lugar Turístico**
```
Mensaje: createLugarTuristico (con datos JSON)
Respuesta esperada: lugarCreado
```

### **3. Listar Lugares Actualizados**
```
Mensaje: findAllLugarTuristico
Respuesta esperada: lugaresList (con nuevo lugar)
```

### **4. Crear Valoración**
```
URL: ws://localhost:3000/valoracion
Mensaje: createValoracion (con lugarTuristicoId: 1)
Respuesta esperada: valoracionCreada
```

### **5. Buscar Lugares**
```
URL: ws://localhost:3000/busqueda
Mensaje: buscarLugares (con criterios)
Respuesta esperada: busquedaRealizada
```

## 🔍 Monitoreo de Mensajes

### **En Postman:**
- ✅ **Mensajes enviados**: Aparecen con flecha ⬆️
- ✅ **Mensajes recibidos**: Aparecen con flecha ⬇️
- ✅ **Estado de conexión**: Verde = Conectado, Rojo = Desconectado

### **Ejemplo de Respuesta:**
```json
{
  "event": "lugaresList",
  "data": [
    {
      "id": 1,
      "nombre": "Machu Picchu",
      "descripcion": "Ciudadela inca...",
      "ubicacion": "Cusco, Perú",
      "categoria": "arqueológico",
      "precioPromedio": 152.00,
      "activo": true,
      "createdAt": "2025-07-15T...",
      "updatedAt": "2025-07-15T..."
    }
  ]
}
```

## 🚨 Solución de Problemas

### **Error: Cannot save WebSocket with HTTP**
- **Solución**: Crear colección separada solo para WebSocket

### **Error: Connection failed**
- **Verificar**: Servidor corriendo en puerto 3000
- **Comando**: `npm run start:dev`

### **Error: No response**
- **Verificar**: Mensaje exacto sin espacios extra
- **Verificar**: Namespace correcto en URL

### **Error: Invalid JSON**
- **Verificar**: Formato JSON válido
- **Usar**: Validador JSON online

## 💡 Consejos Adicionales

1. **Mantén colecciones separadas**: HTTP vs WebSocket
2. **Usa nombres descriptivos**: "Lugar Turístico WebSocket Test"
3. **Guarda respuestas**: Para comparar resultados
4. **Prueba en orden**: Crear → Listar → Actualizar → Eliminar
5. **Monitorea logs**: Del servidor para debugging

## 🎯 Resultado Final

Al final tendrás:
- ✅ Colección HTTP funcional y guardada
- ✅ Colección WebSocket funcional y guardada
- ✅ Pruebas completas de tiempo real
- ✅ Documentación clara de eventos
- ✅ Flujo de trabajo organizado

¡Listo para probar WebSocket en Postman sin problemas! 🚀
