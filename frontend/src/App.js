import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import store from './redux/store';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={() => <SignIn />} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
