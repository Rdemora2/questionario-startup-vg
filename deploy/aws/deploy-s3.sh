#!/bin/bash

# Script de Deploy para AWS S3 + CloudFront
# Questionário de Avaliação de Startups

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando deployment para AWS S3...${NC}"

# Verificar se AWS CLI está instalado
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI não encontrado. Instale com: pip install awscli${NC}"
    exit 1
fi

# Verificar se as variáveis de ambiente estão definidas
if [ -z "$AWS_BUCKET_NAME" ]; then
    echo -e "${YELLOW}⚠️  AWS_BUCKET_NAME não definido. Usando: questionario-startup-bucket${NC}"
    AWS_BUCKET_NAME="questionario-startup-bucket"
fi

if [ -z "$AWS_REGION" ]; then
    echo -e "${YELLOW}⚠️  AWS_REGION não definido. Usando: us-east-1${NC}"
    AWS_REGION="us-east-1"
fi

echo -e "${GREEN}📦 Gerando build de produção...${NC}"
cd ../..
npm run build

echo -e "${GREEN}☁️  Sincronizando com S3 bucket: $AWS_BUCKET_NAME${NC}"
aws s3 sync dist/ s3://$AWS_BUCKET_NAME --delete --region $AWS_REGION

echo -e "${GREEN}🔧 Configurando bucket para hosting estático...${NC}"
aws s3 website s3://$AWS_BUCKET_NAME --index-document index.html --error-document index.html --region $AWS_REGION

# Configurar política do bucket para acesso público
echo -e "${GREEN}🔓 Configurando política de acesso público...${NC}"
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$AWS_BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $AWS_BUCKET_NAME --policy file://bucket-policy.json --region $AWS_REGION
rm bucket-policy.json

# Invalidar CloudFront se CLOUDFRONT_DISTRIBUTION_ID estiver definido
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo -e "${GREEN}🔄 Invalidando cache do CloudFront...${NC}"
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
fi

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}🌐 URL do site: http://$AWS_BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com${NC}"

if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo -e "${GREEN}🚀 URL do CloudFront: https://[seu-dominio-cloudfront].cloudfront.net${NC}"
fi

