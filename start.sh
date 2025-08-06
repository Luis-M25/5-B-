#!/bin/bash

echo "🚀 Iniciando Sistema de Gestión de Gasolinera"
echo "=============================================="

# Función para verificar si un puerto está en uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Puerto $1 ya está en uso"
        return 1
    else
        echo "✅ Puerto $1 disponible"
        return 0
    fi
}

# Verificar puertos
echo "Verificando puertos disponibles..."
check_port 3000
check_port 3001
check_port 3002

echo ""
echo "📋 Resumen del Sistema:"
echo "• REST API: http://localhost:3001"
echo "• GraphQL API: http://localhost:3002/graphql"
echo "• WebSocket API: http://localhost:3000"
echo "• Cliente WebSocket de prueba: websocket-api/client-test.html"

echo ""
echo "🔧 Para iniciar las aplicaciones:"
echo "1. REST API:     npm run start:rest"
echo "2. GraphQL API:  npm run start:graphql"
echo "3. WebSocket API: npm run start:websocket"
echo "4. Todo junto:   npm run start:all"

echo ""
echo "📚 Documentación completa en README.md"
echo "=============================================="
