import { React, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './components/AppRoute';
import NavigationBar from './components/NavigationBar';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { check } from './http/userApi';
import { Context } from './index';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const [loading, isLoading] = useState(true)
  const {user} = useContext(Context)

  useEffect(() => {
    check().then(data =>
        user.setIsAuth(true),
        user.setUser(true)
      ).finally(() => isLoading(false))
  }, [])

  if(loading) {
    return <Spinner animation={'grow'}></Spinner>
  }

  return (
    <BrowserRouter>
      <NavigationBar/>
      <AppRoute/>
    </BrowserRouter>
  );
})

export default App;
