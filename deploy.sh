#!/bin/bash

# ProTask Deploy Script
# Automatiza deploy a Firebase Studio + Inforge

echo "🚀 Iniciando deploy de ProTask..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if in right directory
if [ ! -f "frontend/index.html" ]; then
    echo -e "${RED}❌ Error: Ejecuta desde la carpeta todo-app${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Preparando frontend...${NC}"

# Create dist folder
mkdir -p dist
cp frontend/index.html dist/

echo -e "${GREEN}✅ Frontend listo${NC}"
echo ""

# Backend check
echo -e "${BLUE}🔧 Verificando backend...${NC}"
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Advertencia: backend/.env no existe${NC}"
    echo "   Copia backend/.env.example a backend/.env y configura tus variables"
fi

echo -e "${GREEN}✅ Backend verificado${NC}"
echo ""

echo -e "${YELLOW}📋 Próximos pasos:${NC}"
echo ""
echo "1. FRONTEND - Firebase Studio:"
echo "   • Sube dist/index.html a tu workspace"
echo "   • O usa: firebase deploy --only hosting"
echo ""
echo "2. BACKEND - Inforge:"
echo "   • cd backend && npm install"
echo "   • Configura .env con tu API_KEY"
echo "   • Deploy a Inforge"
echo ""
echo "3. CONECTAR:"
echo "   • Actualiza API_URL en frontend"
echo "   • Actualiza API_KEY en frontend"
echo ""
echo -e "${GREEN}🎉 ProTask listo para deploy!${NC}"
echo ""
echo "¿Necesitas ayuda? Contacta a Genee 🤖"
