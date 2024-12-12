import { Request, Response } from "express";
import { ShoppingItemService } from "../services/shoppingItemService";

const service = new ShoppingItemService();

export class ShoppingItemController {
  async getAllItems(req: Request, res: Response) {
    try {
      const items = await service.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      console.error('Error getting all items:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getItemByName(req: Request, res: Response) {
    try {
      const item = await service.getItemByName(req.params.name);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Error getting item by name:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const { name, amount } = req.body;
      if (!name || typeof amount !== 'number') {
        return res.status(400).json({ error: "Invalid request payload" });
      }

      const item = await service.addItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(400).json({ error: "Invalid request payload" });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      if (typeof amount !== 'number') {
        return res.status(400).json({ error: "Invalid request payload" });
      }

      const item = await service.updateItem(req.params.name, req.body);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const deleted = await service.deleteItem(req.params.name);
      if (!deleted) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}