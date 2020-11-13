import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';
import Test from './pages/test';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          {
            process.env.NODE_ENV !== 'production' ? <Route path="/prueba" component={Test} exact /> : <></>
          }
          <Route path='/room/:roomId' component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
