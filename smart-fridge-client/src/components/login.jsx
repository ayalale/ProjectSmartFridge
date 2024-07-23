import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', formData);
      if (response && response.data) {
        localStorage.setItem('token', response.data.token); // שמירת הטוקן ב-LocalStorage
        console.log('User logged in:', response.data);
        navigate('/products');
      } else {
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error logging in user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column" alignItems="center" justifyContent="center">
        <FormControl variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
