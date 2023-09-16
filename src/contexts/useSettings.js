import {useContext} from "react";
import {SettingsContext} from "./SettingsContext.jsx";

export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }

  return context;
}
