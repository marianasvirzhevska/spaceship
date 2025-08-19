import { useState, useEffect } from 'react';

import { completeTask } from './commonHandlers';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export function useUpdateMocks(id) {
  useEffect(() => {
    try {
      const storageValue = window.localStorage.getItem('mocks');
      const mocks = JSON.parse(storageValue);
      const newMocks = completeTask(id, mocks);
  
      window.localStorage.setItem('mocks', JSON.stringify(newMocks));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
}
