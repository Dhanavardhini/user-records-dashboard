import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UserTableEdit = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, [userId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    const updatedUser = { ...user, percentage: Number(user.percentage) };

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        alert('User updated successfully');
        navigate('/table');
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update user');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto', backgroundColor: 'white', boxShadow: 3 }}>
      <h3>Edit User</h3>
      <TextField
        label="Name"
        name="name"
        fullWidth
        value={user.name}
        onChange={handleEditChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        value={user.email}
        onChange={handleEditChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Qualification"
        name="qualification"
        fullWidth
        value={user.qualification}
        onChange={handleEditChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="College"
        name="college"
        fullWidth
        value={user.college}
        onChange={handleEditChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Percentage"
        name="percentage"
        type="number"
        fullWidth
        value={user.percentage}
        onChange={handleEditChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Box>
  );
};

export default UserTableEdit;
