const Employee = require('../model/employee');

module.exports = {
    Query: {
        // Query for fetching employee by ID
        employee: async (_, { id }) => {
            try {
                const employee = await Employee.findById(id);

                if (!employee) {
                    throw new Error(`Employee with ID ${id} not found`);
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
        async deleteEmployee(_, { ID }) {
            return await Employee.findByIdAndDelete({ _id: ID });
        },
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