import React, { createContext, useContext } from 'react';
import { t } from '../translations';

interface LangContextType {
  t: typeof t;
}

const LangContext = createContext<LangContextType>({ t });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => (
  <LangContext.Provider value={{ t }}>
    {children}
  </LangContext.Provider>
);

export const useLanguage = () => useContext(LangContext);
