"use client";

import { useEffect, useState } from 'react';
import { shoppingApi } from './api';
import { ShoppingItem } from './types';
import ShoppingItemComponent from './components/ShoppingItem';
import Spinner from './components/Spinner';

const Home = () => {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newItem, setNewItem] = useState<{ name: string; amount: number }>({ name: '', amount: 0 });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await shoppingApi.getAllItems();
                setItems(fetchedItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.name || newItem.amount <= 0) return;

        try {
            const addedItem = await shoppingApi.addItem(newItem);
            if (addedItem) {
                setItems([...items, addedItem]);
                setNewItem({ name: '', amount: 0 });
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (name: string) => {
        try {
            const success = await shoppingApi.deleteItem(name);
            if (success) {
                setItems(items.filter(item => item.name !== name));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdateItem = async (name: string, updatedItem: ShoppingItem) => {
        setItems(items.map(item => (item.name === name ? updatedItem : item)));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
            <form onSubmit={handleAddItem} className="mb-4">
                <input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border rounded p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
                    className="border rounded p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Add Item</button>
            </form>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    {items.map(item => (
                        <ShoppingItemComponent
                            key={item.name}
                            item={item}
                            onDelete={handleDeleteItem}
                            onUpdate={handleUpdateItem}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;