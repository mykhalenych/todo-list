 const baseUrl = 'https://5e64c3daa49c210016106bc4.mockapi.io/tasks'

export const fetchTasksList = () => {
    return fetch(baseUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(tasksList => { return tasksList })
}

export const createTask = (newTask) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newTask)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create task');
            }
        })
}

export const updateTask = (taskId, updatedTask) => {
    return fetch(`${baseUrl}/${taskId}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(updatedTask)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
        });
}

export const deleteTask = (taskId) => {
    return fetch(`${baseUrl}/${taskId}`, {
        method: 'DELETE'
    }).then(
        res => {
            if (!res.ok) {
                throw new Error('Failed to delete tasks')
            }
        }
    )
}