import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'lib-flexible'
import {
  BrowserRouter as Router
} from "react-router-dom";

const container = document.getElementById('root')
const root = createRoot(container)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
// )
root.render(
    <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
