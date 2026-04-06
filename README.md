# 📚 Book Store API

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Security](#-security)
- [Contributing](#-contributing)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Book Store API** is a full-featured, scalable RESTful API for managing an online book store. Built with Node.js, Express.js, and MongoDB, it supports user authentication, CRUD operations on books, admin management, and image uploads with cloud storage integration.

> 💡 Manage books, users, admin tasks, and media uploads securely and efficiently using modern backend practices.

---

## ✨ Features

✅ **User Authentication & Authorization**
- Secure JWT-based login and registration
- Password hashing using bcrypt
- Role-based API access (user/admin)

✅ **Book Management**
- CRUD endpoints for books
- Assign cover images to books (cloud upload)

✅ **Admin Panel**
- View and manage users and store data

✅ **Image Uploads**
- Store images in Cloudinary via Multer and API endpoints

✅ **Developer Friendly**
- Modular architecture (controllers, routes, models)
- Comprehensive error handling
- Environment-based config

---

## 🛠️ Tech Stack

| Category        | Technology              |
|-----------------|------------------------|
| **Runtime**     | Node.js (v16+)         |
| **Framework**   | Express.js v5.2.1      |
| **Database**    | MongoDB + Mongoose v9.1.3 |
| **Authentication** | JWT (`jsonwebtoken` v9.0.3) |
| **Security**    | bcrypt v6.0.0, bcryptjs v3.0.3 |
| **Env Mgmt**    | dotenv v17.2.3         |
| **Uploads**     | multer v2.0.2          |
| **Cloud Media** | Cloudinary v2.9.0      |
| **Dev Tools**   | nodemon v3.1.11        |

---

## 📁 Project Structure

```
Book store api/
├── config/         # App and cloud config files
├── controllers/    # Request handling and business logic
├── database/       # MongoDB connection logic
├── helpers/        # Utility functions
├── middlewares/    # Express middlewares (auth, error, etc.)
├── models/         # Mongoose data models
├── routes/         # Express route definitions
├── server.js       # Application entry point
├── package.json    # Project metadata & dependencies
├── package-lock.json
└── .env            # (your local environment file)
```

---

## ⚙️ Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas/cloud)
- **npm** package manager

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Birabhadra/Mini-Projects.git
   cd "Book store api"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `Book store api/` directory as described below.

4. **Start the Server**
   ```bash
   # Development mode (with hot-reload)
   npm run dev

   # Production mode
   node server.js
   ```
   API will run at: `http://localhost:3000`

--- 

## 🔌 API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint        | Description        | Auth Required |
|--------|----------------|-------------------|---------------|
| POST   | /register      | Register new user | ❌            |
| POST   | /login         | User login        | ❌            |
| POST   | /logout        | User logout       | ✅            |

**Register Example:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```
**Login Example:**
```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

---

### 📚 Book Management (`/api/books`)
| Method | Endpoint           | Description           | Auth Required |
|--------|-------------------|----------------------|---------------|
| GET    | /                 | List all books       | ❌            |
| GET    | /:id              | Get book by ID       | ❌            |
| POST   | /                 | Create new book      | ✅ (Admin)    |
| PUT    | /:id              | Update a book        | ✅ (Admin)    |
| DELETE | /:id              | Delete a book        | ✅ (Admin)    |

**Book Example:**
```json
{
  "title": "Node.js in Action",
  "author": "Mike Cantelon",
  "price": 29.99,
  "description": "Comprehensive Node.js book",
  "coverImage": "https://...cloudinary.com/image.jpg"
}
```

---

### 🏠 Home (`/api/home`)
| Method | Endpoint   | Description          | Auth Required |
|--------|------------|---------------------|---------------|
| GET    | /          | Get homepage data   | ❌            |

---

### 🔑 Admin (`/api/admin`)
| Method | Endpoint           | Description               | Auth Required |
|--------|-------------------|--------------------------|---------------|
| GET    | /stats            | Store statistics         | ✅ (Admin)    |
| GET    | /users            | List all users           | ✅ (Admin)    |
| POST   | /manage           | Admin management         | ✅ (Admin)    |

---

### 🖼️ Image Upload (`/api/image`)
| Method | Endpoint     | Description                | Auth Required |
|--------|-------------|---------------------------|---------------|
| POST   | /upload     | Upload book cover image   | ✅ (Admin)    |
| DELETE | /:id        | Delete image by ID        | ✅ (Admin)    |

---

## 🔐 Environment Variables

Create a `.env` file in the `Book store api/` directory with these variables:

```env
# Server
PORT=3000

# Database
MONGODB_URI=your_mongodb_connection_string_here

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
> ⚠️ **Never commit your `.env` to version control!**

---

## 🚀 Usage

### Register a user
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username":"john","email":"john@example.com","password":"password"}'
```
### Get all books
```bash
curl http://localhost:3000/api/books
```
### Add a book (Admin)
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Node.js in Action", "author":"Mike", "price":49.99}'
```

---

## 🛡️ Security

- **Password Hashing**: User passwords hashed with bcrypt/bcryptjs
- **JWT Authentication**: Secure token-based login/auth
- **Environment Safety**: Sensitive credentials kept in `.env`
- **Input Validation**: (Recommend) Validate all input data
- **Role-based Control**: Admin-only endpoints for critical ops

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, commit your changes, and create a Pull Request.

**Development Style:**
- Use 2 spaces for indentation
- Use ES6+ JS syntax
- Document functions and routes
- Use descriptive commit messages

**Commit Format:**
```
feat: add book search endpoint
fix: patch book deletion bug
docs: update API documentation
```

---

## 👨‍💻 Author

**Birabhadra** - [GitHub Profile](https://github.com/Birabhadra)

---

## 🙏 Acknowledgments

- Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary

---

<div align="center">

⭐ **If you find this project helpful, please consider giving it a star!** ⭐

**Last Updated**: March 24, 2026 | **Version**: 1.0.0

</div>
