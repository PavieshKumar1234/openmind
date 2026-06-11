# OpenMind – Full Stack Social Blogging Platform

OpenMind is a modern full-stack social blogging platform where users can create blogs, upload images, comment on posts, connect with other users through friend requests, and explore blogs in a clean professional interface.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Create, edit, and delete blog posts
* Upload images directly from device
* Add comments on posts
* Explore all users
* Send friend requests
* Accept or reject friend requests
* View friends list
* All Blogs and Friends Blogs feed
* Edit profile details
* Upload profile image
* Dark mode and light mode
* Responsive modern UI
* MongoDB database integration
* RESTful backend APIs

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Framer Motion
* Lucide React
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv
* CORS

## 📁 Project Structure

```txt
openmindblog/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/openmindblog.git
cd openmindblog
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

## 🔐 Authentication

OpenMind uses JWT authentication. After login, the token is stored in local storage and used to access protected routes such as creating posts, editing posts, commenting, and managing friend requests.

## 📌 API Endpoints

### Auth Routes

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
```

### Blog Post Routes

```txt
GET    /api/posts
GET    /api/posts/friends/feed
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Comment Routes

```txt
POST   /api/posts/:postId/comments
DELETE /api/posts/:postId/comments/:commentId
```

### Friend Routes

```txt
GET    /api/friends/users
POST   /api/friends/request/:userId
GET    /api/friends/requests
PUT    /api/friends/accept/:userId
DELETE /api/friends/reject/:userId
GET    /api/friends/my-friends
```

## 🎯 Learning Outcomes

This project helped me understand and practice:

* Full-stack web development
* REST API development
* MongoDB database handling
* User authentication and authorization
* CRUD operations
* Image upload handling
* Social media-style features
* Frontend and backend integration
* Responsive UI design
* Project deployment preparation

## 📸 Screenshots

Add your project screenshots here.

```txt
Home Feed Screenshot
Create Post Screenshot
Profile Page Screenshot
Friend Requests Screenshot
```

## 🧑‍💻 Author

**Paviesh Kumar**

## 📄 License

This project is created for learning and portfolio purposes.
