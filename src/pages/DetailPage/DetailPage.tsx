import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ITask } from "../../types/types";
import "./DetailPage.scss";

import ClockImg from '../../images/clock.svg';
import HourglassImg from '../../images/hourglass.svg';
import UserImg from '../../images/user.svg';
import EmailImg from '../../images/email.svg'
import GlobeImg from '../../images/globe.svg'

const DetailsPage: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [task, setTask] = useState<ITask>();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const history = useHistory();

    useEffect(() => {
        const saveTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTask(saveTasks[+id]);
        setTasks(saveTasks)
        console.log(saveTasks[+id])
    },[])

    const deleteTask = () => {
        let allTask = tasks
        allTask.splice(+id, 1);
        setTasks(allTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        history.push('/list');
    }

    return (
        <section className="details-container">
            <div className="details-form">
                <div className="centered details-item">
                    <div className="line-doter"><div/></div>
                    <b>Task</b>
                    <div className="line-doter"><div/></div>
                </div>
                <div className="details-item three-dots detaile-task-name">
                    <b>Name: </b>
                    {task?.name}
                </div>
                <div className="details-item">
                    <div>
                        <b>Hour: </b>
                        {task?.hour}
                    </div>
                    <div className="task-image-block">
                                <img src={ClockImg} alt="" />
                    </div>
                </div>
                <div className="details-item">
                    <div>
                        <b>Minute: </b>
                        {task?.minute}
                    </div>
                    <div className="task-image-block">
                                <img src={HourglassImg} alt="" />
                    </div>
                </div>
                <div className="centered details-item">
                    <div className="line-doter"><div/></div>
                    <b>User</b>
                    <div className="line-doter"><div/></div>
                </div>
                <div className="details-item">
                    <div>
                        <b>Name: </b>
                        {task?.user?.name}
                    </div>
                    <div className="task-image-block">
                        <img src={UserImg} alt="" />
                    </div>
                </div>
                <div className="details-item">
                    <div>
                        <b>Email: </b>
                        {task?.user?.email}
                    </div>
                    <div className="task-image-block">
                        <img src={EmailImg} alt="" />
                    </div>
                </div>
                <div className="details-item">
                    <div>
                        <b>Website: </b>
                        {task?.user?.website}
                    </div>
                    <div className="task-image-block">
                        <img className="image-globe" src={GlobeImg} alt="" />
                    </div>
                </div>
                <div className="details-item">
                    <div>
                        <b>Description: </b>
                    </div>
                </div>
                <div className="details-item">
                    <div className="description-block">{task?.description}</div>
                </div>
                <div className="centered ">
                    <button 
                        className="btn-deleted"
                        onClick={(event) => { 
                            event.stopPropagation()
                            deleteTask()
                        }}
                        >
                            Delete
                    </button>
                </div>
            </div>
        </section> 
    )
}

export default DetailsPage;