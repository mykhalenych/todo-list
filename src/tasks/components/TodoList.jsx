import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Task from "./Task.jsx";
import CreateTaskInput from "./CreateTaskInput.jsx";
import { tasksListSelector } from "../redux/tasks.selector";
import * as actions from "../redux/tasks.actions";

const TodoList = ({
  getTasksList,
  tasks,
  updateTaskList,
  createTaskList,
  deleteTaskList,
}) => {
  useEffect(() => {
    getTasksList();
    console.log(tasks);
  }, []);

  const sorteList = tasks.slice().sort((a, b) => a.done - b.done);
  return (
    <>
      <h1 className="title">TodoList</h1>

      <div className="todo-list">
        <CreateTaskInput onCreate={createTaskList} />
        <ul className="list">
          {sorteList.map((task) => (
            <Task
              {...task}
              key={task.id}
              onChange={updateTaskList}
              onDelete={deleteTaskList}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

TodoList.propTypes = {
  getTasksList: PropTypes.func.isRequired,
  tasks: PropTypes.array,
  createTaskList: PropTypes.func,
  deleteTaskList: PropTypes.func,
  updateTaskList: PropTypes.func,
};

const mapDispatch = {
  getTasksList: actions.getTasksList,
  updateTaskList: actions.updateTaskList,
  deleteTaskList: actions.deleteTaskList,
  createTaskList: actions.createTaskList,
};

const mapState = (state) => {
  return {
    tasks: tasksListSelector(state),
  };
};
export default connect(mapState, mapDispatch)(TodoList);
