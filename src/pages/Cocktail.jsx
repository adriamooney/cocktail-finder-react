import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cocktails from '../components/Cocktails';
import { db } from '../firebase/init';
import {collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

function Cocktail({favorites, addFavorite, removeFavorite, cockTails, ingredient, user}) {

    const { id } = useParams();
    const [cockTail, setCockTail] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    function addFaveCocktail(id) {
        addFavorite(id);
        setIsFavorite(true);
    }

    function removeFaveCocktail(id) {
        removeFavorite(id);
        setIsFavorite(false);
    }


    async function getFavoriteFromDb(id) {
    const favoriteRef = await query(collection(db, 'favorites'), where("uid", "==", user.uid), where("idDrink", "==", id));
    const { docs }  = await getDocs(favoriteRef);

    const favoritesArr = docs.map(doc => doc.data());
    console.log(favoritesArr);
    if(favoritesArr.length > 0) {
        setIsFavorite(true);
    }
    
    }
    

    async function fetchCockTail() {

        const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        setCockTail(data.drinks[0]);
        // setLoading(false);
        getIngredientsList(data.drinks[0]);

    }

    useEffect(() => {
       //setIsFavorite(favorites.includes(id));
        getFavoriteFromDb(id);
        fetchCockTail();
        window.scrollTo(0, 0);
    }, [id])

    function getIngredientsList(cockTailArr) {
        for(let i=1; i<=15; i++) {
            
            if(cockTailArr['strIngredient' + i]) {
                console.log(cockTailArr['strIngredient' + i]);
                //need to check if in array, rerendering causes duplicates
                setIngredients(ingredients => [...ingredients, cockTailArr['strIngredient' + i]]);  
            }
            
        }
    }

  
  
  return (
    <>
        <div>
            <div className="recipe">
                <div className="recipe__info">
                    <h4 className="recipe__title">{cockTail.strDrink}</h4>
                    <div clas="recipe_description">
                        <p className="recipe__para">{cockTail.strInstructions}</p>
                        <p className="recipe__para">Serve in {cockTail.strGlass}.</p>
                        <h4 className="recipe__subtitle">Ingredients</h4>
                        <ul className="recipe__ingredients">
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <li key={index} className="recipe__ingredient">{ingredient}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <figure className="recipe__img--wrapper">
                    <img src={cockTail.strDrinkThumb} alt="" className="recipe__img" />
                </figure>

                {
                    
                    !isFavorite ? (<div onClick={() => addFaveCocktail(cockTail.idDrink)}><FontAwesomeIcon icon="heart" /></div>) : (<div className="saved" onClick={() => removeFaveCocktail(cockTail.idDrink)}><FontAwesomeIcon icon="heart"/></div>)
                    
                }
                
                
            </div>
        </div>

        {ingredient && <h2 className="title">More Cocktails with {ingredient}</h2>}
        
         <div className="drinks__list">
            
             <Cocktails cockTails={cockTails} />
        </div>
        </>
  )
}

export default Cocktail