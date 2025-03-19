import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cocktail({addFavorite}) {

    const { id } = useParams();
    const [cockTail, setCockTail] = useState({});
    const [ingredients, setIngredients] = useState([]);

    function addFaveCocktail(id) {
        addFavorite(id)
    }

    async function fetchCockTail() {

        const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        console.log(data.drinks[0]);
        
        setCockTail(data.drinks[0]);
        console.log(cockTail);
        // setLoading(false);
       getIngredientsList(data.drinks[0]);
       console.log(ingredients);

    }

    useEffect(() => {
        fetchCockTail()
    }, [])

    function getIngredientsList(cockTailArr) {
        for(let i=1; i<=15; i++) {
            
            if(cockTailArr['strIngredient' + i]) {
                console.log(cockTailArr['strIngredient' + i]);
                setIngredients(ingredients => [...ingredients, cockTailArr['strIngredient' + i]]);  
            }
            
        }
    }

  
  
  return (
        <div>
            <Link to="/" className="btn">Back</Link>
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
                {/* <i id="heart-${cockTail.idDrink}" className="favorite fa-solid fa-heart click"></i> */}
                <FontAwesomeIcon icon="heart" onClick={() => addFaveCocktail(cockTail.idDrink)}/>
            </div>
        </div>
  )
}

export default Cocktail