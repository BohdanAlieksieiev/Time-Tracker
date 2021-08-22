import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ITask } from "../../types/types";
import "./DetailPage.scss";

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
                    <b>Task</b>
                </div>
                <div className="details-item three-dots detaile-task-name">
                    <b>Name: </b>
                    {task?.name}
                </div>
                <div className="details-item">
                    <b>Hour: </b>
                    {task?.hour}
                </div>
                <div className="details-item">
                    <b>Minute: </b>
                    {task?.minute}
                </div>
                <div className="centered details-item">
                    <b>User</b>
                </div>
                <div className="details-item">
                    <b>Name:</b>
                    {task?.user?.name}
                </div>
                <div className="details-item">
                    <b>Email:</b>
                    {task?.user?.email}
                </div>
                <div className="details-item">
                    <b>Website:</b>
                    {task?.user?.website}
                </div>
                <div className="details-item">
                    <b>Description:</b>
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