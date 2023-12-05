import { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import styles from "./Main.module.css";
import { ITask } from "../../interfaces/Task";

const Main = () => {
  const [taskList, setTaskList] = useState<ITask[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display){
      modal!.classList.remove("hide")
    }
    else{
      modal!.classList.add("show")
    }
  }

  const editTask = () : void => {
    hideOrShowModal(true)
  }

 return (
   <main className={styles.main}>
     <div>
       <TaskForm btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList} />
     </div>
     <div>
       <h2>Suas tarefas:</h2>
       <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
     </div>
   </main>
 );
};

export default Main;
