import { useEffect, useState } from "react";
import TodoContext from "./TodoContext";
import CryptoJS from 'crypto-js';
import {nanoid} from "nanoid"

const TodoProvider=function({children}){
    useEffect(()=>{
        const token=JSON.parse(localStorage.getItem("Token"));
        const userData=JSON.parse(localStorage.getItem("userData"));
        if(token){
            const user=userData.find((user)=>user.username===token.username);
            console.log(user);
            if(user){
                const todos=user.todo;
                setUser(user);
                setTodo(todos);
            }
            setAuthenticated(true);
            
        }
    },[])
    const [user,setUser]=useState({});
    const [todo,setTodo]=useState([]);
    const [authenticated,setAuthenticated]=useState(false);
    const [message,setMessage]=useState(false)
    const handleSignup = ({username, password})=>{
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();
        const userData=JSON.parse(localStorage.getItem("userData"))||[];
        const use = userData.find((user) => user.username === username);
        if(use){
            setMessage(true);
            return;
        }
        const user={username,encryptedPassword,todo:[]};
        userData.push(user);
        localStorage.setItem("userData",JSON.stringify(userData));
    }
    const handleLogin=({username,password})=>{
        console.log(username);
        const userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData);
        if(userData.length>0){
            const user = userData.find((user) => user.username === username);
            console.log(user)
            if(user){
                const decryptedPassword=CryptoJS.AES.decrypt(user.encryptedPassword,'secret_key').toString(CryptoJS.enc.Utf8);
                if(decryptedPassword==password){
                    const token = CryptoJS.AES.encrypt(password, 'token_key').toString();
                    const Token={
                        token,
                        username
                    }
                    localStorage.setItem("Token",JSON.stringify(Token));
                    setAuthenticated(true);
                    setUser(user);
                    setTodo(user.todo);
                }
            }
        }
        return false;
    }
    const handleLogout=()=>{
        localStorage.removeItem("Token");
        setAuthenticated(false);
        setUser({});
    }
    const handleAddTodo=(text,duedate,priority)=>{
        console.log(text,duedate);
        const Todo={
            id: nanoid(),
            text,
            completed:false,
            duedate,
            priority
        }
        const userDatas=JSON.parse(localStorage.getItem("userData"));
        console.log(userDatas);
        console.log(user)
        userDatas.map((User)=>{
            console.log(User);
            if(user.username==User.username){
                User.todo.push(Todo);
                User.todo.sort((a, b) => {
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                });
            }
        });
        console.log(userDatas);
        localStorage.setItem("userData",JSON.stringify(userDatas));
        setTodo([Todo,...todo]);    
    }
    const handleDeleteTodo = (id) => {
        const userDatas = JSON.parse(localStorage.getItem("userData"));
        userDatas.map((User) => {
          if (user.username === User.username) {
            User.todo = User.todo.filter((todo) => todo.id !== id);
          }
        });
        localStorage.setItem("userData", JSON.stringify(userDatas));
      
        // Update the state with the updated to-do list, if needed
        const updatedTodo = userDatas.find((User) => user.username === User.username).todo;
        // Update the state or perform other actions as needed
        setTodo(updatedTodo);
      };
      
    const handleToggleTodo = (id) => {
        const userDatas = JSON.parse(localStorage.getItem("userData"));
        userDatas.map((User) => {
          if (user.username === User.username) {
            User.todo = User.todo.map((todo) => {
              if (todo.id === id) {
                todo.completed = !todo.completed;
              }
              return todo; // Return the updated todo
            });
          }
          return User; // Return the updated User
        });
        localStorage.setItem("userData", JSON.stringify(userDatas));
      
        // Update the state with the updated todo list
        const updatedTodos = todo.map((todoItem) => {
          if (todoItem.id === id) {
            return { ...todoItem, completed: !todoItem.completed };
          }
          return todoItem;
        });
        setTodo(updatedTodos);
      };
      
    return(
        <TodoContext.Provider value={{todo,authenticated,user,message,handleAddTodo,handleDeleteTodo,handleLogin,handleLogout,handleSignup,handleToggleTodo}}>
            {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider;