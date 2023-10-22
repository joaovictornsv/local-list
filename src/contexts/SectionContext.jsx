import { createContext } from 'react';
import { useSectionStorage } from '../hooks/useSectionStorage.js';

export const SectionContext = createContext({});

export const SectionProvider = ({ children }) => {
  const values = useSectionStorage();

  return (
    <SectionContext.Provider value={values}>{children}</SectionContext.Provider>
  );
};
