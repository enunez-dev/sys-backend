import express from 'express';
import clientRoutes from './routes/client.routes';
import saleRoutes from './routes/sale.routes';
import productRoutes from './routes/product.routes';
import cors from 'cors';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger());

app.use('/v1/client', clientRoutes);
app.use('/v1/sale', saleRoutes);
app.use('/v1/product', productRoutes);

export default app;
