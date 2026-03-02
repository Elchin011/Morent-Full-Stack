import "./types/express-augment";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import { createServer } from 'node:http';


import authRoutes from "./routes/auth";
import locationRoutes from "./routes/location"
import categoryRoutes from "./routes/category"
import rentRoutes from "./routes/rent"
import reservationRoutes from "./routes/reservation"
import reviewRoutes from "./routes/review"
import "./auth/local-strategy";
import "./auth/google-strategy"
import "./auth/github-strategy"
import path from "path";
import { connectSocket } from "./socket";
import conversationRoutes from "./routes/conversation"
import uploadRoutes from "./routes/upload";




dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);


connectSocket(server)

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax",
            secure: false,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/public",
    express.static(path.join(__dirname, "../public"))
)

app.use("/auth", authRoutes);
app.use("/location", locationRoutes)
app.use("/category", categoryRoutes)
app.use("/rent", rentRoutes)
app.use("/reservation", reservationRoutes)
app.use("/review", reviewRoutes)
app.use("/conversation", conversationRoutes)
app.use("/upload", uploadRoutes);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URL!);
    try {
        const db = mongoose.connection.db;
        if (db) {
            await db.collection('users').dropIndex('googleID_1');
            await db.collection('users').dropIndex('githubID_1');
            console.log('Old indexes dropped');
        }
    } catch (e) {
        // index yoxdursa xəta verməsin
    }
}

connectToDb()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));