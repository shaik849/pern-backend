import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ItemModel {
  async create(data: { name: string; description?: string; content?: string}) {
    return prisma.item.create({ data });
  }

  async findAll() {
    return prisma.item.findMany();
  }

  async findById(id: number) {  // 🔹 Change id to string
    return prisma.item.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; description?: string; content?: string; price?: number }) { 
    return prisma.item.update({ where: { id }, data });
  }

  async delete(id: number) {  // 🔹 Change id to string
    return prisma.item.delete({ where: { id } });
  }

  async disconnect() {
    await prisma.$disconnect();
  }
}

export const itemModel = new ItemModel();
