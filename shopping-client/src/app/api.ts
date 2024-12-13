import axios from 'axios';
import type { ShoppingItem } from './types';
import { env } from 'next-runtime-env';

const api = axios.create({
    baseURL: env('NEXT_PUBLIC_API_URL') || 'http://localhost:3000/api', // Replace with your backend IP
    headers: {
        'Content-Type': 'application/json'
    }
});

export const shoppingApi = {
    async getAllItems(): Promise<ShoppingItem[]> {
        try {
            const response = await api.get('/shoppingItems');
            return response.data;
        } catch (error) {
            handleApiError(error);
            return [];
        }
    },

    async addItem(item: ShoppingItem): Promise<ShoppingItem | null> {
        try {
            const response = await api.post('/shoppingItems', item);
            return response.data;
        } catch (error) {
            handleApiError(error);
            return null;
        }
    },

    async deleteItem(name: string): Promise<boolean> {
        try {
            await api.delete(`/shoppingItems/${name}`);
            return true;
        } catch (error) {
            handleApiError(error);
            return false;
        }
    },

    async updateItem(name: string, updatedItem: ShoppingItem): Promise<ShoppingItem | null> {
        try {
            const response = await api.put(`/shoppingItems/${name}`, updatedItem);
            return response.data;
        } catch (error) {
            handleApiError(error);
            return null;
        }
    }
};

function handleApiError(error: unknown) {
    if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
            case 404:
                alert('Item not found');
                break;
            case 400:
                alert('Invalid request');
                break;
            case 500:
                alert('Server error');
                break;
            default:
                alert('An error occurred');
        }
    } else {
        alert('An unexpected error occurred');
    }
}