import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { auth, db } from './firebase/init';
import {collection, addDoc, deleteDoc, query, where, getDocs} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Nav from './components/ui/Nav';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cocktail from './pages/Cocktail';
import Login from './components/ui/Login';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cockTails, setCockTails] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(false);

  function addFavorite(drinkId) {
    setFavorites([...favorites, drinkId])
    const drink ={
      idDrink : drinkId,
      uid: user.uid
    }
    addDoc(collection(db, "favorites"), drink)
  }

  async function getFavoriteFromDb(id) {
    const favoriteRef = await query(collection(db, 'favorites'), where("uid", "==", user.uid), where("idDrink", "==", id));
    const { docs }  = await getDocs(favoriteRef);
    const favoritesArr = docs.map(doc => doc.data());
    return {favoriteRef, favoritesArr};
  }

  async function removeFavorite(drinkId) {
    setFavorites(favorites.filter(item => item !== drinkId));
    const {favoriteRef} = await getFavoriteFromDb(drinkId);
    const { docs }  = await getDocs(favoriteRef);
    
    docs.forEach((doc) => {
      deleteDoc(doc.ref); 
    });
  }
    
  async function fetchCockTails() {
      setLoading(true);
        const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        setCockTails(data.drinks);
        setLoading(false);
  }


useEffect(() => {
  //console.log(user)
  onAuthStateChanged(auth, (user) => {
    setTimeout(() => {
      setLoading(false);
    }, 500)
    
    if(user) {
      setUser(user);
      console.log(user);
    }
  })
}, []);

  return (
    <Router>
      
       <section id="landing">
          <Nav user={user} setUser={setUser}/>
          {!user ? <Login /> :  
          <Routes>
            <Route path="/" element={<Home ingredient={ingredient} setIngredient={setIngredient} fetchCockTails={fetchCockTails} cockTails={cockTails} loading={loading} />}>Find your cocktail</Route>
            <Route path="/favorites" element={<Favorites favorites={favorites} user={user}/>}>Favorites</Route>
            <Route path="/cocktail/:id" element={<Cocktail favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} cockTails={cockTails} ingredient={ingredient} getFavoriteFromDb={getFavoriteFromDb}/>}>Cocktail</Route>
          </Routes>}
          
         
    </section>
   

    </Router>
  )
}

export default App
