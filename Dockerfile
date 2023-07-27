# Usa la última versión de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación y el package.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expón el puerto que utiliza Nest.js (por defecto es 3000)
EXPOSE 3000

# Ejecuta el comando para iniciar la aplicación
CMD [ "npm", "run", "start:dev" ]
