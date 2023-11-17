import React from 'react';
import { useTodo } from './Context/TodoContext';
import { Home, Login, SignUp } from './components';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const { authenticated,user} = useTodo();
  console.log(authenticated,user);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Home /> : <Navigate to="/login"/>}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={authenticated?<Home/>:<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
