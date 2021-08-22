import React from 'react';
import './Main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/layout/Header';
import Tracker from './pages/Tracker/Tracker';
import ListOfTrackedItems from './pages/ListOfTrackedItems/ListOfTrackedItems'
import DetailPage from './pages/DetailPage/DetailPage';

const App: React.FC = () => {
  return (
    <main className="main-body">
      <Router>
        <Header/>  
        <Switch>
          <Route path="/" exact>
            <Tracker />
          </Route>
          <Route path="/list" exact>
            <ListOfTrackedItems />
          </Route>
          <Route path="/list/:id">
            <DetailPage />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
