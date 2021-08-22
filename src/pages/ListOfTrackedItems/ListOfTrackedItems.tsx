import React, { useState, useEffect } from "react";
import "./ListOfTrackedItems.scss";
import { useHistory } from "react-router-dom";
import { ITask } from "../../types/types";

const ListOfTrackedItems: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const history = useHistory();

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks') || '[]'));  
    },[])

    const deleteTask = (idTask: number) => {
        const deleteTask = tasks.filter((item , id) => id !== idTask)
        setTasks(deleteTask)
        localStorage.setItem('tasks', JSON.stringify(deleteTask));
    }

    return (
        <section className="list-tasks-block">
            {
                tasks.map( (task, index) => {
                    return <div className="task-block" key={task.name} onClick={() => { history.push('/list/' + index) }}>
                        <div className="centered">
                            <p><b>{task.name}</b></p>
                        </div>
                        <div className="centered">
                            <p><b>Hour:</b> {task.hour}</p>
                        </div>
                        <div className="centered">
                            <p><b>Minute</b>: {task.minute}</p>
                        </div>
                        <div className="centered">
                            <p><b>{task.user.name}</b></p>
                        </div>
                        <div className="centered">
                            <button 
                                className="btn-deleted"
                                onClick={(event) => { 
                                    event.stopPropagation()
                                    deleteTask(index)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                })
            }
        </section> 
    )
}

export default ListOfTrackedItems;