import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Nav from './components/ui/Nav';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {

  return (
    <Router>
      
       <section id="landing">
          <Nav />
          
        <Routes>
          <Route path="/" element={<Home />}>Find your cocktail</Route>
          <Route path="/favorites" element={<Favorites />}>Favorites</Route>
        </Routes>

       
    </section>
   

    </Router>
  )
}

export default App
