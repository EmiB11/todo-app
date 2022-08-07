import { getTasksLocalStorage,saveTasksLocalStorage } from '../localstorage/localStorage';
const initialState = {
    tasks : getTasksLocalStorage(),
    filterTask: getTasksLocalStorage()
}

const storeReducer = (state = initialState ,action) =>{
  switch(action.type) {
    case 'ADD_TASK': 
    saveTasksLocalStorage([...state.tasks, action.payload])
    return {
        ...state,
        tasks : [...state.tasks, action.payload],
        filterTask:[...state.tasks, action.payload]
    }
    case 'FILTER_TASK_COMPLETED': 
      const completed = state.filterTask.filter(todo => todo.completed === true)
    return {
        ...state,
        tasks: completed.length > 0 ? completed : [{todo: "No hay tareas completadas" , completed: false}]

    }
    case 'FILTER_TASK_ACTIVES':
        const actives = state.filterTask.filter(todo => todo.completed === false)
        return {
         ...state,
         tasks:  actives.length > 0 ?  actives : [{todo: "No hay tareas activas" , completed: false}]
        }
    case 'FILTER_TASK_DEFAULT':
        return{
            ...state,
            tasks: state.filterTask
        }
    case 'DELETE_ALL_TASKS': 
      localStorage.removeItem('task')    
    return initialState
    
    case 'DELETE_TASK':
        console.log(action.payload)
       const deleteTask = state.tasks.filter(todo  => todo.id !== action.payload )
       saveTasksLocalStorage(deleteTask)
       return{
         ...state,
         tasks: deleteTask,
         filterTask: deleteTask
       }

    default: return state
  }
}

export {initialState}
export default storeReducer