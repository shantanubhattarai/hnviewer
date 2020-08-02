import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/style.css';
import Story from './components/pages/Story';
import StoryList from './components/pages/StoryList';

function App() {
  return (
    <div className="container">
      <h1>HN Viewer</h1>
      <Router>
        <Switch>
          <Route path="/story/:id" component={Story} />
          <Route path="/">
            <StoryList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
