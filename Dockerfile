# Etapa 1: Construção do projeto
FROM node:18 AS build

# Diretório de trabalho no contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json (ou yarn.lock) para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o contêiner
COPY . .

# Executa o build do projeto Vite
RUN npm run build

# Etapa 2: Configuração do ambiente de produção
FROM node:18-slim

# Diretório de trabalho no contêiner
WORKDIR /app

# Instala o servidor estático para servir o conteúdo construído
RUN npm install -g serve

# Copia apenas os arquivos necessários para o ambiente de produção
COPY --from=build /app/dist /app/dist

# Expondo a porta para o servidor estático
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist", "-l", "3000"]
