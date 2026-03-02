import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../mongoose/schemas/user";
import { hashPassword } from "../utils/bcrypt";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@morent.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123!";

async function seedAdmin() {
    const user = encodeURIComponent(process.env.DB_USERNAME || "");
    const pass = encodeURIComponent(process.env.DB_PASSWORD || "");
    const host = process.env.DB_HOST || "cluster0.szioxk4.mongodb.net";
    await mongoose.connect(
        `mongodb+srv://${user}:${pass}@${host}/?retryWrites=true&w=majority&appName=Cluster0`
    );

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
        existing.role = "admin";
        existing.password = hashPassword(ADMIN_PASSWORD);
        await existing.save();
        console.log("Admin updated:", ADMIN_EMAIL);
    } else {
        await User.create({
            name: "Admin",
            surname: "Morent",
            email: ADMIN_EMAIL,
            password: hashPassword(ADMIN_PASSWORD),
            role: "admin",
        });
        console.log("Admin created:", ADMIN_EMAIL);
    }

    console.log("Admin password:", ADMIN_PASSWORD);
    await mongoose.disconnect();
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
