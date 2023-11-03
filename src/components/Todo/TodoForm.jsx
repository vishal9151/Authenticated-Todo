import React, {useRef} from "react";
import { useTodo } from "../../Context/TodoContext";
function TodoForm() {
  const todo = useRef();
  const date = useRef();
  const priority = useRef();
  const { handleAddTodo } = useTodo()

  const add = (e) => {
    e.preventDefault();

    if (!todo.current.value) return;

    handleAddTodo(
      todo.current.value,
      date.current.value,
      priority.current.value
    );
    todo.current.value = "";
    date.current.value = "";
    priority.current.value = "low"; // Reset priority to "low"
  };

  return (
    <form
      onSubmit={add}
      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 items-stretch"
    >
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full sm:w-1/2 border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-2"
        ref={todo}
      />
      <input
        type="date"
        className="w-full sm:w-1/4 border border-black/10 px-3 outline-none duration-150 bg-white/20 py-2"
        ref={date}
      />
      <select
        className="w-full sm:w-1/4 border text-black border-black/10 px-3 outline-none duration-150 bg-white/20 py-2"
        ref={priority}
        defaultValue="low" // Add a default value
      >
        <option value="low" >Low Priority</option>
        <option value="medium" >Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button
        type="submit"
        className="w-full sm:w-auto rounded-r-lg px-3 py-2 bg-green-600 text-white"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
