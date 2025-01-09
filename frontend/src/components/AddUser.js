import React, { useState } from 'react';
import { createUsers } from '../api';


const AddUser = ({ setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        {/* Form Section */}
        <div className="col-md-6">
          <h2 className="mb-4">Add User</h2>
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
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add User</button>
          </form>
        </div>

        {/* Image Section */}
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
