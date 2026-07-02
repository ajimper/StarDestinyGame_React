#!/bin/bash
# ============================================================
# STAR DESTINY GAME - Script de Publicación en GitHub
# ============================================================

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  STAR DESTINY GAME - Publicación${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar que git está instalado
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: git no está instalado${NC}"
    exit 1
fi

# Pedir nombre de usuario de GitHub
echo -e "${YELLOW}Ingresa tu nombre de usuario de GitHub:${NC}"
read GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}Error: Nombre de usuario requerido${NC}"
    exit 1
fi

# Pedir token de GitHub
echo ""
echo -e "${YELLOW}Ingresa tu Personal Access Token de GitHub:${NC}"
echo -e "${YELLOW}(Crea uno en: https://github.com/settings/tokens)${NC}"
read -s GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}Error: Token requerido${NC}"
    exit 1
fi

REPO_NAME="star-destiny-game"

echo ""
echo -e "${BLUE}Creando repositorio en GitHub...${NC}"

# Crear repositorio via API
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d "{\"name\":\"$REPO_NAME\",\"description\":\"Star Destiny Game - Juego educativo de evolución estelar\",\"private\":false}" \
    https://api.github.com/user/repos)

if [ "$RESPONSE" = "201" ]; then
    echo -e "${GREEN}✓ Repositorio creado exitosamente${NC}"
elif [ "$RESPONSE" = "422" ]; then
    echo -e "${YELLOW}⚠ El repositorio ya existe, continuando...${NC}"
else
    echo -e "${RED}✗ Error creando repositorio (HTTP $RESPONSE)${NC}"
    exit 1
fi

# Configurar remote
echo -e "${BLUE}Configurando remote...${NC}"
git remote remove origin 2>/dev/null
git remote add origin "https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"

# Push
echo -e "${BLUE}Subiendo código a GitHub...${NC}"
git push -u origin main --force
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ¡PUBLICACIÓN EXITOSA!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}Repositorio:${NC} https://github.com/$GITHUB_USER/$REPO_NAME"
    echo -e "${BLUE}URL:${NC} https://$GITHUB_USER.github.io/$REPO_NAME"
    echo ""
    echo -e "${YELLOW}Para activar GitHub Pages:${NC}"
    echo "1. Ve a: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
    echo "2. En 'Source' selecciona 'Deploy from a branch'"
    echo "3. Selecciona la rama 'main' y carpeta '/ (root)'"
    echo "4. Haz clic en 'Save'"
    echo ""
else
    echo -e "${RED}✗ Error subiendo código${NC}"
    exit 1
fi
