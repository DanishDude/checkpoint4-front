import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import './App.css';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Basket from './components/Cart';
import Admin from './containers/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/Gallery" component={Gallery} />
        <Route path="/Basket" component={Basket} />
        <Route path="/Admin" component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
