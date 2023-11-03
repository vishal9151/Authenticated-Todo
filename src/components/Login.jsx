import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { useTodo } from '../Context/TodoContext';


function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { handleLogin } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    handleLogin({ username, password });

    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
      <div className="w-1/2 mx-auto p-4 border rounded-lg bg-slate-50">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium">Username:</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">Password:</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
            <span className="text-gray-600">
              Dont have an account? <Link to="/signup" className="underline">Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
