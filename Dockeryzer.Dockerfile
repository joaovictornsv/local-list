# Etapa 1: Construção da imagem com as dependências
FROM node:18-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar o package.json e package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Rodar o build do Vite.js
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar o build do Vite.js para o diretório de arquivos estáticos do nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80 do nginx
EXPOSE 80

# Rodar o nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]
