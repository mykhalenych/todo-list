import React from 'react'
import Task from './Task'
import CreateTaskInput from './CreateTaskInput'

const baseUrl = 'https://5e64c3daa49c210016106bc4.mockapi.io/tasks'

class TasksList extends React.Component{
  state = {
    tasks: []
  }
  componentDidMount(){
    this.fetchTaskList()
  }
  fetchTaskList = () => {
    fetch(baseUrl).then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(taskList => {
      console.log(taskList)
      this.setState({
        tasks: taskList
      })
    })
  }
  onCreate = (text) => {
    const newTask = {
      text: text,
      done: false,
    }
    fetch(baseUrl, {
      method: 'POST',
      headers:{
        'Content-type': 'application/json;utc-8'
      },
      body: JSON.stringify(newTask)
    }).then(response => {
      if(response.ok){
        this.fetchTaskList()
      }
      else{
        throw new Error('fail load data')
      }
    })
  }
  handleTaskStatus = (id) => {
    const updateTasks = this.state.tasks.map(task => {
      if(task.id === id){
        return{
          ...task,
          done: !task.done
        }
      }
      return task
    })
    this.setState({
      tasks: updateTasks
    })
  }
  handleTaskDelete = (id) => {
    fetch(`${baseUrl}/${id}`,{
      method: 'DELETE'
    }).then(response => {
      if(response.ok){
        this.fetchTaskList()
      }
      else{
        throw new Error('fail delete data')
      }
    })
    // console.log(id)
    // const updateTasks = this.state.tasks.filter(task => task.id !== id)
    // console.log(updateTasks)
    // this.setState({
    //   tasks: updateTasks
    // })
  }

  render(){
    const sortedList = this.state.tasks.slice().sort((a, b) => a.done - b.done)
    return(
      <div className="todo-list">
        <ul className="list">
          <CreateTaskInput onCreate={this.onCreate}/>
          {sortedList.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onChange={this.handleTaskStatus}
              onDelete={this.handleTaskDelete}
              />
          ))}
          
        </ul>
      </div>
    )
  }
  
}

export default TasksList