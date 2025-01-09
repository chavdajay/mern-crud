import React from 'react';
import { deleteUser } from '../api';

const UserList = ({ users, setUsers }) => {
  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Delete user via API
      setUsers(users.filter((user) => user._id !== id)); // Immediately update state
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4">User List</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => alert('Edit functionality is not implemented yet!')}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
