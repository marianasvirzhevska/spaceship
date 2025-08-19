export const completeTask = (id, tasks) => {
    return tasks.map((el) => {
        console.log('Tasks, ', id, el)
        if (el.id === Number(id)) {
            return {...el, status: 'Виконано'};
        }
        if (el.id === Number(id) + 1) {
            return {...el, status: 'Виконується'};
        }
        return el;
    })
}

export const findCurrentTaskStatus = (id, tasks) => {
    const index = tasks?.find(el => el.id === Number(id));
    return index.status;
}

