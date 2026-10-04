# ==============================================================================
# Estágio 1 (Builder): Node.js Alpine para instalação e build de produção
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dos manifestos de dependências
COPY package*.json ./

# Instalação limpa de dependências
RUN npm install

# Copia de todo o código-fonte da aplicação
COPY . .

# Execução do build de produção (gera a pasta /app/dist)
RUN npm run build

# ==============================================================================
# Estágio 2 (Runner): Nginx Alpine ultra-leve para entrega de alta performance
# ==============================================================================
FROM nginx:alpine

# Limpeza dos arquivos padrão de boas-vindas do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Cópia dos arquivos estáticos compilados a partir do estágio builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Cópia do arquivo customizado de configuração do Nginx (SPA + PWA + Cache)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposição da porta padrão HTTP
EXPOSE 80

# Inicialização do servidor Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
