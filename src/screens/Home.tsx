// screens/Home/Home.tsx
import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import '../styles/login-page.scss'; // Correct the import statement

const Home: React.FC = () => {
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
      <LoginForm />
    </div>
  );
};

export default Home;
