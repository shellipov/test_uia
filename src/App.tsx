import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Weather from './components/Weather';
import HistoryWeather from './components/HistoryWeather';
import './App.css';

const App: React.FC = () => {
  return <>
    <Router>
      <Switch>
        <Route path='/history'>
          <HistoryWeather />
        </Route>
        <Route path='/'>
          <Weather />
        </Route>
      </Switch>
    </Router>
  </>
}

export default App;
