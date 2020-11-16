import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';
import Test from './pages/test';
import Navbar from './components/navbar';
import { PreferencesProvider } from './context/preferences';

function App() {
  return (
    <div className="App">
      <PreferencesProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            {
              process.env.NODE_ENV !== 'production' ? <Route path="/prueba" component={Test} exact /> : null
            }
            <Route path='/room/:roomId' component={Room} />
          </Switch>
        </BrowserRouter>
      </PreferencesProvider>
    </div>
  );
}

export default App;
