import React, { useReducer, useRef } from 'react';
import './Todo.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload, hidden: false }];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, hidden: !task.hidden } : task
      );
    default:
      return state;
  }
};

const TaskList = () => {
  const [tasks, dispatch] = useReducer(reducer, []);
  const inputRef = useRef(null);

  const addTask = (text) => {
    if (text.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: text });
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };
  
  const toggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
    //console.log(tasks);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputRef.current.focus();
  };

  return (
    <div className="task-list-container">
      <input ref={inputRef} className="task-input" />
      <button onClick={() => addTask(inputRef.current.value)} className="add-task">
        Add Task
      </button>
     
      <button onClick={() => scrollToTop()} className="scroll-to-top">
        Scroll to Top
      </button>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.hidden ? 'This Content is hiden' : task.text}
            <button onClick={() => toggleTask(task.id)} className='toggle-button'>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
