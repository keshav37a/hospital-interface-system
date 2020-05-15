import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import SignIn from './components/SignIn';
import Report from './components/Report';
import Patient from './components/Patient';
import NotFound from './components/NotFound';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <div>
    <Router>
        <Route exact path="/" component={SignIn} />
        <Route path="/patients" component={Patient} />
        <Route path="/reports" component={Report} />
    </Router>
  </div>
)

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);
