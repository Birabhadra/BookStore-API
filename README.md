# 🔗 LinkDock – URL Shortener APP

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18%2B-brightgreen.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

---

## 🎯 Overview

**LinkDock** is a modern, secure REST API for shortening and managing URLs.  
It provides authentication, custom link creation, analytics, and email-based password recovery — all designed with scalability and security in mind.

> 💡 Shorten, customize, manage, and analyze your links effortlessly.

---

## ✨ Features

### 🔐 Secure Authentication
- JWT-based login & registration
- Password hashing using bcrypt
- Admin access restricted via whitelisted emails

### 🔗 URL Shortening & Management
- Generate short links (custom or random backhalves)
- Update, delete, and manage links
- Ownership-based access control

### ✉️ Email Integration
- Welcome emails for new users
- Secure password reset flow via email

### 📈 Analytics
- Track visits per link and per user

### 🚀 Production Ready
- Rate limiting for critical endpoints
- Modular TypeScript architecture
- CORS support and centralized error handling

---

## 🛠️ Tech Stack

| Category        | Technology                  |
|----------------|----------------------------|
| Runtime        | Node.js (v18+)             |
| Framework      | Express.js v5              |
| Database       | MongoDB + Mongoose         |
| Authentication | JWT (jsonwebtoken)         |
| Hashing        | bcrypt                     |
| Email          | Nodemailer + Gmail OAuth2  |
| Validation     | express-validator          |
| Rate Limiting  | express-rate-limit         |
| Logging        | Morgan, Winston            |
| Env Mgmt       | dotenv                     |

---

## 📁 Project Structure

```bash
LinkDock/
├── controllers/        # Route logic
├── helpers/            # Utility functions
├── lib/                # DB, mail, JWT, CORS
├── middlewares/        # Auth & error handling
├── models/             # Mongoose schemas
├── routes/             # API routes
├── emailTemplates/     # Email templates
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Gmail account (for email features)

### Setup Steps

#### 1. Clone Repository
```bash
git clone https://github.com/Birabhadra/LinkDock.git
cd LinkDock
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment
Create a `.env` file:

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/linkdock
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_PASSRESET_SECRET=your_passreset_secret
EMAIL_USER=your_email@gmail.com
CLIENT_ID=your_gmail_client_id
CLIENT_SECRET=your_gmail_client_secret
REFRESH_TOKEN=your_gmail_oauth_refresh_token
CLIENT_ORIGIN=http://localhost:3000
CORS_WHITELIST=http://localhost:3000
WHITELISTED_EMAILS=admin@yourdomain.com
WINDOW_MS=60000
```

#### 4. Run the App
```bash
npm run dev
```

🌐 API will run on: **http://localhost:5000**

---

## 🔌 API Endpoints

### 🔐 Authentication (`/auth`)

| Method | Endpoint            | Description                 | Auth |
|--------|---------------------|-----------------------------|------|
| POST   | /register           | Register user               | ❌   |
| POST   | /login              | Login & get tokens          | ❌   |
| DELETE | /logout             | Logout user                 | ✅   |
| GET    | /refresh-token      | Refresh access token        | ❌   |
| POST   | /forgot-password    | Send reset email            | ❌   |
| POST   | /reset-password     | Reset password              | ❌   |

---

### 👤 User (`/user`)

| Method | Endpoint | Description              | Auth |
|--------|----------|--------------------------|------|
| GET    | /me      | Get profile              | ✅   |
| PUT    | /me      | Update profile           | ✅   |
| DELETE | /me      | Deactivate account       | ✅   |

---

### 🔗 Links (`/link`)

| Method | Endpoint         | Description        | Auth |
|--------|------------------|--------------------|------|
| POST   | /generate        | Create short link  | ✅   |
| GET    | /my-links        | List links         | ✅   |
| PUT    | /my-links/:id    | Update link        | ✅   |
| DELETE | /my-links/:id    | Delete link        | ✅   |

---

### 🌐 Public Redirect

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| GET    | /:backHalf | Redirect to original URL |

---

👉 Protected routes require:
```
Authorization: Bearer <access_token>
```

---

## 🌱 Usage Examples

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@email.com",
  "password": "StrongPass123"
}
```

### Create Short Link
```http
POST /link/generate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "My Blog",
  "destination": "https://myblog.com"
}
```

### Redirect
```http
GET /xyz12
```

➡️ Redirects to original URL and increments visit count

---

## 🔐 Environment Variables

| Variable             | Description                          |
|----------------------|--------------------------------------|
| PORT                 | Server port                          |
| MONGODB_URL          | MongoDB connection string            |
| JWT_ACCESS_SECRET    | Access token secret                  |
| JWT_REFRESH_SECRET   | Refresh token secret                 |
| JWT_PASSRESET_SECRET | Password reset token secret          |
| EMAIL_USER           | Gmail sender email                   |
| CLIENT_ID            | OAuth client ID                      |
| CLIENT_SECRET        | OAuth client secret                  |
| REFRESH_TOKEN        | OAuth refresh token                  |
| CLIENT_ORIGIN        | Allowed frontend origin              |
| CORS_WHITELIST       | Allowed CORS domains                 |
| WHITELISTED_EMAILS   | Admin email whitelist                |
| WINDOW_MS            | Rate limit window                    |

---

## 🛡️ Security

- 🔒 Passwords hashed using **bcrypt**
- 🍪 Secure **HttpOnly cookies** for refresh tokens
- 🌐 Strict **CORS policy**
- 🚦 Rate limiting on sensitive endpoints
- 🧹 Soft deletion for user accounts
- ✅ Strong input validation

---

## 🤝 Contributing

Contributions are welcome!

1. Create a feature branch  
2. Make your changes  
3. Submit a pull request  

---

## 👨‍💻 Author

**Birabhadra Sahoo**  
GitHub: https://github.com/Birabhadra

---

## 🙌 Acknowledgments

Built using:
- Express.js  
- MongoDB & Mongoose  
- JWT  
- bcrypt  
- Nodemailer  
- Winston & Morgan  

Inspired by modern backend API best practices.

---

<div align="center">

⭐ **If you find this project useful, consider giving it a star!** ⭐  

<sub>Last Updated: April 6, 2026</sub>

</div>
