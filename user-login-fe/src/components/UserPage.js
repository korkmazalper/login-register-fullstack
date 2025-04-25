import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

function UserPage() {
  const [user, setUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar açık/kapalı durumu
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log('User data:', parsedUser);
    } else {
      console.log('No user data found');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogoutMessage('Logout successful!');
    setOpenSnackbar(true); // Snackbar'ı açalım

    setTimeout(() => {
      navigate('/login');
    }, 2000); // 2 saniye sonra login sayfasına yönlendir
  };

  return (
    <div style={styles.pageWrapper}>
      {user && (
        <div style={styles.topBar}>
          <div style={styles.emailBubble}>{user.email}</div>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      )}

      <div style={styles.container}>
        <h2 style={styles.title}>Welcome to Your Dashboard</h2>

        {user ? (
          <div style={styles.card}>
            <p style={styles.label}>Email:</p>
            <p style={styles.email}>{user.email}</p>
          </div>
        ) : (
          <p style={styles.loading}>Loading user data...</p>
        )}
      </div>

      {/* Snackbar (Logout başarı mesajı için) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // 3 saniye sonra kapanacak
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Sol alt köşe
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            backgroundColor: '#4caf50', // Yeşil renk (başarı)
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px', // Kenar yuvarlama
          }}
        >
          {logoutMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

const styles = {
  pageWrapper: {
    position: 'relative',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#f0f2f5',
  },
  topBar: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  emailBubble: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background 0.3s',
  },
  container: {
    maxWidth: '400px',
    margin: '120px auto 0',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '22px',
    marginBottom: '20px',
  },
  card: {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  email: {
    color: '#555',
  },
  loading: {
    color: '#888',
    marginTop: '20px',
  },
};

export default UserPage;
