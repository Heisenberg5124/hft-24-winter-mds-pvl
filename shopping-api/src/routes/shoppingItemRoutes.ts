import { Router } from "express";
import { ShoppingItemController } from "../controllers/shoppingItemController";

const router = Router();
const controller = new ShoppingItemController();

/**
 * @swagger
 * /api/shoppingItems:
 *   get:
 *     tags: [Shopping Items API]
 *     summary: Get all shopping items
 *     responses:
 *       200:
 *         description: List of shopping items
 *       500:
 *         description: Internal server error
 */
router.get("/", controller.getAllItems.bind(controller));

/**
 * @swagger
 * /api/shoppingItems/{name}:
 *   get:
 *     tags: [Shopping Items API]
 *     summary: Get a shopping item by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shopping item found
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.get("/:name", controller.getItemByName.bind(controller));

/**
 * @swagger
 * /api/shoppingItems:
 *   post:
 *     tags: [Shopping Items API]
 *     summary: Add a new shopping item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingItem'
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid request payload
 */
router.post("/", controller.addItem.bind(controller));

/**
 * @swagger
 * /api/shoppingItems/{name}:
 *   put:
 *     tags: [Shopping Items API]
 *     summary: Update a shopping item
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingItem'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *       400:
 *         description: Invalid request payload
 */
router.put("/:name", controller.updateItem.bind(controller));

/**
 * @swagger
 * /api/shoppingItems/{name}:
 *   delete:
 *     tags: [Shopping Items API]
 *     summary: Delete a shopping item
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:name", controller.deleteItem.bind(controller));

export default router;