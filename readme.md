# Todo List SQLite API

A simple task management API built with Node.js and Express.js. Perform CRUD (Create, Read, Update, Delete) operations using SQLite database with user authentication.

## 🚀 Features

- SQLite database integration
- RESTful API endpoints
- User authentication system
- Task management with user association
- JSON data exchange

## 🛠️ Technologies

- Node.js
- Express.js
- SQLite3

## 💻 Installation

```bash
git clone https://github.com/onderakbulut/todo-list-sqlite.git
cd todo-list-sqlite
npm install
npm start
```

## 📝 Usage

You can test the API using tools like Postman.

### Endpoints:

#### Task Operations
* **GET** `/` : Check if API is running
* **POST** `/create` : Create a new task
  * Request body:
    ```json
    {
      "title": "Shopping",
      "completed": false,
      "user_id": 1
    }
    ```
* **GET** `/tasks/:userId` : Get all tasks for a specific user
* **PUT** `/update/:id` : Update a task
  * Request body:
    ```json
    {
      "title": "Shopping",
      "completed": true
    }
    ```
* **DELETE** `/delete/:id` : Delete a task

#### User Operations
* **POST** `/user/register` : Register new user
  * Request body:
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
* **POST** `/user/login` : User login
  * Request body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
* **GET** `/users` : Get all users
* **GET** `/user/:id` : Get a specific user
* **PUT** `/user/update/:id` : Update user
  * Request body:
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "newpassword123"
    }
    ```
* **DELETE** `/user/delete/:id` : Delete user

### Response Format
* Success Response:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Shopping",
      "completed": false,
      "user_id": 1
    }
  }
  ```
* Error Response:
  ```json
  {
    "status": "error",
    "message": "Task not found"
  }
  ```

### Example Request

```bash
curl --location 'http://localhost:3000/api/user/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}'
```