import React, { useState, useEffect } from "react";
import "./ListOfTrackedItems.scss";
import { useHistory } from "react-router-dom";
import { ITask } from "../../types/types";
import EmptyList from "../../components/UI/EmptyList";

import ClockImg from '../../images/clock.svg';
import HourglassImg from '../../images/hourglass.svg';
import UserImg from '../../images/user.svg'

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
                tasks.length === 0 ? (
                    <EmptyList/>   
                ) : (<></>)
            }
            {
                tasks.map( (task, index) => {
                    return <div className="task-block" key={task.name} onClick={() => { history.push('/list/' + index) }}>
                        <div className="centered margin-task-row">
                            <div className="three-dots size-name-task"><b>{task.name}</b></div>
                        </div>
                        <div className="centered margin-task-row">
                            <div><b>Hour:</b> {task.hour}</div>
                            <div className="task-image-block">
                                <img src={ClockImg} alt="" />
                            </div>
                        </div>
                        <div className="centered margin-task-row">
                            <div><b>Minute</b>: {task.minute}</div>
                            <div className="task-image-block">
                                <img src={HourglassImg} alt="" />
                            </div>
                        </div>
                        <div className="centered margin-task-row">
                            <div><b>{task.user.name}</b></div>
                            <div className="task-image-block">
                                <img src={UserImg} alt="" />
                            </div>
                        </div>
                        <div className="centered margin-task-row">
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