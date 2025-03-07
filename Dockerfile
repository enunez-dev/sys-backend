# Usa una imagen liviana de Node.js
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias e instálalas
COPY package*.json ./
RUN npm install --only=production

# Copia el código fuente
COPY . .

# Compila TypeScript
RUN npm run build

# Usa una imagen más pequeña para la ejecución
FROM node:20-alpine

WORKDIR /app

# Copia las dependencias instaladas y el código compilado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponer el puerto de la aplicación
EXPOSE 3050

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
