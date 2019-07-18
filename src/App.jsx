import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import './App.css';
import Header from './components/Header';
import OurStory from './components/OurStory';
import Shows from './containers/Shows/Shows'
import Admin from './containers/Admin/Admin';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/OurStory" component={OurStory} />
        <Route path="/Shows" component={Shows} />
        <Route path="/Admin" component={Admin} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
