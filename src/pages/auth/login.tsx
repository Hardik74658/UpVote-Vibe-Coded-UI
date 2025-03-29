import React, { FormEvent } from 'react';
import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    alert('Logged in with: ' + email);
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-blue-300 to-purple-300 backdrop-blur-md">
      <Card className="w-full max-w-md rounded-3xl shadow-xl border border-blue-300/50 bg-gradient-to-br from-white to-gray-50 transition-transform duration-150 hover:scale-105">
        <CardBody className="gap-6 p-8">
          <div className="flex flex-col items-center gap-2 mb-6">
            <Icon icon="lucide:message-circle" className="text-5xl text-blue-600 animate-bounce" />
            <h1 className="text-3xl font-bold text-blue-800" style={{ fontFamily: '"Poppins", sans-serif' }}>
              Welcome Back
            </h1>
            <p className="text-base text-gray-600" style={{ fontFamily: '"Roboto", sans-serif' }}>
              Sign in to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              variant="bordered"
              radius="lg"
              className="transition-colors duration-150 focus:ring-2 focus:ring-blue-200"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              variant="bordered"
              radius="lg"
              className="transition-colors duration-150 focus:ring-2 focus:ring-blue-200"
            />
            <Button
              type="submit"
              color="primary"
              radius="lg"
              className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transition-all duration-150 hover:shadow-lg"
            >
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-purple-600 hover:underline cursor-pointer"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Sign up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
