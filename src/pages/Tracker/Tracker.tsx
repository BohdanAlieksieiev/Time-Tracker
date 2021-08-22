import React from "react";
import { useState, useEffect } from "react";

import { IUser, ITask } from '../../types/types';
import { useHistory } from "react-router-dom";
import Loading from "../../components/UI/Loading";

import "./Tracker.scss";

const Tracker: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IUser[]>([]);
    const [tasks, setTasks] = useState<ITask[]>([]); 
    const [taskName, setTaskName] = useState<string>('');
    const [taskHour, setTaskHour] = useState<number>(1);
    const [taskMinute, setTaskMinute] = useState<number>(0);
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<IUser | null>();
    const history = useHistory();

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks') || '[]'));
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(result => {
            setLoading(false);
            setUsers(result);
            setSelectedUser(result[0]);
        })
        .catch(e => {
        });

    }, []);

    const selectUser = (user: any) => {
        setSelectedUser((users.find((u: IUser) => u.id === +user.target.value) || null));
    }

    const addTask = async () => {
        if(taskName && selectedUser && !tasks.find(( task ) => task.name === taskName)){
            const newTasks: ITask[] = [
                ...tasks,
                {
                    name: taskName,
                    hour: taskHour,
                    minute: taskMinute,
                    description: taskDescription,
                    user: selectedUser,
                }
            ];
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            history.push('/list');
        }
    }

    const checkMinute = () => {
        if(taskMinute >= 60){
            setTaskMinute(59);
        }
    }

    const checkHour = () => {
        if(taskHour >= 100) {
            setTaskHour(100);
        }else if(taskHour <= 0) {
            setTaskHour(1);
        }
    }

    return (
        <section className="tracker-block">
            { isLoading ? (
                <Loading/>
            ) : (
                <>
                    <div className="tracker-form">
                        <div className="tracker-item">
                            <b>Task name:</b>
                        </div>
                        <input 
                            className="tracker-form-input"
                            type="text" 
                            placeholder="Task name"
                            onChange={(e) => { setTaskName(e.target.value) }}
                        />
                        <div className="tracker-item">
                            <b>Hour:</b>
                        </div>
                        <input 
                            className="tracker-form-input"
                            type="number" 
                            min="1" 
                            value={taskHour}
                            onBlur={checkHour}
                            onChange={(e) => { setTaskHour(+e.target.value) }}
                        />
                        <div className="tracker-item">
                            <b>Minute:</b>
                        </div>
                        <input 
                            className="tracker-form-input"
                            type="number" 
                            placeholder="Minute"
                            min="0" 
                            max="59"
                            value={taskMinute}
                            onBlur={checkMinute}
                            onChange={(e) => { setTaskMinute(+e.target.value) }}
                        />
                        <div className="tracker-item">
                            <b>Description:</b>
                        </div>
                        <textarea
                            className="tracker-form-input"
                            onChange={(e) => { setTaskDescription(e.target.value) }}
                            rows={10}
                            placeholder="A note about the project the user worked on"
                        ></textarea>
                        <div className="tracker-item">
                            <b>User:</b>
                        </div>
                        <select
                            className="tracker-form-input"
                            onChange={e => selectUser(e)}
                        >
                            {users.map((user) => (<option value={user.id} key={user.id}>{user.name}</option>))}
                        </select>
                        <button className="tracker-form-input btn-add-task" onClick={addTask}>
                            Add task
                        </button>
                    </div>
                </>
            ) }

        </section> 
    )
}

export default Tracker;