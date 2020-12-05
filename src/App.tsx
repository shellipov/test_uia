import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Weather from './components/Weather';
import Header from './components/Header';
import HistoryWeather from './components/HistoryWeather';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/main.scss';

const App: React.FC = () => {
  return <>
  <Provider store={store}>
    <Router>
    <Header />
      <Switch>
        <Route path='/history'>
          <HistoryWeather />
        </Route>
        <Route path='/'>
          <Weather />
        </Route>
      </Switch>
    </Router>
  </Provider>
  </>
}

export default App;
