export const getTasksLocalStorage = () => {
    try {
      
      const task = localStorage.getItem('task');
      return task ? JSON.parse(task) : []
    } catch (err) {
      console.log(err);
    }
  };
  
  export const saveTasksLocalStorage = (task) => {
    task = JSON.stringify(task);
    localStorage.setItem('task', task);
  };