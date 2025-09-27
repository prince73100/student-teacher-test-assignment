import React, { createContext, useContext, useReducer, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [accessToken,setAccessToken] = useState(null);
  const [userInfo,setuserInfo]= useState({})
  return (
    <AppContext.Provider value={{ accessToken,setAccessToken,userInfo,setuserInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
