// components/SignupForm/SignupForm.tsx
import React, { useState } from 'react';
import './SignupForm.scss';
import '../../styles/login-page.scss';
import ApiService from '../../services/AuthService';
import { useHistory } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // Add username state
  const [name, setName] = useState(''); // Add name state

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await ApiService.signup(email, password, confirmPassword, username, name);
      if (response.response === 'success') {
        console.log('redirecting to dashboard...');
        // TODO: Change logic for signup: should redirect to login again not dashboard
        history.push('/dashboard');
      } else {
        // Handle unsuccessful signup (show error message, etc.)
        alert(response.message);
      }
    } catch (error) {
      // Handle error (e.g., show generic error message)
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
                <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
