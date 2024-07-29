"use client";
import { createContext, useContext } from 'react';
import { AppContextProps } from './types';

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
