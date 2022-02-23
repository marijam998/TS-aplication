import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Home from './Home';


const App: React.FunctionComponent = ({ }) => {

  return (
    <div>
      <Route path="/" element={<Home />} />
    </div>
  )

}

export default App;

