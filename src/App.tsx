import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("active")
 function addTask (title:string) {

        let newTask = {id: v1(), title: title, isDone: true}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
 }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id !== id
        )
        setTasks(filteredTasks)
    }
    function changeFilter (value:FilterValuesType){
        setFilter(value)
    }
    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
 function changeStatus(taskId:string, isDone:boolean){
        let task = tasks.find(t=>t.id === taskId)
     if (task){
         task.isDone = isDone
     }
     setTasks ([...tasks])
 }
    return (
        <div className="App">
            <Todolist title="what to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask ={addTask}
                      changeTaskStatus = {changeStatus}
                      filter = {filter}
            />
        </div>
    )


}


export default App;
