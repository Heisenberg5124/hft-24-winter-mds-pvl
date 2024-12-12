import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import shoppingItemRoutes from "./routes/shoppingItemRoutes";
import { AppDataSource } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation endpoints
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// OpenAPI JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use("/api/shoppingItems", shoppingItemRoutes);

// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection failed:", error));