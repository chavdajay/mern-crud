import React, { useState, useEffect } from 'react';
import { createUsers, updateUsers } from '../api';

const AddUser = ({ setUsers, editingUser, setEditingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const updatedUser = { name, email };
      const data = await updateUsers(editingUser._id, updatedUser);
      setUsers((prev) =>
        prev.map((user) => (user._id === editingUser._id ? data : user))
      );
      setEditingUser(null);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingUser) {
      handleUpdate(e);
      return;
    }

    try {
      const newUser = { name, email };
      const data = await createUsers(newUser);
      setUsers((prevUsers) => [...prevUsers, data]);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">{editingUser ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </form>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="/img-book.jpg"
            alt="Book"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
