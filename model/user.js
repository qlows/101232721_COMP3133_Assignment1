const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Enter username"],
    },
    email: {
        type: String,
        required: [true, "Enter email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Enter password"],
    },
});

module.exports = model("User", userSchema, "users");