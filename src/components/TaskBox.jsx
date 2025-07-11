import { MdEditSquare, MdDelete } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useTodo } from "../contexts";
import { useState } from "react";


function TaskBox({ todo }) {

  if (!todo) return null;

  const [todoTitle, setTodoTitle] = useState(todo?.title || "");
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoDate, setTodoDate] = useState(todo?.date || "");


  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const update = () => {
    updateTodo(todo.id, todoTitle, todoDate);
    setIsTodoEditable(false);
  }

  const complete = () => {
    toggleComplete(todo.id)
  }

  const del = () => {
    deleteTodo(todo.id)
  }

  const today = new Date().toISOString().split("T")[0];


  return (
    <div className={`w-[98%] h-18 bg-white my-2 border-1 border-gray-900 border-b-4 border-l-8 pl-2 flex rounded-xl py-1`}>
      <div className="flex flex-col w-[75%] gap-1">
        <div className='text-base lg:text-xs xl:text-base'>
          Task :
          <input
            className={`w-[80%] ${isTodoEditable ? 'border-1' : 'focus:ring-0 focus:outline-none'} rounded-2xl px-3 text-base lg:text-xs xl:text-base`}
            type="text"
            readOnly={!isTodoEditable}
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
        </div>

        <div className={`font-bold text-xs lg:text-xs xl:text-xs text-gray-500`}>
          Scheduled On :
          <input
            className={`rounded-2xl px-2 text-sm sm:text-xs ${isTodoEditable ? 'border-1' : 'focus:ring-0 focus:outline-none'}`}
            readOnly={!isTodoEditable}
            type={`${isTodoEditable ? "date" : "text"}`}
            min={today}
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
            name="date"
            id="date"
          />
        </div>
      </div>

      <div className="flex flex-row w-[25%] justify-center items-center lg:gap-1 gap-2 pr-2">
        {todo.completed === false ? !isTodoEditable ? (
          <span className="text-[20px]">
            <MdEditSquare
              size={20}
              color="#b89302"
              onClick={() => setIsTodoEditable(true)}
            />
          </span>
        ) : (
          <span className="text-[20px]">
            <FaSave
              size={20}
              color="gray"
              onClick={update}
            />
          </span>
        ) : null}

        <span className="text-[20px]">
          <MdDelete size={20} color="red" onClick={del} />
        </span>

        {todo.completed === false ? (
          <span className="text-[20px]">
            <FaRegCheckCircle size={20} color="green" onClick={complete} />
          </span>
        ) : null}
      </div>

    </div>

  )
}

export default TaskBox
