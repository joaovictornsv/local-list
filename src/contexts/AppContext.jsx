import {TaskProvider} from "./TaskContext.jsx";
import {SectionProvider} from "./SectionContext.jsx";
import {SettingsProvider} from "./SettingsContext.jsx";

export const AppProviders = ({ children }) => (
  <SettingsProvider>
    <TaskProvider>
      <SectionProvider>
        {children}
      </SectionProvider>
    </TaskProvider>
  </SettingsProvider>
)
