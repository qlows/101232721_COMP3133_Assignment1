const Employee = require('../model/employee');

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
    }
}