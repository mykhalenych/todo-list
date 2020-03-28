import React from 'react'
import classNames from 'classnames'

const Task = ({task, onChange, onDelete}) => {

  const listItemClasses = classNames('list-item', {'list-item_done' : task.done})
  return(
    <li
      className={listItemClasses}>
      <input 
        type="checkbox" 
        className="list-item__checkbox"
        defaultChecked={task.done} 
        onChange={() => onChange(task.id)}
        
      />
        <span className="list-item__text">{task.text}</span>
      <button 
        onClick={() => onDelete(task.id)}
        className="list-item__delete-btn"></button>
    </li>
  )
}

export default Task