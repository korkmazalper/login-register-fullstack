import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Alert, Snackbar } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar açık/kapalı durumu
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccessMessage('Login successful! Redirecting...');
        
        // Snackbar'ı açalım
        setOpenSnackbar(true);

        // 2 saniye sonra kullanıcıyı yönlendirelim
        setTimeout(() => {
          navigate('/user');
        }, 2000); // 2 saniye bekle
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', marginBottom: '20px' }}>{error}</Alert>}

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

      {/* Snackbar (Başarı mesajı için) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // 3 saniye sonra kapanacak
        onClose={() => setOpenSnackbar(false)}
        message={successMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Sol alt köşe
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4caf50', // Yeşil renk (başarı)
            color: 'white', // Yazı rengi
            fontWeight: 'bold', // Kalın yazı
            borderRadius: '8px', // Kenar yuvarlama
            padding: '10px 20px', // İçerik paddingi
          },
        }}
      />
    </Container>
  );
}

export default Login;
