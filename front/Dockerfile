FROM node:lts

WORKDIR /app

# Copiando o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todos os arquivos do diretório atual para o diretório /app no contêiner
COPY . .

# Construindo o aplicativo React para produção
RUN npm run build

# Definindo o comando de inicialização para executar o aplicativo React com a porta 4200
CMD ["npm", "start", "--", "--port", "4200:4200"]
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"] 