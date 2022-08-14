import { getTasksLocalStorage,saveTasksLocalStorage } from '../localstorage/localStorage';
const initialState = {
    tasks : getTasksLocalStorage(),
    filterTask: getTasksLocalStorage(),
    noTasks: null
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
        //tasks: completed.length > 0 ? completed : [{todo: "No hay tareas completadas" , completed: false}]
        tasks:completed,
        noTasks: "No hay tareas completadas"

    }
    case 'FILTER_TASK_ACTIVES':
        const actives = state.filterTask.filter(todo => todo.completed === false)
        return {
         ...state,
         // tasks:  actives.length > 0 ?  actives : [{todo: "No hay tareas activas" , completed: false}],
         tasks: actives,
         noTasks: "No hay tareas activas"
        }
    case 'FILTER_TASK_DEFAULT':
        return{
            ...state,
            tasks: state.filterTask
        }
    case 'DELETE_ALL_TASKS': 
     const deleteCompleted = state.tasks.filter( todo => todo.completed !== true )
     saveTasksLocalStorage(deleteCompleted)
    return {
      ...state,
      tasks: deleteCompleted,
      filterTask:deleteCompleted
    }
    
    case 'DELETE_TASK':
       
       const deleteTask = state.tasks.filter(todo  => todo.id !== action.payload )
       saveTasksLocalStorage(deleteTask)
       return{
         ...state,
         tasks: deleteTask,
         filterTask: deleteTask
       }
    case 'DRAG_AND_DROP': return {
      ...state,
      tasks: action.payload
    }
    case "CHECK": 
      const checkTask = state.tasks.map(task => {
         if(task.id === action.payload) return {...task , completed: !task.completed}
         return task
      })
     
    return {
      ...state,
       tasks: checkTask,
       filterTask: checkTask
       
    }
    default: return state
  }
}

export {initialState}
export default storeReducer