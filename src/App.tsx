import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: false},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Redux", isDone: true}
    // ])
    let [filter, setFilter] = useState<FilterValuesType>("active")
    let todolistId1 = v1();
    let todolistId2 = v1();

    function addTask(title: string, todoListId:string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function removeTask(id: string, todoListId:string) {
         let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let newTodoLists = todoLists.map((tl) =>
            tl.id === todoListId ? {...tl, filter: value} : tl
        );
        setTodoLists(newTodoLists);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId:string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }
     function removeTodolist(todoListId:string){debugger;
         let newTodoLists = todoLists.filter((tl) =>
             tl.id !== todoListId
         );
         setTodoLists(newTodoLists);

     }
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistId1, title: "what to learn", filter: "active"},
        {id: todolistId2, title: "what to buy", filter: "completed"}
    ])
    let [tasksObj, setTasksObj] = useState({
            [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: true}],
            [todolistId2]: [{id: v1(), title: "Book", isDone: true},
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Pistol", isDone: false},
                {id: v1(), title: "Knife", isDone: true}]
        }
    )

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    return <Todolist
                        removeTodolist={removeTodolist}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }

        </div>
    )

}


    export default App;
