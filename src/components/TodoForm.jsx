import { IoIosAddCircle } from "react-icons/io";
import { RiResetRightFill } from "react-icons/ri";
import { useTodo } from "../contexts";
import { useEffect, useState } from "react";

function TodoForm() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [date, setDate] = useState("");

    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!title) return;
        if (!priority) return;

        addTodo({ title, priority, date, completed: false });
        reset();
    }

    const reset = () => {
        setTitle("");
        setPriority("");
        setDate("");
        window.location.reload();
    }

    const today = new Date().toISOString().split("T")[0]; 



    return (
        <form onSubmit={add} className='w-96 h-[100%] bg-gray-300 rounded-3xl flex items-center justify-center flex-col pb-5'>

            <div className='text-center mt-3 font-bold text-2xl'>Create Your To-Do's<br />Crush Your Goals </div>

            <input type="text" value={title} id='title' onChange={(e) => setTitle(e.target.value)} required placeholder='Type your To-Do here...' className='bg-white border-3 border-gray-500 rounded-2xl w-80 h-12 mt-10 px-3' />

            <div className='mt-8'>--------- Set priority for you Task --------</div>
            <div className='flex flex-row justify-center items-center gap-4 mt-3 '>
                <div className='flex flex-row gap-1 text-white font-bold bg-red-500  px-2 py-1 rounded-3xl'>
                    <input type="radio" name="priority" id="urgent" value="urgent" checked={priority === "urgent"} onChange={(e) => setPriority(e.target.value)} />
                    <label htmlFor="urgent">Urgent</label>
                </div>
                <div className='flex flex-row gap-1 text-white font-bold  bg-yellow-500 px-2 py-1 rounded-3xl'>
                    <input type="radio" name="priority" id="imp" value="imp" checked={priority === "imp"} onChange={(e) => setPriority(e.target.value)} />
                    <label htmlFor="imp">Important</label>
                </div>
                <div className='flex flex-row gap-1 text-white font-bold  bg-blue-500  px-2 py-1 rounded-3xl'>
                    <input type="radio" name="priority" id="casual" value="casual" checked={priority === "casual"} onChange={(e) => setPriority(e.target.value)} />
                    <label htmlFor="casual">Casual</label>
                </div>
            </div>

            <div className='mt-8'>--------- Set Date for you Task --------</div>
            <input type="date" name="date" id="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className='bg-white px-2 py-1 mt-2 rounded-2xl' />

            <div className='flex flex-row w-[100%] justify-around items-center mt-10'>
                <button onClick={reset} className='bg-red-500 text-white w-20 px-2 py-1 rounded-2xl flex flex-row gap-1 justify-center items-center'><RiResetRightFill />Reset</button>
                <button type="submit" className='bg-green-600 text-white w-20 px-2 py-1 rounded-2xl flex flex-row gap-1 justify-center items-center'><IoIosAddCircle size={20} />Add</button>
            </div>
        </form>
    )
}

export default TodoForm
