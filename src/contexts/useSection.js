import {useContext} from "react";
import {SectionContext} from "./SectionContext.jsx";

export const useSection = () => {
  const context = useContext(SectionContext)

  if (!context) {
    throw new Error('useSection must be used within an SectionProvider');
  }

  return context;
}
