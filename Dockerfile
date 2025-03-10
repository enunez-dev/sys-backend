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

# Imagen final optimizada para ejecución
FROM node:20-alpine

WORKDIR /app

# Copia solo los archivos necesarios para la ejecución
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
