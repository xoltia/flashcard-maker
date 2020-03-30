import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Deck from './pages/Deck';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/:id" component={Deck} />
        </Switch>
    </Router>
  );
}

export default App;
