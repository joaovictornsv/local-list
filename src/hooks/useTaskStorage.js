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

  const saveTasks = (tasksToSave) => {
    const raw = JSON.stringify(tasksToSave)
    localStorage.setItem(TASKS_STORAGE_KEY, raw)
    setTasks(tasksToSave)
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

    const newIndependentTasks = tasksToLoad.filter((task) => !task.sectionId)
    const newSectionTasks = tasksToLoad.filter((task) => !!task.sectionId)

    const sectionTasksNonConflicted = newSectionTasks.map((newSectionTask) => {
      const taskSectionExists = getTasksBySectionId(newSectionTask.sectionId).find(
        (task) => task.title === newSectionTask.title
      )
      if (!taskSectionExists) {
        return newSectionTask
      }

      taskSectionExists.done = newSectionTask.done
      taskSectionExists.pinned = newSectionTask.pinned
      return null
    }).filter(Boolean)

    saveTasks([
      ...tasks,
      ...newIndependentTasks,
      ...sectionTasksNonConflicted,
    ])
  }

  const duplicateSectionTasks = ({
    sectionId,
    newSectionId
  }) => {
    const sectionTasks = getTasksBySectionId(sectionId)

    const duplicatedSectionTasks = sectionTasks.map(
      (task) => ({
        ...task,
        id: generateRandomUuid(),
        sectionId: newSectionId
      })
    )
    saveTasks([
      ...tasks,
      ...duplicatedSectionTasks
    ])
  }

  const newTask = ({ title, sectionId }) => {
    saveTasks([
      ...tasks,
      {
        id: generateRandomUuid(),
        done: false,
        title: title,
        sectionId: sectionId || null
      }
    ])
  }

  const editTask = (taskId, { sectionId, title, pinned }) => {
    saveTasks(
      tasks.map((task) => ({
        ...task,
        ...(task.id === taskId && {
          title,
          ...(pinned !== undefined && { pinned: !!pinned}),
          ...(sectionId !== undefined && { sectionId }),
        })
      }))
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
    tasks: tasks.slice(0),
    newTask,
    removeTask,
    toggleTaskDone,
    editTask,
    getIndependentTasks,
    getTasksBySectionId,
    removeTasksFromSectionId,
    importTasks,
    duplicateSectionTasks
  }
}
