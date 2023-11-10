import { useState } from 'react'
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import routes from './components/Routes';
import { Toaster } from 'react-hot-toast';

const location = new ReactLocation();
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
