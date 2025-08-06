#!/bin/bash

# Script para detener todos los backends del sistema de gasolinera

echo "🛑 Deteniendo Backend del Sistema de Gasolinera"
echo "=============================================="

# Función para detener un servicio por PID
stop_service() {
    local name=$1
    local pid_file="logs/${name}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if kill -0 $pid 2>/dev/null; then
            echo "   🛑 Deteniendo ${name} (PID: $pid)..."
            kill -TERM $pid
            sleep 2
            
            # Si aún está corriendo, forzar terminación
            if kill -0 $pid 2>/dev/null; then
                echo "   💀 Forzando terminación de ${name}..."
                kill -KILL $pid
            fi
            
            echo "   ✅ ${name} detenido"
        else
            echo "   ⚠️  ${name} no estaba corriendo"
        fi
        rm -f "$pid_file"
    else
        echo "   ⚠️  Archivo PID de ${name} no encontrado"
    fi
}

# Función para detener procesos por puerto
stop_by_port() {
    local port=$1
    local name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "   🛑 Deteniendo proceso en puerto $port ($name)..."
        kill -9 $(lsof -ti:$port) 2>/dev/null || true
        echo "   ✅ Puerto $port liberado"
    else
        echo "   ✅ Puerto $port ya estaba libre"
    fi
}

# Detener servicios por PID primero
if [ -d "logs" ]; then
    echo "🔍 Deteniendo servicios por PID..."
    stop_service "REST-API"
    stop_service "GraphQL-API"
    stop_service "WebSocket-API"
else
    echo "⚠️  Directorio de logs no encontrado, usando método alternativo..."
fi

# Detener cualquier proceso restante en los puertos
echo ""
echo "🔍 Liberando puertos..."
stop_by_port 3001 "REST-API"
stop_by_port 3002 "GraphQL-API"
stop_by_port 3003 "WebSocket-API"

# Limpiar archivos temporales
echo ""
echo "🧹 Limpiando archivos temporales..."
if [ -d "logs" ]; then
    rm -f logs/*.pid
    echo "   ✅ Archivos PID eliminados"
fi

# Verificar que los puertos estén libres
echo ""
echo "🔍 Verificando que los puertos estén libres..."
ports=(3001 3002 3003)
names=("REST-API" "GraphQL-API" "WebSocket-API")

for i in "${!ports[@]}"; do
    port=${ports[$i]}
    name=${names[$i]}
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "   ❌ Puerto $port ($name) aún está en uso"
    else
        echo "   ✅ Puerto $port ($name) libre"
    fi
done

echo ""
echo "🎉 Backend del Sistema de Gasolinera detenido completamente!"
echo "=============================================="
echo ""
echo "📝 Nota: Los logs se mantienen en el directorio 'logs/' para revisión"
echo "🚀 Para reiniciar el backend, ejecuta: ./start-backend.sh"
