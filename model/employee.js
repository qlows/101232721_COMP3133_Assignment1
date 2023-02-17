const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "Enter first name"],
    },
    last_name: {
        type: String,
        required: [true, "Enter last name"],
    },
    email: {
        type: String,
        required: [true, "Enter email address"],
    },
    gender: {
        type: String,
        required: [true, "Enter gender"],
    },
    salary: {
        type: Number,
        required: [true, "Enter salary"],
    },
});

module.exports = model("Employee", employeeSchema);