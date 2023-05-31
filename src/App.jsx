import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from "../src/pages/router";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
