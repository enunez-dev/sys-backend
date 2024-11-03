import express from 'express';
import clientRoutes from './routes/clientRoutes';
import { saleSave } from './controllers/sale-controller';
import cors from 'cors';
import { logger } from './utils/logger';

// Crea la aplicación de Express
const app = express();
// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // If your frontend is sending cookies
};
// Configuración de middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use(logger());

// Rutas
app.use('/api', clientRoutes);
app.use('/api', saleSave);

// Exporta la aplicación sin arrancar el servidor
export default app;
