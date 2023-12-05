// TaskForm.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles from './TaskForm.module.css';

import { ITask } from '../../interfaces/Task';

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const TaskForm = ({ btnText, taskList, setTaskList }: Props) => {
  const [title, setTitle] = useState<string>("");

  const addTaskTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: ITask = {
      id: Math.floor(Math.random() * 1000),
      title,
    };

    setTaskList([...taskList, newTask]);
    setTitle("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Atualizar localStorage com novas tarefas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <form onSubmit={addTaskTaskHandler} className={styles.form}>
      <input type="text" placeholder="Tarefa" onChange={handleChange} value={title} />
      <button type="submit">{btnText}</button>
    </form>
  );
};

export default TaskForm;
