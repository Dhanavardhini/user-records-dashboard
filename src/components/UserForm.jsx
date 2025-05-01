
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function AddUser() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    qualification: '',
    college: '',
    percentage: ''
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
     
      const getResponse = await fetch('http://localhost:3001/users');
      const users = await getResponse.json();
  
      
      const isEmailExists = users.some(user => user.email === userData.email);
  
      if (isEmailExists) {
        alert('User with this email already exists!');
        return;
      }
  
     
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        qualification: userData.qualification,
        college: userData.college,
        percentage: Number(userData.percentage),
      };
  console.log(newUser);
  
     
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
  
      alert('User added successfully');
      setUserData({
        name: '',
        email: '',
        qualification: '',
        college: '',
        percentage: ''
      });

      console.log(setUserData);
      
  
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };
  
  return (
    <Box sx={{ width: '100%', maxWidth: 500, p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh',mt:5 }}>
      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h4" sx={{fontWeight:"bolder"}} align="center" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Qualification"
            name="qualification"
            value={userData.qualification}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="College"
            name="college"
            value={userData.college}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Percentage"
            name="percentage"
            value={userData.percentage}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 ,backgroundColor:"#074799",p:1,fontSize:"17px",fontWeight:"bold"}}
          >
            Add User
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

