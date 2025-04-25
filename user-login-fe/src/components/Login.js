import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Snackbar } from '@mui/material';
import { validateEmail } from '../utilities/validators';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setSnackbarMessage('Invalid email format');
      setSnackbarColor('red');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccessMessage('Login successful! Redirecting...');
        setSnackbarMessage(successMessage);
        setSnackbarColor('green');
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate('/user');
        }, 2000);
      }
    } catch (error) {
      setSnackbarMessage('Invalid login credentials. Please try again.');
      setSnackbarColor('red');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" sx={{ marginTop: '16px' }}>
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarColor === 'green' ? '#4caf50' : '#f44336',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '10px 20px',
          },
        }}
      />
    </Container>
  );
}

export default Login;
