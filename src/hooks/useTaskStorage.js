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

  const getIndependentTasks = () => {
    return tasks.filter((task) => !task.sectionId)
  }

  const getTasksBySectionId = (sectionId) => {
    return tasks.filter((task) => task.sectionId === sectionId)
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

  const importTasks = (newTasks) => {
    const tasksToLoad = newTasks.map((task) => ({
      ...task,
      id: generateRandomUuid(),
    }))
    saveTasks([
      ...tasks,
      ...tasksToLoad,
    ])
  }

  const newTask = ({ title, sectionId }) => {
    saveTasks([
      ...tasks,
      {
        id: generateRandomUuid(),
        done: false,
        title: title,
        ...(sectionId && {sectionId})
      }
    ])
  }

  const editTask = (taskId, { title, pinned }) => {
    saveTasks(
      tasks.map((task) => {
        return {
          ...task,
          ...(task.id === taskId && {
            title,
            pinned: !!pinned
          })
        }
      })
    )
  }

  const removeTask = (taskId) => {
    saveTasks(
      tasks.filter((task) => task.id  !== taskId)
    )
  }

  const removeTasksFromSectionId = (sectionId) => {
    saveTasks(
      tasks.filter((task) => !task.sectionId || (task.sectionId  !== sectionId))
    )
  }

  return {
    tasks,
    newTask,
    removeTask,
    toggleTaskDone,
    editTask,
    getIndependentTasks,
    getTasksBySectionId,
    removeTasksFromSectionId,
    importTasks,
  }
}
