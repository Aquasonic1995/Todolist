import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Components/Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("active")


    function removeTask(id: number) {
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

    return (
        <div className="App">
            <Todolist title="what to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


        </div>
    )


}


export default App;
