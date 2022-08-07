import React , {useState} from 'react'
import imageMoon from '../images/icon-moon.svg'
import darkImage from '../images/bg-desktop-dark.jpg'
import lightImage from '../images/bg-desktop-light.jpg'
import imageSun from '../images/icon-sun.svg'

function CreateTodo({mode , setMode , dispatch , tasks }) {
 
 const [icon , setIcon] = useState(imageMoon)
 const [text , setText] = useState('')   
 

 const handleMode = ()=>{
    if(icon === imageMoon){
    setIcon(imageSun)
    setMode('ligth')
    }
    else {
    setIcon(imageMoon)
    setMode('dark') 
    }
 }

 const handleChange = (e ) => {
  
    setText(e.target.value)
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  const todo = {
    id: tasks.length + 1 ,
    todo: text,
    completed: false
  }
  if(text.length)  dispatch({type:'ADD_TASK', payload: todo})
  
   e.target.reset()
 }
  return (
    <div className="header" style={mode === 'dark' ? { backgroundImage:`url(${darkImage})`} : { backgroundImage:`url(${lightImage})`}}>
    <nav>
      <div className="nav-items">
        <div className="logo">
          <p>Lista de tareas</p>
        </div>
        <button className="toggle" onClick={handleMode}>
          <img src={icon} alt="moon" />
        
        </button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            className="input"
            type="text"
            placeholder="Crea una nueva tarea..."
            onChange={handleChange}
          />
          <button className="btn-add" type="submit" ><img src="/images/icons8-arrow-60.png" alt="arrow"/></button>
        </div>
      </form>
    </nav>
  </div>
  )
}

export default CreateTodo