import React from 'react';
import classNames from 'classnames';

const Task = ({ id, done, text, onChange, onDelete }) => {
    const listItemClasses = classNames('list-item', { "list-item_done": done });
    const listTextClasses = done ? "list-item__text " : "";



    return (
        <li className={listItemClasses}>
            <input
                className="list-item__checkbox"
                type="checkbox"
                defaultChecked={done}
                onChange={() => onChange(id)} />
            <span className={listTextClasses}>{text}</span>
            <button className="list-item__delete-btn" onClick={() => onDelete(id)}></button>
        </li>
    )
}

export default Task;