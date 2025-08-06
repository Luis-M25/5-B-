#!/bin/bash

# Script para ejecutar todos los backends del sistema de gasolinera

echo "🚀 Iniciando Backend del Sistema de Gasolinera"
echo "=============================================="

# Verificar que estamos en el directorio correcto
if [ ! -d "rest-api" ] || [ ! -d "graphql-api" ] || [ ! -d "websocket-api" ]; then
    echo "❌ Error: Este script debe ejecutarse desde el directorio raíz del proyecto"
    echo "   Asegúrate de que existen las carpetas: rest-api, graphql-api, websocket-api"
    exit 1
fi

# Función para verificar si un puerto está en uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Puerto $1 está en uso. Terminando proceso..."
        kill -9 $(lsof -ti:$1) 2>/dev/null || true
        sleep 2
    fi
}

echo "📦 Instalando dependencias..."

# Instalar dependencias para REST API
echo "   - REST API (Puerto 3001)..."
cd rest-api
npm install --silent
cd ..

# Instalar dependencias para GraphQL API
echo "   - GraphQL API (Puerto 3002)..."
cd graphql-api
npm install --silent
cd ..

# Instalar dependencias para WebSocket API
echo "   - WebSocket API (Puerto 3003)..."
cd websocket-api
npm install --silent
cd ..

echo "✅ Dependencias instaladas"

# Verificar y liberar puertos
echo "🔍 Verificando puertos..."
check_port 3001
check_port 3002
check_port 3003

echo "🚀 Iniciando servidores..."

# Crear logs directory si no existe
mkdir -p logs

# Función para iniciar un servicio
start_service() {
    local name=$1
    local dir=$2
    local port=$3
    local log_file="logs/${name}.log"
    
    echo "   - Iniciando ${name} en puerto ${port}..."
    cd $dir
    npm run start:dev > "../${log_file}" 2>&1 &
    local pid=$!
    echo $pid > "../logs/${name}.pid"
    cd ..
    
    # Esperar un momento para que el servicio inicie
    sleep 3
    
    # Verificar si el proceso sigue corriendo
    if kill -0 $pid 2>/dev/null; then
        echo "   ✅ ${name} iniciado correctamente (PID: $pid)"
    else
        echo "   ❌ Error al iniciar ${name}"
        echo "   📄 Revisar logs en: ${log_file}"
    fi
}

# Iniciar servicios
start_service "REST-API" "rest-api" "3001"
start_service "GraphQL-API" "graphql-api" "3002"
start_service "WebSocket-API" "websocket-api" "3003"

echo ""
echo "🎉 Backend del Sistema de Gasolinera iniciado!"
echo "=============================================="
echo ""
echo "📍 URLs de los servicios:"
echo "   🌐 REST API:      http://localhost:3001"
echo "   🌐 GraphQL API:   http://localhost:3002/graphql"
echo "   🌐 WebSocket API: http://localhost:3003"
echo ""
echo "📋 Endpoints principales:"
echo "   REST API:"
echo "     GET  /operadores/disponibles"
echo "     GET  /surtidores/disponibles"
echo "     POST /surtidores/asignar"
echo ""
echo "   GraphQL API (usar GraphQL Playground):"
echo "     query { tiposGasolinaDisponibles { id tipo nombre precioActual } }"
echo "     query { calcularCosto(input: {...}) { total disponible } }"
echo ""
echo "   WebSocket API (usar cliente Socket.IO):"
echo "     Namespace: /gasolinera"
echo "     Eventos: obtener_formas_pago, buscar_clientes, iniciar_venta"
echo ""
echo "📄 Logs disponibles en:"
echo "   📝 rest-api/logs/REST-API.log"
echo "   📝 graphql-api/logs/GraphQL-API.log"
echo "   📝 websocket-api/logs/WebSocket-API.log"
echo ""
echo "🛑 Para detener todos los servicios, ejecuta: ./stop-servers.sh"
echo "📖 Documentación completa: BACKEND_DOCUMENTATION.md"

# Función para verificar si los servicios están corriendo
verify_services() {
    echo ""
    echo "🔍 Verificando estado de los servicios..."
    
    services=("REST-API:3001" "GraphQL-API:3002" "WebSocket-API:3003")
    
    for service in "${services[@]}"; do
        name=$(echo $service | cut -d: -f1)
        port=$(echo $service | cut -d: -f2)
        
        if curl -s http://localhost:$port > /dev/null 2>&1; then
            echo "   ✅ $name - Puerto $port: Activo"
        else
            echo "   ❌ $name - Puerto $port: Inactivo"
        fi
    done
}

# Esperar 10 segundos y verificar servicios
echo "⏳ Esperando 10 segundos para verificar servicios..."
sleep 10
verify_services

echo ""
echo "🎯 El backend está listo para recibir peticiones!"
echo "   Puedes comenzar a desarrollar el frontend conectándote a estas APIs."
