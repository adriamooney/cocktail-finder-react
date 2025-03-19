import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Nav from './components/ui/Nav';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cocktail from './pages/Cocktail';

function App() {

  const [favorites, setFavorites] = useState([]);

  function addFavorite(drinkId) {
    setFavorites([...favorites, drinkId])
    console.log(favorites);
  }

  function removeFavorite(item) {
    setFavorites(favorites.filter(item => item !== drink));
  }

  return (
    <Router>
      
       <section id="landing">
          <Nav />
          
        <Routes>
          <Route path="/" element={<Home />}>Find your cocktail</Route>
          <Route path="/favorites" element={<Favorites favorites={favorites} />}>Favorites</Route>
          <Route path="/cocktail/:id" element={<Cocktail favorites={favorites} addFavorite={addFavorite}/>}>Cocktail</Route>
        </Routes>

       
    </section>
   

    </Router>
  )
}

export default App
