import React, {useEffect, useState} from 'react'
import Header from '../components/ui/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from '../firebase/init';
import {collection, getDocs, query, where } from 'firebase/firestore';

function Favorites({favorites, user}) {

    const navigate = useNavigate();

    const [favoriteDrinks, setFavoriteDrinks] = useState([]);
    console.log(favorites);

    async function fetchFavorites(favorites) {

        const favoritesFromDb = await getFavoritesFromDb();
        console.log(favoritesFromDb);

        let tempDrinksArr =[];

        //this works for local state of favorites only
        // for(let i=0; i<favorites.length; i++) {
        //     console.log(favorites[i])
        //     const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favorites[i]}`);
        //     tempDrinksArr.push(data.drinks[0]);
        // }

        for(let i=0; i<favoritesFromDb.length; i++) {
            const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favoritesFromDb[i].idDrink}`);
            tempDrinksArr.push(data.drinks[0]);
        }

       setFavoriteDrinks(tempDrinksArr);
        
    }

    async function getFavoritesFromDb() {
        const favoritesCollectionRef = await query(
          collection(db, 'favorites'),
          where("uid", "==", user.uid)
        );
        const { docs }  = await getDocs(favoritesCollectionRef);
        return docs.map(doc => doc.data());
      }

    useEffect(() => {
        fetchFavorites(favorites);
    }, []);

  return (
    <>
         <Header title="Your Favorites Cocktails"  />
         <main>
                <section id="favorites">
                    <div className="container">
                        <div className="row">
                            <div className="drinks__list">
                                {favoriteDrinks.length > 0 && favoriteDrinks.map((cockTail) => {
                                    return(
                                        <div key={cockTail.idDrink} className="drink click" onClick={() => navigate(`/cocktail/${cockTail.idDrink}`)}>   
                                            <figure className="drink__img--wrapper">
                                                <h3 className="drink__title">{cockTail.strDrink}</h3>
                                                <img src={cockTail.strDrinkThumb} alt="" className="drink__img" />
                                                <div className="drink__overlay" >
                                                    <button className="btn drink__recipe--link"><FontAwesomeIcon icon="martini-glass"></FontAwesomeIcon> Full Recipe</button>
                                                </div>
                                            </figure>
                                        </div>
                                    )
                                })}
                            </div>
                        
                        </div>
                    </div>
                </section>
            </main>
    </>
  )
}

export default Favorites