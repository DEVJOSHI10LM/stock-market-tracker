// src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setUser  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/auth/login', { email, password });
    setUser (response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Auth;