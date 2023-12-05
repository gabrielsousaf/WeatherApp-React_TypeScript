import { FaCheckCircle, FaPen, FaTrash } from "react-icons/fa";

import { ITask } from "../../interfaces/Task"
import styles from "./TaskList.module.css"

interface Props {
  taskList: ITask[];
  handleDelete(id: number) : void;
  handleEdit(): void;
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div className={styles.task} key={task.id}>
           <span className={styles.task_name}>{task.title}</span>
           <span className={styles.task_icons}>
            <FaCheckCircle />
            <FaPen onClick={() => handleEdit()} />
            <FaTrash onClick={() => {handleDelete(task.id)}} />
           </span>
          </div>
        ))
      ) : (
        <p>Não há tarefas</p>
      )}
    </>
  )
}

export default TaskList