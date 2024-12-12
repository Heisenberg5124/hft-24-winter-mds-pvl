import { AppDataSource } from "../config/database";
import { ShoppingItem } from "../models/shoppingItem";

const repository = AppDataSource.getRepository(ShoppingItem);

export class ShoppingItemService {
  async getAllItems(): Promise<ShoppingItem[]> {
    return await repository.find();
  }

  async getItemByName(name: string): Promise<ShoppingItem | null> {
    return await repository.findOneBy({ name });
  }

  async addItem(item: ShoppingItem): Promise<ShoppingItem> {
    return await repository.save(item);
  }

  async updateItem(name: string, item: ShoppingItem): Promise<ShoppingItem | null> {
    const existingItem = await repository.findOneBy({ name });
    if (!existingItem) return null;
    
    Object.assign(existingItem, item);
    return await repository.save(existingItem);
  }

  async deleteItem(name: string): Promise<boolean> {
    const result = await repository.delete({ name });
    return result.affected ? result.affected > 0 : false;
  }
}