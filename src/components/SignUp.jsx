import React, { useRef } from 'react';
import { useTodo } from '../Context/TodoContext';
import { Link } from 'react-router-dom';

function SignUp() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { handleSignup,message } = useTodo();


  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    handleSignup({ username, password });

    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
    <div className="w-1/2 mx-auto p-4 border rounded-lg bg-slate-50">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">Email:</label>
          <input
            type="email"
            id="username"
            ref={usernameRef}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            required
            minLength={8}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <span className="text-gray-600">
            Already have an account? <Link to="/login" className="underline">Login</Link>
          </span>
        </div>
      </form>
      {message&&<h1>User exist</h1>}
    </div>
  </div>
  );
}

export default SignUp;
