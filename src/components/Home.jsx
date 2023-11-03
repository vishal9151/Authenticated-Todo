import React from 'react';
import { useTodo } from '../Context/TodoContext';
import TodoForm from './Todo/TodoForm';
import TodoItem from './Todo/TodoItem';

function Home() {
  
  const token = JSON.parse(localStorage.getItem('Token'));
  const userData = JSON.parse(localStorage.getItem('userData'));
  const user = userData.find((user) => user.username === token.username);
  const todo = user.todo;
  console.log(todo);

  const { handleLogout } = useTodo();

  const handleLogoutClick = () => {
    handleLogout(); // Call the handleLogout function to log the user out
  };

  return (
    <div className="bg-[#172842] min-h-screen py-8">
         <button
          onClick={handleLogoutClick} // Call handleLogoutClick when the button is clicked
          className="bg-red-500 text-white p-2 rounded hover-bg-red-600 text-end"
        >
          Logout
        </button>
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
       
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/* Loop and Add TodoItem here */}
          {todo.map((tod) => (
            <div key={tod.id} className="w-full">
              <TodoItem todo={tod} />
              <div className="flex justify-between text-orange-700">
              <p>Due Date: {tod.duedate || 'Not set'}</p>
              <p>Priority: {tod.priority}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
