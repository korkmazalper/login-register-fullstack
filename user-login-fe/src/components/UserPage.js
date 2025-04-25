import React, { useState, useEffect } from 'react';

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({ email: 'user@example.com' });
  }, []);

  return (
    <div>
      <h2>User Page</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;
