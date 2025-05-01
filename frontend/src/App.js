import React, { useState, useEffect } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { fetchUsers } from './api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

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
      <AddUser
       setUsers={setUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <UserList
        users={users}
        setUsers={setUsers}
        setEditingUser={setEditingUser}
      />
    </div>
  );
};

export default App;
