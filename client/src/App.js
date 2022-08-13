import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <GoogleOAuthProvider clientId='790180615424-vj0onnbe5rshfijrirdck31qclkcef2u.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;