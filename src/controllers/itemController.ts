import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ItemController {
  // Create a new item
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, content } = req.body;

      if (!name || !description || !content) {
        res.status(400).json({ success: false, error: "All fields (name, description, content) are required" });
        return;
      }

      if (typeof name !== "string" || typeof description !== "string" || typeof content !== "string") {
        res.status(400).json({ success: false, error: "All fields must be strings" });
        return;
      }

      if (name.trim().length < 3 || name.trim().length > 50) {
        res.status(400).json({ success: false, error: "Name must be between 3 and 50 characters" });
        return;
      }

      if (description.trim().length < 10 || description.trim().length > 200) {
        res.status(400).json({ success: false, error: "Description must be between 10 and 200 characters" });
        return;
      }

      if (content.trim().length < 20) {
        res.status(400).json({ success: false, error: "Content must be at least 20 characters" });
        return;
      }

      const item = await prisma.item.create({
        data: { name: name.trim(), description: description.trim(), content: content.trim() },
      });

      res.status(201).json({ success: true, data: item, message: "Item created successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create item" });
    }
  }

  // Get all items
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await prisma.item.findMany();
      res.json({ success: true, data: items, message: "Items retrieved successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch items" });
    }
  }

  // Get a single item by ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, error: "Invalid ID: must be a positive number" });
        return;
      }

      const item = await prisma.item.findUnique({ where: { id } });
      if (!item) {
        res.status(404).json({ success: false, error: "Item not found" });
        return;
      }
      res.json({ success: true, data: item, message: "Item retrieved successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch item" });
    }
  }

  // Update an item
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { name, description, content } = req.body;

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, error: "Invalid ID: must be a positive number" });
        return;
      }

      if (!name || !description || !content) {
        res.status(400).json({ success: false, error: "All fields (name, description, content) are required" });
        return;
      }

      if (typeof name !== "string" || typeof description !== "string" || typeof content !== "string") {
        res.status(400).json({ success: false, error: "All fields must be strings" });
        return;
      }

      if (name.trim().length < 3 || name.trim().length > 50) {
        res.status(400).json({ success: false, error: "Name must be between 3 and 50 characters" });
        return;
      }

      if (description.trim().length < 10 || description.trim().length > 200) {
        res.status(400).json({ success: false, error: "Description must be between 10 and 200 characters" });
        return;
      }

      if (content.trim().length < 20) {
        res.status(400).json({ success: false, error: "Content must be at least 20 characters" });
        return;
      }

      const item = await prisma.item.update({
        where: { id },
        data: { name, description, content },
      });

      res.json({ success: true, data: item, message: "Item updated successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ success: false, error: "Item not found" });
      } else {
        res.status(500).json({ success: false, error: "Failed to update item" });
      }
    }
  }

  // Delete an item
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, error: "Invalid ID: must be a positive number" });
        return;
      }

      await prisma.item.delete({ where: { id } });

      res.json({ success: true, message: "Item deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ success: false, error: "Item not found" });
      } else {
        res.status(500).json({ success: false, error: "Failed to delete item" });
      }
    }
  }
}

export const itemController = new ItemController();
