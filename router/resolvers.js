const Employee = require('../model/employee');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        // Query for fetching employee by ID
        employee: async (_, { ID }) => {
            try {
                const employee = await Employee.findById(ID);
                if (!employee) {
                    throw new Error(`Employee with ID ${ID} not found`);
                }
                return employee;
            } catch (error) {
                throw new Error(`Could not find employee: ${error.message}`);
            }
        },
        // Query for fetching all employees
        async getEmployees() {
            try {
                const employees = await Employee.find();
                return employees;
            } catch (err) {
                return {
                    message: "Error fetching employees",
                };
            }
        },
        async User(parent, args, context, info) {
            if (!context.user) {
                throw new Error('Authentication required.');
            }
            return context.user;
        }
    },

    Mutation: {
        // Mutation for creating a new employee
        async createEmployee(_, { input: { first_name, last_name, email, gender, salary } }) {
            const newEmployee = new Employee({
                first_name,
                last_name,
                email,
                gender,
                salary,
            });
            // Save to MongoDB
            const res = await newEmployee.save();
            return {
                id: res._id,
                ...res._doc,
            }
        },
        // Mutation for deleting an employee
        async deleteEmployee(_, { ID }) {
            return await Employee.findByIdAndDelete({ _id: ID });
        },
        // Mutation for updating an employee
        updateEmployee: async (_, { id, input }) => {
            try {
                const updatedEmployee = await Employee.findByIdAndUpdate(id, input, { new: true });
                return updatedEmployee;
            } catch (error) {
                throw new Error(`Could not update employee: ${error.message}`);
            }
        },

        // Mutation for signing up a new user
        signUp: async (parent, { input }, context) => {
            const { username, email, password } = input;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists.');
            }
            const user = new User({ username, email, password });
            await user.save();
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token };
        },
        signIn: async (parent, { input }, context) => {
            const { username, password } = input;
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('Invalid username or password.');
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid username or password.');
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token };
        }
    }
};