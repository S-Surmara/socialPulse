// screens/Home/Home.tsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
// import '../styles/login-page.scss'; // Correct the import statement
import './Home.scss';
import SignupForm from '../components/SignupForm/SignupForm';

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="login-page">
      <div className="content">
        <h1>Welcome to Your SocialPulse App!</h1>
        <p>
          SocialPulse is a platform that connects people, fosters meaningful interactions, and
          allows you to stay in touch with your friends and family.
        </p>
        <p>
          Key Features:
        </p>
        <ul>
          <li>Real-time messaging</li>
          <li>News feed with personalized content</li>
          <li>Profile customization</li>
          <li>Events and notifications</li>
        </ul>
        <p>
          Get started by signing in to your account and exploring the exciting features we offer!
        </p>
      </div>
      <div className="form-container">
        {showLogin ? <LoginForm /> : <SignupForm />}
        <p onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Don't have an Account? Signup." : 'Already have an account? Login.'}
        </p>
      </div>
    </div>
  );
};

export default Home;
