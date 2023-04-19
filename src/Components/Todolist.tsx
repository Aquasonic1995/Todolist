import {FilterValuesType} from "../App";
import React, {ChangeEvent, useState} from "react";

type newTaskTitleType = string
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id:string, isDone:boolean) =>void
    filter:FilterValuesType
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<newTaskTitleType>("")
    const [error, setError] = useState<string| null>(null)
    const onTaskAddHandler = () => {
        if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle("")
         }else{
      setError("Title is required")
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {onTaskAddHandler()}
    }

     const onAllPressHandler = () => {props.changeFilter("all")}
    const onActivePressHandler = () => {props.changeFilter("active")}
    const onCompletedPressHandler = () => {props.changeFilter("completed")}
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                className={error ? "error" : "" }/>
                <button onClick= {onTaskAddHandler}>+</button>
                {error && <div className= "error-message" >{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {
                       const onRemoveHandler = () =>{props.removeTask(t.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{props.changeTaskStatus(t.id, e.currentTarget.checked)}
                       return <li key={t.id} className={t.isDone ? "is-done" : ""} ><input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>})
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter": ""} onClick={onAllPressHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter": ""} onClick={onActivePressHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter": ""} onClick={onCompletedPressHandler}>Completed
                </button>
            </div>
        </div>
    )

}