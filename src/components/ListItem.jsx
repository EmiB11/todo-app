import React ,{useRef} from 'react'
import { useDrop, useDrag } from "react-dnd";
import deleteIcon from '../images/Close Square.svg'
function ListItem({text , index , moveListItem , id , deleteTask , dispatch , completed , mode}) {
   
  const handleCheck = (e)=>{
      dispatch({type:"CHECK" , payload: id})
      
     
  }

    const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'task',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveListItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
     <div className={`todo-box ${mode}--mode-todo-box`}  style={mode === 'dark' ? {backgroundColor:'black' , color: 'white'  , opacity} : {backgroundColor:'white' , color:'hsl(235, 19%, 35%)'  ,opacity}} ref={ref}  >
       <input type="checkbox" id="task" name="task" value='task' onChange={handleCheck} checked={completed} />
         <span id='spanTask' style={completed ? {textDecoration:"line-through"} : {textDecoration:"none"}}>{text}</span>
            <button id='delete' onClick={()=> deleteTask(id)} ><img src={deleteIcon} alt='delete' /></button>
     </div> 
  )
}

export default ListItem