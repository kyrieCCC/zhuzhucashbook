import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import routes from '../src/router'
function App() {
  return <Router>
    <Routes>
      {
        routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component/>} />)
      }
    </Routes>
  </Router>
}

export default App