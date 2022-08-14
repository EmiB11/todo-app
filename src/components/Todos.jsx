import React, {useState,useCallback, useEffect } from 'react'

import ListItem from './ListItem'
function Todos({tasks ,dispatch , mode , noTasks}) {
const [todo , setTodo] = useState(tasks)
 
const moveTask = useCallback(
  (dragIndex, hoverIndex) => {
      const dragItem = tasks[dragIndex]
      const hoverItem = tasks[hoverIndex]
      // Swap places of dragItem and hoverItem in the pets array
      
          const updatedTask = [...tasks]
          updatedTask[dragIndex] = hoverItem
          updatedTask[hoverIndex] = dragItem
          dispatch({type:"DRAG_AND_DROP" , payload: updatedTask}) 
      
  },
  [tasks],
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
useEffect(()=> {

},[todo ])

  return (
    <div className="todo-body" >
        <div className={`todos-box `}>
          <div className={`draggable-list todos `}></div>
            { !tasks?.length
            ?<p id='spanNoTask' className='todo-box' style={mode === 'dark' ? {backgroundColor:'black' , color: 'hsl(234, 39%, 85%)' } : {backgroundColor:'white' , color:'hsl(235, 19%, 35%)' }}>
              {noTasks === null ? 'Agregue una tarea' : noTasks}
            
            </p>
            
            : tasks?.map((task , i) =>
               <ListItem 
                   key= {task.id}
                   text= {task.todo}
                   index= {i}
                   id = {task.id}
                   moveListItem= {moveTask}
                   deleteTask= {deleteTask}
                   dispatch = {dispatch}
                   completed = {task.completed}
                   mode= {mode}
               />
            )}
          <div className={`todo-box-filter `} style={mode === 'dark' ? {backgroundColor:'black' , color: 'hsl(234, 39%, 85%)' } : {backgroundColor:'white' , color:'hsl(235, 19%, 35%)' }}>
            <div className={`todo-box__sorter  `}>
              <div className="todo-counter"><p>{tasks.length} {tasks.length < 2 ? 'Tarea' : 'Tareas'}</p></div>
              <div className="todo-sorter sorters">
                <p className= {`filter item  ${mode}--mode-filter`}  onClick={filterTodos}>Todas</p>
                <p className= {`filter item  ${mode}--mode-filter`} onClick={filterTodos} >Activas</p>
                <p className= {`filter item  ${mode}--mode-filter`} onClick={filterTodos}>Completadas</p>
              </div>
              <div className="todo-clearer">
                <p className={`filter ${mode}--mode-filter`} onClick={deleteAll}>Eliminar completados</p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
  )
}

export default Todos