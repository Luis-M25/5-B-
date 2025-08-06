# Guía de Pruebas con Postman

## Configuración Inicial

### 1. Importar la Colección
1. Abre Postman
2. Haz clic en "Import" (Importar)
3. Selecciona el archivo `Realtime-CRUD-Tourism.postman_collection.json`
4. Importa también el archivo `Realtime-CRUD-Environment.postman_environment.json`

### 2. Configurar el Entorno
1. Selecciona el entorno "Realtime CRUD Environment"
2. Verifica que `base_url` esté configurada como `http://localhost:3000`

## Orden de Pruebas Recomendado

### 1. Verificación del Servidor
- **Health Check**: Verifica que el servidor esté corriendo

#### 🔍 **Cómo verificar el Health Check en Postman:**

1. **Abrir Postman** en tu escritorio
2. **Crear nueva request**:
   - Método: `GET`
   - URL: `http://localhost:3000/`
3. **Hacer clic en "Send"**
4. **Verificar la respuesta**:
   - Status: `200 OK`
   - Body: `"Hello World!"`

#### ✅ **Respuesta Esperada:**
```
Status: 200 OK
Body: "Hello World!"
```

#### 🚨 **Si obtienes error:**
- **Error de conexión**: Verifica que el servidor esté corriendo (`npm run start:dev`)
- **Error 404**: Verifica que la URL sea exactamente `http://localhost:3000/`
- **Error de puerto**: Confirma que el servidor esté en el puerto 3000

#### 📋 **Alternativas para verificar:**

**A) Desde terminal con cURL:**
```bash
curl http://localhost:3000/
```

**B) Desde el navegador:**
- Abre: `http://localhost:3000/`
- Deberías ver: "Hello World!"

**C) Con Thunder Client (VS Code):**
- Instala la extensión Thunder Client
- Crea GET request a `http://localhost:3000/`

### 2. Módulo Lugar Turístico
1. **Crear Lugar Turístico**: Crea un lugar de ejemplo
2. **Obtener Todos los Lugares**: Verifica que se creó correctamente
3. **Obtener Lugar por ID**: Prueba con ID = 1
4. **Buscar por Categoría**: Busca lugares arqueológicos
5. **Buscar por Ubicación**: Busca lugares cercanos a coordenadas específicas
6. **Obtener Promedio Calificación**: Verifica el promedio (inicialmente 0)
7. **Actualizar Lugar Turístico**: Modifica el lugar creado
8. **Eliminar Lugar Turístico**: Elimina el lugar (opcional)

### 3. Módulo Temporada
1. **Crear Temporada**: Crea una temporada de ejemplo
2. **Obtener Todas las Temporadas**: Verifica la creación
3. **Obtener Temporada Actual**: Verifica temporadas activas
4. **Obtener Temporadas Próximas**: Busca temporadas futuras
5. **Calcular Precio con Temporada**: Calcula precios según temporada
6. **Actualizar Temporada**: Modifica la temporada
7. **Eliminar Temporada**: Elimina la temporada (opcional)

### 4. Módulo Valoración
1. **Crear Valoración**: Crea una valoración para el lugar turístico
2. **Obtener Todas las Valoraciones**: Verifica la creación
3. **Obtener Valoraciones por Lugar**: Filtra por lugar específico
4. **Obtener Valoraciones por Calificación**: Filtra por calificación
5. **Obtener Valoraciones por Usuario**: Filtra por usuario
6. **Obtener Valoraciones Recientes**: Obtén las más recientes
7. **Obtener Estadísticas de Lugar**: Verifica estadísticas calculadas
8. **Actualizar Valoración**: Modifica la valoración
9. **Eliminar Valoración**: Elimina la valoración (opcional)

### 5. Módulo Búsqueda
1. **Buscar Lugares Turísticos**: Busca lugares con múltiples criterios
2. **Crear Registro de Búsqueda**: Crea un registro manual
3. **Obtener Todas las Búsquedas**: Verifica registros de búsqueda
4. **Buscar por Término**: Busca por término específico
5. **Buscar por Categoría**: Busca por categoría específica
6. **Obtener Búsquedas Recientes**: Obtén las más recientes
7. **Obtener Términos Más Populares**: Verifica popularidad
8. **Obtener Categorías Más Populares**: Verifica categorías populares
9. **Obtener Estadísticas de Búsqueda**: Verifica estadísticas generales

## Datos de Prueba

