import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'parent'  // ערך ברירת מחדל הוא "הורה"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/register', formData);
      if(response && response.data){
        console.log('User registered:', response?.data || response);
        console.log('Role:', formData.role);  // הדפסת הסוג - הורה/ילד
        navigate('/products');
      }
    } catch (error) {
      console.error('Error registering user:', error?.response?.data || error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" value={formData.username} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select id="role" name="role" value={formData.role} onChange={handleChange}>
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="child">Child</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" type="submit" fullWidth>Register</Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Register;
