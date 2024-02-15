import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todostring = localStorage.getItem('todos');
    if (todostring) {
      let todos = JSON.parse(todostring);
      settodos(todos);
    }
  }, []);

  const saveTodo = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  const handleAdd = () => {
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    settodos(updatedTodos);
    saveTodo(updatedTodos);
    settodo("");
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    saveTodo(newTodos);
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  }

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveTodo(newtodos);
  }

  return (
    <>
      <Navbar />
      <div className="bg-purple-100 p-4 mx-auto my-4 w-[80%] rounded-xl min-h-screen">
        <div className='font-bold text-center text-xl my-2'>iTask - Manage Your Todos at one Place</div>
        <div className='font-bold m-1'>Add Todo</div>
        <form className='flex gap-2'>
          <input onChange={handleChange} value={todo} className='w-[50vw] border-black rounded-xl bg-purple-50 px-2' type="text" name="" id="" />
          <button onClick={handleAdd} disabled={todo.length <= 1} className='font-bold bg-purple-600 text-white text-sm p-2 rounded-md hover:scale-125'>Save</button>
        </form>
        <div className='m-3'>
          <input type="checkbox" onClick={toggleFinished} checked={showFinished} id='showFinished' className='hover:cursor-pointer' />
          <label className='hover:cursor-pointer mx-2' htmlFor="showFinished">Show Finished</label>
        </div>
        <div className='bg-black h-[1px] opacity-20 w-[90%] m-auto'></div>
        <div className='font-bold text-3xl mt-4 mb-2'>My Todos</div>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold '>No Todos Yet</div>}
          {todos.map(item => {
            return ((showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex justify-between border p-2 rounded-xl my-1 w-[80%]">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="btn flex gap-2 ml-2 h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='font-bold bg-purple-600 text-white text-sm p-2 rounded-md hover:scale-125'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='font-bold bg-purple-600 text-white text-sm p-2 rounded-md hover:scale-125'><AiFillDelete /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App;
