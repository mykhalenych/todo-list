import { TASK_LIST_RECIVED } from "./tasks.actions";

const initialState = {
  tasksList: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_LIST_RECIVED:
      return {
        ...state,
        tasksList: action.payload.tasksList,
      };
    default:
      return state;
  }
};

export default tasksReducer;
