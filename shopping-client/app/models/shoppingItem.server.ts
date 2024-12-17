import type { ShoppingItem } from '~/types/shoppingItem';

// Replace with your actual backend URL
const API_BASE_URL = process.env.SHOPPING_API_BASE_URL || 'http://localhost:8081/api/shoppingItems';

export async function getAllItems(): Promise<ShoppingItem[]> {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch shopping items');
  }
  
  return response.json();
}

export async function getItemByName(name: string): Promise<ShoppingItem> {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(name)}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Response('Item Not Found', { status: 404 });
    }
    throw new Error('Failed to fetch shopping item');
  }
  
  return response.json();
}

export async function addItem(item: ShoppingItem): Promise<ShoppingItem> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to add item');
  }
  
  return response.json();
}

export async function updateItem(name: string, updatedItem: ShoppingItem): Promise<ShoppingItem> {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(name)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
  
  return response.json();
}

export async function deleteItem(name: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
}