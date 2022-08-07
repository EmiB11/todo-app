import React, {useState,useCallback } from 'react'

import ListItem from './ListItem'
function Todos({tasks ,dispatch}) {
const [todo , setTodo] = useState(tasks)
 
const moveTask = useCallback(
  (dragIndex, hoverIndex) => {
      const dragItem = todo[dragIndex]
      const hoverItem = todo[hoverIndex]
      // Swap places of dragItem and hoverItem in the pets array
      setTodo(todo => {
          const updatedTask = [...todo]
          updatedTask[dragIndex] = hoverItem
          updatedTask[hoverIndex] = dragItem
          return updatedTask
      })
  },
  [todo],
)



const filterTodos = (e) =>{
   
   console.log(e.target.outerText )
    if(e.target.outerText === 'Todas') dispatch({type:'FILTER_TASK_DEFAULT'})

    else if(e.target.outerText === 'Activas') dispatch({type:'FILTER_TASK_ACTIVES'})
     
    else dispatch({type:'FILTER_TASK_COMPLETED'})
      
  }

  const deleteAll = () => {
    dispatch({type:'DELETE_ALL_TASKS'})
  }
  
  const deleteTask = (index) => {
    console.log(index)
     dispatch({type:'DELETE_TASK' , payload: index})
  }


  return (
    <div className="todo-body">
        <div className="todos-box">
          <div className="draggable-list todos"></div>
            { !tasks?.length
            ?<p id='spanNoTask' className='todo-box'>Agregue una tarea</p>
            
            : tasks?.map((task , i) =>
               <ListItem 
                   key= {task.id}
                   text= {task.todo}
                   index= {i}
                   id = {task.id}
                   moveListItem= {moveTask}
                   deleteTask= {deleteTask}
               />
            )}
          <div className="todo-box-filter">
            <div className="todo-box__sorter">
              <div className="todo-counter"><p>{tasks.length} Tareas</p></div>
              <div className="todo-sorter sorters">
                <p className="filter item"  onClick={filterTodos}>Todas</p>
                <p className="filter item" onClick={filterTodos} >Activas</p>
                <p className="filter item" onClick={filterTodos}>Completadas</p>
              </div>
              <div className="todo-clearer">
                <p className="filter"onClick={deleteAll}>Eliminar completados</p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
  )
}

export default Todos