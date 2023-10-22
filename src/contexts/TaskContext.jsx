import { createContext } from 'react';
import { useTaskStorage } from '../hooks/useTaskStorage.js';

export const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const values = useTaskStorage();

  return (
    <TaskContext.Provider value={{ ...values }}>
      {children}
    </TaskContext.Provider>
  );
};
