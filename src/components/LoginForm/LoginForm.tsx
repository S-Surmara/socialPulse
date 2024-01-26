// components/LoginForm/LoginForm.tsx
import React from 'react';
import './LoginForm.scss';
import '../../styles/login-page.scss';
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any).elements.email.value;
    const password = (e.target as any).elements.password.value;

    try {
      const response = await ApiService.login(email, password);

      if (response.success) {
        console.log('redirecting to dashboard...');
        // Redirect to the dashboard page on successful login
        history.push('/dashboard');
      } else {
        // Handle unsuccessful login (show error message, etc.)
        alert(response.message);
      }
    } catch (error) {
      // Handle error (e.g., show generic error message)
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
