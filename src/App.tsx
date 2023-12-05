import { useState } from 'react'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import Modal from './components/Modal/Modal'
import TaskForm from './components/TaskForm/TaskForm'

import { ITask } from './interfaces/Task'

// import './App.css'

function App() {
  
  const [taskList, setTaskList] = useState<ITask[]>([]);

  return (
    <div>
      <Modal children={<TaskForm btnText='Editar Tarefa' taskList={taskList}  setTaskList={setTaskList}/>}/>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
