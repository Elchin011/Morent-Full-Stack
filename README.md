# Morent - Car Rent Website

Full-stack Rent-a-Car application built with Node.js, Express, MongoDB, TypeScript, React, Vite, Redux, and TailwindCSS. Features user authentication, car management, booking system, real-time chat using Socket.IO, and OAuth login with Google and GitHub.

## Screenshots

> Add your desktop and mobile screenshots here



## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Elchin011/Morent-Full-Stack.git
cd Morent-Full-Stack
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```properties
PORT=3000
BASE_URL=http://localhost:3000
SESSION_SECRET=randomsecretstring123
MAIL_USER=
MAIL_PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
ADMIN_EMAIL=admin@morent.com
ADMIN_PASSWORD=Admin123!
MONGO_URL=mongodb+srv://morent_reviewer:Review123@cluster0.szioxk4.mongodb.net/?appName=Cluster0
```

Start the backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:3000`

### 3. Frontend setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```properties
VITE_APP_API_BASE_URL=http://localhost:3000
VITE_ADMIN_ID=
```

> `VITE_ADMIN_ID` — After logging in as admin, get the admin `_id` from MongoDB and add it here.

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Features

- User registration and login (Local, Google, GitHub)
- Car listing with search and filter
- Car detail page
- Booking / Payment form
- Favorites (per user, saved in localStorage)
- Real-time chat between user and admin (Socket.IO)
- Admin dashboard with chat management
- Responsive design (mobile + desktop)
