
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import appareilsRouter from './routes/appareils.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Appareils opérationnelle'
  });
});

app.use('/api/appareils', appareilsRouter);
app.use(errorHandler);

export default app;
