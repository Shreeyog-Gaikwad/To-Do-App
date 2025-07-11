import TaskBox from './components/TaskBox';
import './App.css';
import { TodoProvider } from "./contexts";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, title, date) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title, date } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos && localTodos.length > 0) {
      setTodos(localTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="w-full lg:w-screen lg:h-screen h-full bg-gray-200 px-4 py-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-bold">
          Your Day, Your Way
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center mt-2">
          Start with a To-Do
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-6 mt-8 justify-center">
          {/* Todo Form */}
          <div className="w-full xl:w-[30%] h-full max-h-[68vh] bg-gray-300 rounded-3xl p-4 flex justify-center">
            <TodoForm />
          </div>

          {/* Active Todos */}
          <div className="w-full xl:w-[30%] bg-gray-300 rounded-3xl p-4 max-h-[68vh] overflow-y-scroll custom-scrollbar">
            <div className="text-center font-bold text-xl mb-4">Your To-Do's</div>

            <div className="text-red-500 font-bold mt-2 text-center">-------- Urgent Tasks --------</div>
            {todos.filter(todo => todo.priority === "urgent" && !todo.completed).length === 0 ? (
              <div className="my-2 text-center">No Urgent tasks yet....</div>
            ) : (
              todos
                .filter(todo => todo.priority === "urgent" && !todo.completed)
                .map(todo => (
                  <TaskBox key={todo.id} todo={todo} />
                ))
            )}

            <div className="text-yellow-500 font-bold mt-4 text-center">------ Important Tasks ------</div>
            {todos.filter(todo => todo.priority === "imp" && !todo.completed).length === 0 ? (
              <div className="my-2 text-center">No Important tasks yet....</div>
            ) : (
              todos
                .filter(todo => todo.priority === "imp" && !todo.completed)
                .map(todo => (
                  <TaskBox key={todo.id} todo={todo} />
                ))
            )}

            <div className="text-blue-500 font-bold mt-4 text-center">-------- Casual Tasks --------</div>
            {todos.filter(todo => todo.priority === "casual" && !todo.completed).length === 0 ? (
              <div className="my-2 text-center">No Casual tasks yet....</div>
            ) : (
              todos
                .filter(todo => todo.priority === "casual" && !todo.completed)
                .map(todo => (
                  <TaskBox key={todo.id} todo={todo} />
                ))
            )}
          </div>

          {/* Completed Todos */} 
          <div className="w-full xl:w-[30%]  bg-gray-300 rounded-3xl p-4 sm:mb-10 lg:mb-10 max-h-[68vh] overflow-y-scroll custom-scrollbar">
            <div className="text-center font-bold text-xl mb-4 ">Completed To-Do's</div>
            {todos.filter(todo => todo.completed).length === 0 ? (
              <div className="my-2 text-center">No Completed tasks yet....</div>
            ) : (
              todos
                .filter(todo => todo.completed)
                .map(todo => (
                  <TaskBox key={todo.id} todo={todo} />
                ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
