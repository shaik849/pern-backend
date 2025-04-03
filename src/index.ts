import express, { Request, Response, NextFunction, Application } from 'express';
import itemRoutes from './routes/itemRoutes';
import { itemModel } from './models/itemModel';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const app: Application = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(cors({
    origin: '*' // Allows all origins
  }));
app.use(express.json());
app.use('/api', itemRoutes);
app.get('/items', async (req, res) => {
    try {
      const items = await prisma.item.findMany();
      res.json(items);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });
  


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