import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Alert, Snackbar } from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false); 

    try {
      const response = await axios.post('http://localhost:3000/users/register', { email, password });
      if (response.data.user) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/'); 
        }, 2000); 
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
        setError(error.response.data.error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', marginBottom: '20px' }}>{error}</Alert>}

        {successMessage && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
            message={successMessage}
            sx={{
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '4px',
              padding: '8px 16px',
            }}
          />
        )}

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
                error={emailError}  
                helperText={emailError ? 'Invalid email format' : ''}  
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
                error={passwordError}  
                helperText={passwordError ? 'Password must be at least 6 characters' : ''}  
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" sx={{ marginTop: '16px' }}>
          Already have an account? <a href="/">Login</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
