import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    googleID: {
        type: String,
        unique: true,
        sparse: true, 
    },
    githubID: {
        type: String,
        unique: true,
        sparse: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    avatar: {
        type: String
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordTokenExpires: {
        type: Date,
        default: null,
    },
});

userSchema.set("toJSON", {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.__v;
    }
})

export default mongoose.model("User", userSchema);