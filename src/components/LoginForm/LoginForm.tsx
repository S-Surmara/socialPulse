// components/LoginForm/LoginForm.tsx
import React from 'react';
import './LoginForm.scss';
import '../../styles/login-page.scss';
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/AuthService';
import { useAuth } from '../../authContext';
import { useCookies } from 'react-cookie';

const LoginForm: React.FC = () => {
  const [cookies, setCookie] = useCookies();
  const history = useHistory();
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.target as any).elements.username.value;
    const password = (e.target as any).elements.password.value;

    try {
      const response = await ApiService.login(username, password);
      if (response.response === "success") {
        setCookie('userId' , response.userId);
        login();
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
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="username" />
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
