import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SignIn from './components/SignIn';
import Patient from './components/Patient';
import Stats from './components/Stats';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { Router, Switch, Route } from "react-router-dom";
import history from './services/historyService';

const routing = (
  <div>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/patients" component={Patient} />
        <Route path="/stats" component={Stats} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
  </div>
)

ReactDOM.render(
  <ToastProvider>
    <React.StrictMode>
      {routing}
    </React.StrictMode>
   </ToastProvider>
  ,
  document.getElementById('root')
);
