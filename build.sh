#!/bin/bash
echo "🚀 Iniciando proceso de build para Render..."

# Limpiar cache si existe
echo "🧹 Limpiando cache..."
rm -rf node_modules package-lock.json

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps

# Verificar que react-scripts esté instalado
echo "🔍 Verificando instalación de react-scripts..."
if [ ! -f "node_modules/.bin/react-scripts" ]; then
    echo "❌ react-scripts no encontrado. Instalando específicamente..."
    npm install react-scripts@5.0.0 --save
fi

# Construir aplicación
echo "🏗️ Construyendo aplicación..."
npm run build

echo "✅ Build completado!"
