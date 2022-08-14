 import {useState ,useEffect , useContext} from 'react'
 import { DndProvider } from 'react-dnd'
 import { HTML5Backend } from 'react-dnd-html5-backend'
import { StoreContext } from './store/storeProvider';
import Todos from './components/Todos'
import CreateTodo from './components/CreateTodo';
import Footer from './components/Footer'
import './App.css';



function App() {
  const [mode , setMode] = useState('dark');
 const [store , dispatch] = useContext(StoreContext);
 const {tasks} = store;

 
  useEffect(()=>{
   
  },[mode, tasks ])

  

  return (
    <div className={`main ${mode}--mode-body`}>
    <CreateTodo mode={mode} setMode={setMode} dispatch={dispatch} tasks={tasks}/>
    <DndProvider backend={HTML5Backend}>
     <Todos mode={mode} tasks={tasks} dispatch={dispatch}/>
     </DndProvider>
     <Footer />
    </div>
  );
}

export default App;
