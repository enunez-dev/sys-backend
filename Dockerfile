# Etapa de construcción (builder)
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependencias necesarias para construir la app
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Compila TypeScript
RUN npm run build

# Elimina las dependencias de desarrollo para reducir el tamaño de la imagen
RUN npm prune --production

# Imagen final optimizada para ejecución
FROM node:20-alpine

WORKDIR /app

# Copia solo los archivos necesarios para la ejecución
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Exponer el puerto de la aplicación
EXPOSE 3050

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
