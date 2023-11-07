import { useState } from 'react'
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import routes from './components/Routes';

const location = new ReactLocation();
function App() {
  return (
    <>
      <Router
        location={location}
        routes={routes}
      >
        <Outlet />
      </Router>
    </>
  )
}

export default App