### Lugar Turístico de Ejemplo
```json
{
  "nombre": "Machu Picchu",
  "descripcion": "Ciudadela inca ubicada en los Andes peruanos, considerada una de las maravillas del mundo moderno",
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
```

### Temporada de Ejemplo
```json
{
  "nombre": "Temporada Alta Verano",
  "descripcion": "Temporada de mayor afluencia turística durante el verano",
  "fechaInicio": "2025-12-01",
  "fechaFin": "2026-03-31",
  "multiplicadorPrecio": 1.5,
  "activo": true
}
```

### Valoración de Ejemplo
```json
{
  "nombreUsuario": "Juan Pérez",
  "emailUsuario": "juan.perez@email.com",
  "calificacion": 5,
  "comentario": "Experiencia increíble, lugar mágico y bien conservado",
  "fechaVisita": "2025-07-10",
  "lugarTuristicoId": 1,
  "activo": true
}
```

### Búsqueda de Ejemplo
```json
{
  "terminoBusqueda": "Cusco",
  "categoria": "ciudad",
  "latitudBusqueda": -13.531950,
  "longitudBusqueda": -71.967463,
  "radioKm": 50,
  "usuarioIp": "192.168.1.100",
  "cantidadResultados": 5
}
```

## Características Especiales

### 1. Geolocalización
- Utiliza coordenadas reales de ubicaciones
- Búsqueda por radio en kilómetros
- Cálculo de distancias automático

### 2. Validaciones
- Calificaciones entre 1 y 5
- Fechas válidas para temporadas
- Campos obligatorios verificados

### 3. Estadísticas
- Promedios de calificación automáticos
- Conteo de valoraciones por lugar
- Términos de búsqueda más populares

### 4. Tiempo Real
- Todos los módulos emiten eventos WebSocket
- Actualizaciones automáticas en tiempo real
- Notificaciones de cambios

## Pruebas de WebSocket

### 🚀 **Opción A: Interfaz Web Completa (Recomendada)**

He creado una interfaz web completa para probar Socket.IO:

1. **Abrir el archivo** `socket-health-check.html` en tu navegador
2. **Automáticamente se conecta** a todos los namespaces
3. **Interfaz visual** con estados de conexión en tiempo real
4. **Botones de prueba** para cada funcionalidad
5. **Logs en tiempo real** de todos los eventos

**Para usar:**
```bash
# Desde el directorio del proyecto
firefox postman/socket-health-check.html
# o
google-chrome postman/socket-health-check.html
```

### 🔧 **Opción B: Herramientas Externas**

#### **1. Socket.IO Client Tool**
- Instalar: `npm install -g socket.io-client`
- Usar desde terminal:
```bash
# Conectar al namespace principal
node -e "
const io = require('socket.io-client');
const socket = io('http://localhost:3000/lugarturistico');
socket.on('connect', () => {
  console.log('✅ Conectado a /lugarturistico');
  socket.emit('findAllLugarTuristico');
});
socket.on('lugaresList', (data) => {
  console.log('📋 Lugares:', data);
});
"
```

#### **2. Postman (WebSocket support)**

⚠️ **Nota Importante**: Postman no permite guardar requests WebSocket en la misma colección que requests HTTP.

**📋 Solución Completa**: Ver guía detallada en [`WebSocket-Tests-Guide.md`](WebSocket-Tests-Guide.md)

**🚀 Resumen Rápido:**
1. **Crear colección separada**: "WebSocket Tourism Tests"
2. **Configurar WebSocket Request**: `ws://localhost:3000/lugarturistico`
3. **Enviar**: `findAllLugarTuristico`
4. **Recibir**: `lugaresList`

**� Namespaces Disponibles:**
- `ws://localhost:3000/lugarturistico`
- `ws://localhost:3000/temporada`
- `ws://localhost:3000/valoracion`
- `ws://localhost:3000/busqueda`

## Notas Importantes

1. **Orden de Creación**: Crea primero lugares turísticos antes de crear valoraciones
2. **IDs Incrementales**: Los IDs se generan automáticamente (1, 2, 3, etc.)
3. **Validaciones**: Respeta los formatos de datos especificados
4. **Base de Datos**: Los datos se almacenan en SQLite (archivo `database.sqlite`)
5. **Puerto**: El servidor debe estar corriendo en `http://localhost:3000`

## Solución de Problemas

1. **Error 500**: Verifica que el servidor esté corriendo
2. **Error 404**: Verifica las rutas en los requests
3. **Error 400**: Verifica el formato JSON de los datos
4. **CORS**: Si usas desde navegador, CORS está habilitado

¡Listo para probar! 🚀
