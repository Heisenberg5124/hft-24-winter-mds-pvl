# hft-24-winter-mds-pvl

## Description

The application enables users to manage a shopping item list through a RESTful API built with ExpressJS and a Remix client application interacts with the API.

## Dockerize the Application

The project uses [Docker Compose](docker-compose.yaml) to orchestrate its services, including:

1. frontend_remix

    - A frontend application using Remix
    - Runs on port 3000
    - Connects to the backend via the SHOPPING_API_BASE_URL environment variable
    - Uses a custom Docker image vinhdhde140062/frontend-remix:lastest

2. backend_express

    - A backend service using Express.js
    - Runs on port 8080
    - Connects to PostgreSQL database
    - Uses a custom Docker image vinhdhde140062/backend-express:lastest
    - Contains environment variables for PostgreSQL connection

3. db_postgres

    - PostgreSQL database service
    - Uses the official PostgreSQL image
    - Runs on port 5432
    - Has persistent data storage using a named volume postgres-data

## Run the Application Using Docker Compose

```bash
# Start all services
docker compose up -d

# To stop all services
docker compose down
```

After running all services:

- Frontend will be available at: http://localhost:3000
- Backend will be available at: http://localhost:8080
- Database will be available at: localhost:5432

To access the OpenAPI documentation, visit http://localhost:8080/api-docs

## How this Application Follows the 12-Factor App Methodology

1. Codebase

    This app is tracked in Git, a version control system.

2. Dependencies

    - Dependencies are declared in the `package.json` file in the root of front_remix and backend_express
    - Node modules are isolated in node_modules
    - Using npm for dependency management

3. Config

    Configuration stored in environment variables

    ```yaml
    // ... existing code ...
        environment:
        - SHOPPING_API_BASE_URL=http://backend_express:8080/api/shoppingItems
    // ... existing code ...
        environment:
        - PORT=8080
        - POSTGRES_HOST=db_postgres
        - POSTGRES_USERNAME=vinhdh
        - POSTGRES_PASSWORD=password
        - POSTGRES_NAME=shoppingdb
        - POSTGRES_PORT=5432
    // ... existing code ...
    ```

4. Backing Services

    - PostgreSQL database is treated as an attached resource
    - Database connection details configured via environment variables
    - Services are loosely coupled through environment variables

5. Build, Release, Run

6. Processes

    - Frontend is stateless
    - Backend is stateless
    - State is stored in the PostgreSQL database

7. Port Binding

    Exports services via port binding

    ```yaml
    ports:
        - "3000:3000"  // Frontend
        - "8080:8080"  // Backend
        - "5432:5432"  // Database
    ```

8. Concurrency

    - Services can be scaled independently
    - Docker Compose allows scaling services

9. Disposability

    - Docker containers are disposable
    - Services can be started/stopped independently

10. Dev/Prod Parity

    - Using Docker ensures environment consistency
    - Same database system across environments
    - Environment variables handle configuration differences

11. Logs

12. Admin Processes