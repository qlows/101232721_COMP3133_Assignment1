const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Hash the password before saving the user
/* UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
}); */

module.exports = model("User", userSchema, "users");