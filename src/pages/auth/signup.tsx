import React, { FormEvent, ChangeEvent } from 'react';
import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Signed up with: ' + email);
    navigate('/login');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-green-200 to-blue-200 backdrop-blur-sm">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border border-green-300/50 bg-gradient-to-br from-green-50 to-blue-50 transition-transform duration-150 hover:scale-105">
        <CardBody className="gap-6 p-8">
          <div className="flex flex-col items-center gap-2 mb-6">
            <Icon icon="lucide:message-circle" className="text-5xl text-green-600 animate-bounce" />
            <h1 className="text-3xl font-bold text-green-800" style={{ fontFamily: '"Poppins", sans-serif' }}>
              Create Account
            </h1>
            <p className="text-base text-gray-600" style={{ fontFamily: '"Roboto", sans-serif' }}>
              Join our community
            </p>
          </div>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <Input 
              type="text" 
              label="Username" 
              name="username"
              value={username} 
              onChange={handleInputChange} 
              variant="bordered" 
              radius="lg" 
              className="transition-colors duration-150 focus:ring-2 focus:ring-green-200"
            />
            <Input 
              type="email" 
              label="Email" 
              name="email"
              value={email} 
              onChange={handleInputChange} 
              variant="bordered" 
              radius="lg" 
              className="transition-colors duration-150 focus:ring-2 focus:ring-green-200"
            />
            <Input 
              type="password" 
              label="Password" 
              name="password"
              value={password} 
              onChange={handleInputChange} 
              variant="bordered" 
              radius="lg" 
              className="transition-colors duration-150 focus:ring-2 focus:ring-green-200"
            />
            <Button 
              type="submit" 
              color="primary" 
              radius="lg" 
              className="mt-2 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md transition-all duration-150 hover:shadow-lg"
            >
              Sign Up
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline cursor-pointer"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
