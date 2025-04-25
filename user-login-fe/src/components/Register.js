import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Snackbar } from '@mui/material';
import { validateEmail, validatePassword } from '../utilities/validators';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green'); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!validateEmail(email)) {
      setEmailError(true);
      setSnackbarMessage('Invalid email format');
      setSnackbarColor('red'); 
      setSnackbarOpen(true);
      return;
    }
    setEmailError(false);

    if (!validatePassword(password)) {
      setPasswordError(true);
      setSnackbarMessage('Password must be at least 8 characters, contain a number, a special symbol, and both uppercase and lowercase letters');
      setSnackbarColor('red'); 
      setSnackbarOpen(true);
      return;
    }
    setPasswordError(false);

    try {
      const response = await axios.post('http://localhost:3000/users/register', { email, password });
      if (response.data.user) {
        setSnackbarMessage('Registration successful! Redirecting to login...');
        setSnackbarColor('green'); 
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      }
    } catch (error) {
      
      if (error.response) {
        if (error.response.status === 400) {
         
          setSnackbarMessage(error.response.data.error.message || 'Bad request. Please check your input.');
        } else {
          
          setSnackbarMessage(error.response.data.error.message || 'An unexpected error occurred.');
        }
        setSnackbarColor('red'); 
      } else {
        
        setSnackbarMessage('No response from the server.');
        setSnackbarColor('red'); 
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register
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
                helperText={passwordError ? 'Password must be at least 8 characters, contain a number, a special symbol, and both uppercase and lowercase letters' : ''}
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

      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        sx={{
          backgroundColor: snackbarColor, 
          color: 'white',
          borderRadius: '4px',
          padding: '8px 16px',
        }}
      />
    </Container>
  );
}

export default Register;
