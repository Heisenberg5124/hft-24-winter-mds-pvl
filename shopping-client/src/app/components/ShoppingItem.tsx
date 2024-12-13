import { useState } from 'react';
import { ShoppingItem as ShoppingItemType } from '../types';
import { shoppingApi } from '../api';

interface ShoppingItemProps {
    item: ShoppingItemType;
    onDelete: (name: string) => void;
    onUpdate: (name: string, updatedItem: ShoppingItemType) => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ item, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedAmount, setUpdatedAmount] = useState(item.amount);

    const handleUpdate = async () => {
        const updatedItem = { ...item, amount: updatedAmount };
        const result = await shoppingApi.updateItem(item.name, updatedItem);
        if (result) {
            onUpdate(item.name, result);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow rounded mb-2">
            <div>
                <h3 className="font-semibold">{item.name}</h3>
                {isEditing ? (
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={updatedAmount}
                            onChange={(e) => setUpdatedAmount(Number(e.target.value))}
                            className="border rounded p-1 mr-2"
                        />
                        <button onClick={handleUpdate} className="text-green-500 hover:text-green-700">Save</button>
                    </div>
                ) : (
                    <p>Amount: {item.amount}</p>
                )}
            </div>
            <div>
                <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700 mr-2">
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button onClick={() => onDelete(item.name)} className="text-red-500 hover:text-red-700">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ShoppingItem;