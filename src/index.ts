import express, { Request, Response, NextFunction, Application } from 'express';
import itemRoutes from './routes/itemRoutes';
import { itemModel } from './models/itemModel';
import cors from 'cors'

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*' // Allows all origins
  }));
app.use(express.json());
app.use('/api', itemRoutes);

// 404 Handler for unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested resource '${req.originalUrl}' was not found on this server`
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await itemModel.disconnect();
  process.exit(0);
});