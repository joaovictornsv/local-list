import {TaskProvider} from "./TaskContext.jsx";
import {SectionProvider} from "./SectionContext.jsx";

export const AppProviders = ({ children }) => (
  <TaskProvider>
    <SectionProvider>
      {children}
    </SectionProvider>
  </TaskProvider>
)
