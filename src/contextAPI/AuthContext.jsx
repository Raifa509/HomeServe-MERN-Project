import React, { createContext, useEffect, useState } from 'react';

export const userAuthContext = createContext();

function AuthContext({ children }) {

  const [role, setRole] = useState(null);        // null = not loaded yet
  const [authorisedUser, setAuthorisedUser] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role);
      setAuthorisedUser(true);
    }

    setAuthLoading(false); // auth check finished
  }, []);

  return (
    <userAuthContext.Provider value={{
      role,
      setRole,
      authorisedUser,
      setAuthorisedUser,
      authLoading
    }}>
      {children}
    </userAuthContext.Provider>
  );
}

export default AuthContext;
