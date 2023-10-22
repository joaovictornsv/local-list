import { createContext } from 'react';
import { useSettingsStorage } from '../hooks/useSettingsStorage.js';

export const SettingsContext = createContext({});

export const SettingsProvider = ({ children }) => {
  const values = useSettingsStorage();

  return (
    <SettingsContext.Provider value={{ ...values }}>
      {children}
    </SettingsContext.Provider>
  );
};
