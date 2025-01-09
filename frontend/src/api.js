import axios from 'axios';

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    return response.data;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};

// Create a new user
export const createUsers = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
    
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUsers = async (id, user) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
