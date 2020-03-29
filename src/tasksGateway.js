// const baseUrl = 'https://5e64c3daa49c210016106bc4.mockapi.io/tasks'
export const baseUrl = 'https://crudcrud.com/api/83b074db7d924be2b1484c1521dd3fd2/tasks'


export const fetchTaskList = () => {
  return fetch(baseUrl)
      .then(response => {
          if (response.ok) {
              return response.json();
          }
      })
      .then(tasksList => tasksList
          .map(({ _id, ...rest }) => ({ id: _id, ...rest })))
}

export const createTask = taskData => {
  return fetch(baseUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(taskData),
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Faaaailed!!!!');
          }
      })
};

export const updateTask = (taskId, taskData) => {
  return fetch(`${baseUrl}/${taskId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(taskData),
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Faaaailed to update!!!!');
          }
      })
};

export const deleteTask = taskId => {
  return fetch(`${baseUrl}/${taskId}`, {
      method: 'DELETE'
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Faaaailed to delete!!!!');
          }
      })
}