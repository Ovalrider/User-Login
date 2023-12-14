import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }
  function loginHandler() {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }
  
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []); // if no dependencies == oninit
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
