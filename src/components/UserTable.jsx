
import React, { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return;

    await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditClick = (id) => {
    navigate(`/table/editdata/${id}`);
  };

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          backgroundColor: "#074799",
          color: "white",
          borderColor: "#074799",
          fontWeight: "bolder",
          '&:hover': {
            backgroundColor: "white",
            color: "#074799",
            borderColor: "#074799",
          },
        }}
      >
        Back
      </Button>

      <h2 style={{ textAlign: 'center', margin: 0, paddingTop: '10px' }}>
        User Records
      </h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }} align="center">S.no</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Name</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Email</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Qualification</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">College</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Percentage</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <Button color="inherit" onClick={() => handleEditClick(user.id)}>{user.name}</Button>
                </TableCell>

                <TableCell align="center">
                  <Button color="inherit" onClick={() => handleEditClick(user.id)}>{user.email}</Button>
                </TableCell>

                <TableCell align="center" onClick={() => handleEditClick(user.id)}>
                <Button color="inherit" onClick={() => handleEditClick(user.id)}>{user.qualification}</Button>
                  </TableCell>

                <TableCell align="center" onClick={() => handleEditClick(user.id)}>
                <Button color="inherit" onClick={() => handleEditClick(user.id)}>{user.college}</Button>
                  
                  </TableCell>
                <TableCell align="center" onClick={() => handleEditClick(user.id)}>
                <Button color="inherit" onClick={() => handleEditClick(user.id)}> {user.percentage}</Button>
                  
                 </TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
