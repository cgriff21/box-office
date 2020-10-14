import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        Home page yo
      </Route>

      <Route exact path="/starred">
        Starred page yo
      </Route>

      <Route>Not a page yo</Route>
    </Switch>
  );
}

export default App;
