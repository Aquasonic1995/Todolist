import {FilterValuesType} from "../App";
import React, {ChangeEvent, useState} from "react";

type newTaskTitleType = string
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    id:string,
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId:string) => void
    changeFilter: (value: FilterValuesType, id:string) => void
    addTask: (title: string,todoListId:string) => void
    changeTaskStatus: (id:string, isDone:boolean, todoListId:string) =>void
    filter:FilterValuesType
    removeTodolist: (todoListId:string) => void
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<newTaskTitleType>("")
    const [error, setError] = useState<string| null>(null)
    const onTaskAddHandler = () => {
        if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim(), props.id);
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

     const onAllPressHandler = () => {props.changeFilter("all", props.id)}
    const onActivePressHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedPressHandler = () => {props.changeFilter("completed", props.id)}
    const removeTodolist = () => { props.removeTodolist(props.id)}
    return (
        <div>
            <h3>{props.title}</h3> <button onClick={removeTodolist}>x</button>
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
                       const onRemoveHandler = () =>{props.removeTask(t.id, props.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
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