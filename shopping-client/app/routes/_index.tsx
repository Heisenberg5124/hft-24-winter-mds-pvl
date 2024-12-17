import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} from "~/models/shoppingItem.server";

export const loader = async () => {
  try {
    const items = await getAllItems();
    return json({ items, error: null });
  } catch (error) {
    return json(
      {
        items: [],
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "add": {
      const name = formData.get("name") as string;
      const amount = Number(formData.get("amount"));

      try {
        await addItem({ name, amount });
        return json({ message: "Item added successfully" });
      } catch (error) {
        return json(
          {
            error:
              error instanceof Error ? error.message : "Failed to add item",
          },
          { status: 400 }
        );
      }
    }

    case "update": {
      const originalName = formData.get("originalName") as string;
      const name = formData.get("name") as string;
      const amount = Number(formData.get("amount"));

      try {
        await updateItem(originalName, { name, amount });
        return json({ message: "Item updated successfully" });
      } catch (error) {
        return json(
          {
            error:
              error instanceof Error ? error.message : "Failed to update item",
          },
          { status: 400 }
        );
      }
    }

    case "delete": {
      const name = formData.get("name") as string;

      try {
        await deleteItem(name);
        return json({ message: "Item deleted successfully" });
      } catch (error) {
        return json(
          {
            error:
              error instanceof Error ? error.message : "Failed to delete item",
          },
          { status: 400 }
        );
      }
    }

    default:
      return json({ error: "Invalid intent" }, { status: 400 });
  }
};

export default function ShoppingListPage() {
  const { items, error } = useLoaderData<typeof loader>();
  const [edittingIndex, setEdittingIndex] = useState<number>(-1);

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Shopping List Manager
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Item Form */}
      <Form
        method="post"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <input type="hidden" name="intent" value="add" />
        <div className="flex space-x-4">
          <div className="flex-grow">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              required
              className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Item
            </button>
          </div>
        </div>
      </Form>

      {/* Items Table */}
      <div className="bg-white shadow-md rounded">
        {items && items.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item?.name} className="border-b">
                  {edittingIndex === index ? (
                    <tr key={item?.name} className="border-b">
                      <td colSpan={3}>
                        <Form
                          method="post"
                          onSubmit={() => setEdittingIndex(-1)}
                        >
                          <input type="hidden" name="intent" value="update" />
                          <input
                            type="hidden"
                            name="originalName"
                            value={item?.name}
                          />
                          <div className="flex">
                            <div className="flex-1 p-2">
                              <input
                                type="text"
                                name="name"
                                defaultValue={item?.name}
                                required
                                readOnly
                                className="w-full border rounded py-1 px-2"
                              />
                            </div>
                            <div className="w-32 p-2">
                              <input
                                type="number"
                                name="amount"
                                defaultValue={item?.amount}
                                required
                                className="w-full border rounded py-1 px-2"
                              />
                            </div>
                            <div className="p-2 text-right space-x-2">
                              <button
                                type="submit"
                                className="text-green-500 hover:text-green-700"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEdittingIndex(-1)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Form>
                      </td>
                    </tr>
                  ) : (
                    <>
                      <td className="py-3 px-4">{item?.name}</td>
                      <td className="py-3 px-4">{item?.amount}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEdittingIndex(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <Form method="post" className="inline">
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="name" value={item?.name} />
                          <button
                            type="submit"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </Form>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {items.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No items in the list
          </div>
        )}
      </div>
    </div>
  );
}
