import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            title : 'Todo Msg',
            completed: false,
            priority : 'Urgent',
            date : '2022-01-01',
        }
    ],
    addTodo: (todo) =>{},
    deleteTodo: (id)=>{},
    updateTodo: (id, title, date)=>{},
    toggleComplete : (id)=>{},
})

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;