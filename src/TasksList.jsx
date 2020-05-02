import React from 'react';
import { Component } from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import { createTask, updateTask, fetchTasksList, deleteTask } from './tasksGateway.js';

class TasksList extends Component {
    state = {
        tasks: []
        // { text: "Do something", done: false, id: 1 },
        // { text: "Do do do", done: true, id: 2 },
        // { text: "Do hahha", done: true, id: 3 },
        // { text: "Do mememe", done: false, id: 4 },
        // { text: "Do lalal", done: true, id: 5 },
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = () => {
        fetchTasksList()
            .then(tasksList => this.setState({ tasks: tasksList }))
    }

    onCreate = (text) => {

        const newTask = {
            text: text,
            done: false,
        };
        console.log(newTask);
        createTask(newTask)
            .then(()=>this.fetchTasks());
     
    }

    hadleTaskStatusChange = id => {
        const { done, text } = this.state.tasks.find(task => task.id === id);
        const updatedTask = {
            text,
            done: !done
        };
        updateTask(id, updatedTask)
            .then(()=> this.fetchTasks());
    }

    handleDeleteTask = id => {
        deleteTask(id)
        .then(()=> this.fetchTasks());
    }

    render() {

        const sorteList = this.state.tasks
            .slice()
            .sort((a, b) => a.done - b.done);
        return (
            <>
             <div className="todo-list">
                <CreateTaskInput onCreate={this.onCreate} />
               
                <ul className="list">
                    {sorteList.map(task => (
                        <Task
                            {...task}
                            key={task.id}
                            onChange={this.hadleTaskStatusChange}
                            onDelete={this.handleDeleteTask} />
                    ))}
                </ul>
                </div>
            </>
        )
    }
}
export default TasksList;