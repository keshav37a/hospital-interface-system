import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SignIn from './components/SignIn';
import Patient from './components/Patient';
import Stats from './components/Stats';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <div>
    <Router>
        <Route exact path="/" component={SignIn} />
        <Route path="/patients" component={Patient} />
        <Route path="/stats" component={Stats} />
        <Route path="/sign-up" component={SignUp} />
    </Router>
  </div>
)

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);
