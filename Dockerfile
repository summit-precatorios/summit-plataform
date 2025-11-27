FROM node:20-slim

ENV NODE_ENV=development
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta da aplicação
EXPOSE 5005

# Comando padrão (pode ser sobrescrito no docker-compose)
CMD ["npm", "run", "dev"]


