import mongoose, { Schema } from "mongoose"

const usersCollection = "users"

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    followers: {
        type: Number
    },
    following: {
        type: Number 
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    role: {
        type: String,
        default: "user"
    },
    lastLogin: {
        type: Date
    }
})

const User = mongoose.model("User", userSchema, usersCollection)

export default User