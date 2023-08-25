import {TaskProvider} from "./TaskContext.jsx";
import {SectionProvider} from "./SectionContext.jsx";

export const AppProvider = ({ children }) => (
  <TaskProvider>
    <SectionProvider>
      {children}
    </SectionProvider>
  </TaskProvider>
)
