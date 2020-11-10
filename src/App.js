import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path='/room/:roomId' component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
