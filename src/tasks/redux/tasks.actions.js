import {
  fetchTasksList,
  updateTask,
  deleteTask,
  createTask,
} from "../gateway/tasksGateway";
import { tasksListSelector } from "./tasks.selector";

export const TASK_LIST_RECIVED = "TASK_LIST_RECIVED";

export const taskListRecived = (tasksList) => {
  const action = {
    type: TASK_LIST_RECIVED,
    payload: {
      tasksList,
    },
  };
  return action;
};

export const getTasksList = () => {
  const thunkAction = function (dispatch) {
    fetchTasksList().then((tasksList) => dispatch(taskListRecived(tasksList)));
  };
  return thunkAction;
};

export const updateTaskList = (id) => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const task = tasksList.find((task) => task.id === id);
    const updatedTask = {
      ...task,
      done: !task.done,
    };

    updateTask(id, updatedTask).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const deleteTaskList = (id) => {
  const thunkAction = function (dispatch) {
    deleteTask(id).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const createTaskList = (text) => {
  const thunkAction = function (dispatch) {
    const taskData = {
      text,
      done: false,
    };
    createTask(taskData).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};
