import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Shopping Items API',
      version: '1.0.0',
      description: 'API for managing shopping items',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        ShoppingItem: {
          type: 'object',
          required: ['name', 'amount'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the shopping item'
            },
            amount: {
              type: 'integer',
              format: 'int32',
              description: 'The quantity of the item'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'] // Path to the API routes with JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);