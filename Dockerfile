# Etapa 1: Construção
# Use uma imagem Node.js oficial como base
FROM node:18 AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto
COPY . .

# Execute o build do projeto
RUN npm run build

# Etapa 2: Servir
# Use uma imagem Nginx oficial para servir o conteúdo estático
FROM nginx:alpine

# Copie os arquivos de build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie o arquivo de configuração do Nginx, se necessário
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta em que o Nginx está rodando
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
