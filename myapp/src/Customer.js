
import React, { Component } from 'react';

class Customer extends Component {
    state = {
        customers: [],
        name: '',
        age: '',
        department: '',
        editingIndex: -1
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, age, department, customers, editingIndex } = this.state;
        const newCustomer = { name, age, department };

        if (editingIndex === -1) {
            // Add new customer
            this.setState({
                customers: [...customers, newCustomer],
                name: '',
                age: '',
                department: ''
            });
        } else {
            // Update existing customer
            const updatedCustomers = [...customers];
            updatedCustomers[editingIndex] = newCustomer;
            this.setState({
                customers: updatedCustomers,
                name: '',
                age: '',
                department: '',
                editingIndex: -1
            });
        }
    };

    handleEdit = (index) => {
        const customer = this.state.customers[index];
        this.setState({
            name: customer.name,
            age: customer.age,
            department: customer.department,
            editingIndex: index
        });
    };

    handleDelete = (index) => {
        const { customers } = this.state;
        const updatedCustomers = customers.filter((_, i) => i !== index);
        this.setState({ customers: updatedCustomers });
    };

    render() {
        const { customers, name, age, department } = this.state;

        return (
            <div className="container">
                <h1>Customer Management</h1>

                {/* Form for Create / Update */}
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="Enter Name"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={this.handleChange}
                        placeholder="Enter Age"
                        required
                    />
                    <input
                        type="text"
                        name="department"
                        value={department}
                        onChange={this.handleChange}
                        placeholder="Enter Department"
                        required
                    />
                    <button type="submit">
                        {this.state.editingIndex === -1 ? 'Add Customer' : 'Update Customer'}
                    </button>
                </form>

                {/* Display the Customer List */}
                <h2>Customer List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.age}</td>
                                <td>{customer.department}</td>
                                <td>
                                    <button onClick={() => this.handleEdit(index)}>Edit</button>
                                    <button onClick={() => this.handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Customer;
