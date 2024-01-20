import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize state with data from localStorage or default to null
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Use useEffect to update state when localStorage changes
  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
  }, [userId, token]);

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
