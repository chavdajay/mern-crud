import React, { useState, useEffect } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { fetchUsers } from './api';

const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch users once when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">User Management</h1>
      <AddUser setUsers={setUsers} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
};

export default App;
