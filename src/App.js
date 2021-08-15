import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './Context';
import Index from './components/layout/Index';
import NavBar from './components/layout/NavBar';
import Lyrics from './components/tracks/Lyrics'

function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route path='/lyrics/track/:id' component={Lyrics} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
