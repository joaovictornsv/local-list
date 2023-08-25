import {useContext} from "react";
import {TaskContext} from "./TaskContext.jsx";

export const useTask = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }

  return context;
}
