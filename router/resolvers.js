const Employee = require('../model/employee');

module.exports = {
    Query: {
        async employee(_, { id }) {
            return await Employee.findById(id);
        },
        async getEmployees(_, { id }) {
            return await Employee.findById(id);
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
            return await Employee.findByIdAndDelete({_id: ID});
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