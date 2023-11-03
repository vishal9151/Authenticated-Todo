import {createContext,useContext} from "react";
const TodoContext=createContext();

export function useTodo(){
    return useContext(TodoContext);
}

export default TodoContext;