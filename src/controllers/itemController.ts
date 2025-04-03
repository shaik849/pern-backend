import { Request, Response } from 'express';
import { itemModel } from '../models/itemModel';

export class ItemController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, content } = req.body;

      if (!name || !description || !content) {
        res.status(400).json({ error: 'All fields (name, description, content) are required' });
        return;
      }

      if (typeof name !== 'string' || typeof description !== 'string' || typeof content !== 'string') {
        res.status(400).json({ error: 'All fields must be strings' });
        return;
      }

      if (name.length < 2 || name.length > 100) {
        res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
        return;
      }

      if (description.length < 5 || description.length > 500) {
        res.status(400).json({ error: 'Description must be between 5 and 500 characters' });
        return;
      }

      if (content.length < 10 || content.length > 1000) {
        res.status(400).json({ error: 'Content must be between 10 and 1000 characters' });
        return;
      }

      const item = await itemModel.create({ name, description, content });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create item' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await itemModel.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ error: 'Invalid ID: must be a positive number' });
        return;
      }

      const item = await itemModel.findById(id);
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { name, description, content } = req.body;

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ error: 'Invalid ID: must be a positive number' });
        return;
      }

      if (!name || !description || !content) {
        res.status(400).json({ error: 'All fields (name, description, content) are required' });
        return;
      }

      if (typeof name !== 'string' || typeof description !== 'string' || typeof content !== 'string') {
        res.status(400).json({ error: 'All fields must be strings' });
        return;
      }

      if (name.length < 2 || name.length > 100) {
        res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
        return;
      }

      if (description.length < 5 || description.length > 500) {
        res.status(400).json({ error: 'Description must be between 5 and 500 characters' });
        return;
      }

      if (content.length < 10 || content.length > 1000) {
        res.status(400).json({ error: 'Content must be between 10 and 1000 characters' });
        return;
      }

      const item = await itemModel.update(id, { name, description, content });
      res.json(item);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(500).json({ error: 'Failed to update item' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ error: 'Invalid ID: must be a positive number' });
        return;
      }

      const item = await itemModel.delete(id);
      res.json(item);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(500).json({ error: 'Failed to delete item' });
      }
    }
  }
}

export const itemController = new ItemController();