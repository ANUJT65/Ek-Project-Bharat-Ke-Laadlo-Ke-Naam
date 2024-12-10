import { createContext, useContext, useState } from "react";

const GovernmentDBContext = createContext();

export const GovernmentProvider = ({ children }) => {
  const [option, setOptions] = useState();

  // Return the provider
  return (
    <GovernmentDBContext.Provider value={{ option, setOptions }}>
      {children}
    </GovernmentDBContext.Provider>
  );
};

export const useGovernment = () => {
  const context = useContext(GovernmentDBContext);

  if (!context) {
    throw new Error('useGovernment must be used within a GovernmentProvider');
  }

  return context;
};
