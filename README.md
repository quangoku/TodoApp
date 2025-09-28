# To-Do App

A simple **full-stack To-Do application** with authentication using **JWT**, built with **Express.js**, **MongoDB**, and **React**.

---

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js, JWT, MongoDB, Mongoose  
- **Frontend:** React, Vite, Tailwind CSS (or your choice)  
- **Authentication:** JWT token-based authentication  
- **API Testing:** Postman or similar  
- **Containerization:** Docker & Docker Compose

---

## Features

- User registration & login with **JWT**
- Create, read, update, delete (CRUD) tasks
- Mark tasks as complete/incomplete
- Protect routes with authentication
- Dockerized for easy setup

---

##  Getting Started

### 1. Clone repository
git clone https://github.com/quangoku/TodoApp.git
cd TodoApp
### 2. setup env 
MONGO_URI = 

ACCESS_TOKEN_SECRET = 
### 3. Run with docker compose
docker compose up --build
### 4. Run locally without Docker

Backend: 

cd backend

npm i

npm run dev

Frontend : 

cd frontend

npm i 

npm run dev

## Security Notes

Never commit .env to repository

Use strong, random secrets for JWT
