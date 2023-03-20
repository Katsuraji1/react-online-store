import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userStore from './store/userStore';
import devicesStore from './store/deviceStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)
root.render(
  <Context.Provider value={{
    user: new userStore(),
    devices: new devicesStore()
  }}>
    <App />
  </Context.Provider>
);

