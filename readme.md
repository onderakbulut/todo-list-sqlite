# Todo List SQLite API

A simple task management API built with Node.js and Express.js. Perform CRUD (Create, Read, Update, Delete) operations using SQLite database.

## 🚀 Features

- SQLite database integration
- RESTful API endpoints
- Create, read, update and delete tasks
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
* **GET** `/tasks` : Get all tasks
* **POST** `/create` : Create a new task
  * Request body:
    ```
    {
      "title": "Shopping",
      "completed": false
    }
    ```
* **GET** `/get/:id` : Get a specific task by ID
* **PUT** `/update/:id` : Update a task
  * Request body:
    ```
    {
      "title": "Shopping",
      "completed": true
    }
    ```
* **DELETE** `/delete/:id` : Delete a task

### Response Format
* Success Response:
  ```
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Shopping",
      "completed": false
    }
  }
  ```
* Error Response:
  ```
  {
    "status": "error",
    "message": "Task not found"
  }
  ```

### Example Request

```
curl --location 'http://localhost:3000/api/create' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Shopping",
    "completed": false
}'
```