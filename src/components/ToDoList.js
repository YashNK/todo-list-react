import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleTaskInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleSaveTask = () => {
        if (inputValue.trim()) {
            setTasks(prevTasks => [
                ...prevTasks,
                { text: inputValue.trim(), completed: false }
            ]);
            setInputValue('');
        }
    };

    const handleDeleteTask = (index) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    };

    const handleToggleComplete = (index) => {
        setTasks(prevTasks =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div style={{ 
            background: "#282c34", 
            width: "100%", 
            height: "100vh" }}>
            <div className='w-100 text-center p-5 bg-dark'>
                <input
                    value={inputValue}
                    onChange={handleTaskInput}
                    style={{ outline: "none" }}
                    className='p-2 w-50 text-center rounded'
                    placeholder='Enter your task'
                />
                <button
                    style={{ margin: "0px 10px" }}
                    className='btn-dark p-2 btn'
                    onClick={handleSaveTask}
                >
                    Add Task
                </button>
            </div>
            <div style={{
                height: "calc(100% - 170px)",
                overflow: "auto" }} className='m-3 rounded'>
                {tasks.map((task, index) => (
                    <div 
                        style={{
                            background: "rgb(92, 121, 156)",
                            color: "white",
                            borderRadius: "5px",
                            margin: "20px auto",
                            padding: "40px 15px",
                            wordWrap: "break-word",
                        }} 
                        className='w-75' 
                        key={index}
                        onClick={() => handleToggleComplete(index)}
                    >
                        <h1 
                            className='d-inline-block' 
                            style={{
                                fontSize: "medium",
                                padding: "0px 10px",
                                width: "calc(100% - 100px)",
                                verticalAlign: "middle",
                                textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                        >
                            {task.text}
                        </h1>
                        <button 
                            onClick={() => handleDeleteTask(index)} 
                            className='btn btn-dark d-inline-block'
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToDoList;