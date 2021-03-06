import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import KanbanBoardContainer from './KanbanBoardContainer';
// import KanbanBoard from './KanbanBoard';
import EditCard from './EditCard';
import NewCard from './NewCard';



render((
  <Router history={browserHistory}>
  <Route path="/" component={KanbanBoardContainer}>
      <Route path="/new" component={NewCard} />
      <Route path="/edit/:card_id" component={EditCard} />
  </Route>
  </Router>
), document.getElementById('root'));
