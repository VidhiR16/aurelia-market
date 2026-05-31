import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isSeller = query.get('ref') === 'seller';

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 premium-shadow dark:bg-dark-card">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">{isSeller ? 'Become a Seller' : 'Create an account'}</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {isSeller ? 'Start your seller journey on Aurelia Market.' : 'Already have an account?'}{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">Log in</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <Input type="text" placeholder="Full name" required />
            <Input type="email" placeholder="Email address" required />
            <Input type="password" placeholder="Password" required />
            <Input type="password" placeholder="Confirm password" required />
          </div>
          
          <Button type="submit" size="lg" className="w-full">Sign up</Button>
        </form>
      </div>
    </div>
  );
}
