const Employee = require("../model/employee");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
                throw new Error("Authentication required.");
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
        async createUser(_, { username, email, password }) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("User already exists.");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            return user;
        },

        // Mutation for signing in a user
        signIn: async (_, { input }) => {
            const { email, password } = input;
            const user = await User.findOne({ email });
            if (!user) {
              return { success: false, message: "Invalid credentials" };
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              return { success: false, message: "Invalid credentials" };
            }
            return { success: true, message: "User authenticated successfully" };
          }
        
    },
};