import React from "react";

const CustomerList = ({ customers, onEdit, onDelete }) => {
  return (
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
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.age}</td>
            <td>{customer.department}</td>
            <td>
              <button onClick={() => onEdit(customer)}>Edit</button>
              <button onClick={() => onDelete(customer.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
