#!/bin/bash

# Script de Deploy Local
# Questionário de Avaliação de Startups

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando deployment local...${NC}"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Instale em: https://nodejs.org${NC}"
    exit 1
fi

# Verificar se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm não encontrado. Instalando...${NC}"
    npm install -g pnpm
fi

echo -e "${BLUE}📦 Instalando dependências...${NC}"
cd ../..
pnpm install

echo -e "${BLUE}🔨 Gerando build de produção...${NC}"
pnpm run build

echo -e "${BLUE}🌐 Iniciando servidor local...${NC}"
echo -e "${GREEN}✅ Build concluído! Arquivos estão em: ./dist/${NC}"
echo -e "${GREEN}🌐 Para servir localmente, execute:${NC}"
echo -e "${YELLOW}   pnpm run preview${NC}"
echo -e "${GREEN}🌐 Ou use um servidor HTTP simples:${NC}"
echo -e "${YELLOW}   npx serve dist${NC}"
echo -e "${YELLOW}   python -m http.server 8000 --directory dist${NC}"

# Opção de iniciar automaticamente
read -p "Deseja iniciar o servidor local agora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}🚀 Iniciando servidor...${NC}"
    pnpm run preview
fi

