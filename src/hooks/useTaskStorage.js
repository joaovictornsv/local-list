import {generateRandomUuid} from "../utils/generateRandomUuid.js";
import { useEffect, useState} from "react";

const TASKS_STORAGE_KEY = 'tasks'
export const useTaskStorage = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(getTasks())
  }, []);

  const getTasks = () => {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY)
    return JSON.parse(raw || '[]')
  }

  const saveTasks = (tasks) => {
    const raw = JSON.stringify(tasks)
    localStorage.setItem(TASKS_STORAGE_KEY, raw)
    setTasks(tasks)
  }

  const toggleTaskDone = (taskId) => {
    saveTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          task.done = !task.done
        }
        return task
      })
    )
  }

  const newTask = ({ title }) => {
    saveTasks([
      ...tasks,
      {
        id: generateRandomUuid(),
        done: false,
        title: title,
      }
    ])
  }

  const editTask = (taskId, { title }) => {
    saveTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          task.title = title
        }
        return task
      })
    )
  }


  const removeTask = (taskId) => {
    saveTasks(
      tasks.filter((task) => task.id  !== taskId)
    )
  }


  return {
    tasks,
    newTask,
    removeTask,
    toggleTaskDone,
    editTask,
  }
}
