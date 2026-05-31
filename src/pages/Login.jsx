import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      const user = {
        email,
        name: email.split('@')[0],
        provider: 'email',
      };

      login(user);
      navigate(from);
    }
  };

  const handleGoogleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedGoogleEmail = storedUser?.provider === 'google' ? storedUser.email : null;
    const googleEmail = storedGoogleEmail || (email.trim().endsWith('@gmail.com') ? email.trim() : 'googleuser@gmail.com');

    const user = {
      email: googleEmail,
      name: googleEmail.split('@')[0],
      provider: 'google',
    };

    login(user);

    const gmailUrl = storedGoogleEmail
      ? `https://mail.google.com/mail/u/?authuser=${encodeURIComponent(storedGoogleEmail)}`
      : 'https://mail.google.com';

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    navigate('/');
  };

  const handleFacebookLogin = () => {
    const user = {
      email: 'fbuser@gmail.com',
      name: 'Facebook User',
      provider: 'facebook',
    };

    login(user);
    navigate('/');
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 premium-shadow dark:bg-dark-card">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {from !== '/' ? 'Please log in to continue.' : 'Don\'t have an account?'}{' '}
            {from === '/' ? (
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">Sign up</Link>
            ) : (
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">Sign up</Link>
            )}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Log in
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <Button type="button" size="lg" className="w-full" onClick={handleGoogleLogin}>
            Continue with Google
          </Button>
          <Button type="button" size="lg" className="w-full" onClick={handleFacebookLogin}>
            Continue with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
