import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Shows from './components/Shows';
import Gallery from './components/Gallery';
import Basket from './components/Cart';
import Admin from './components/Admin';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/Shows" component={Shows} />
        <Route path="/Gallery" component={Gallery} />
        <Route path="/Basket" component={Basket} />
        <Route path="/Admin" component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
