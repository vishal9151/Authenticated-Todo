import React from 'react';
import { useTodo } from './Context/TodoContext';
import {Home,Login,SignUp} from './components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { authenticated} = useTodo();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Home /> : <SignUp/>}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
