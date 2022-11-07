import { useEffect, useState, createContext } from 'react';
import auth from 'utils/auth';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      const localUser = auth.getUser();
      localUser && setUser(localUser);
    }
  }, []);

  const contextValue = { user, setUser };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
