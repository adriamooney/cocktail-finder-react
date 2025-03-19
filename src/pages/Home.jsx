import React, {useState, useEffect} from 'react'
import Header from '../components/ui/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cocktails from '../components/Cocktails';
import axios from 'axios';

function Home() {

    const [cockTails, setCockTails] = useState([]);
    const [ingredient, setIngredient] = useState('');
    //const [loading, setLoading] = useState(true);
    
    async function fetchCocktails(event) {
        event.preventDefault();
        console.log(ingredient);
        const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        console.log(data.drinks);
     
            setCockTails(data.drinks);
            console.log(cockTails);
           // setLoading(false);

    
    }

  return (
    <div>
        <Header title="Get a great cocktail idea" subtitle="It's happy hour somewhere" />

        <main>
        <section id="search">
            <div className="container">
                <div className="row search__row">
                    <div className="form__wrapper">
                        <form action="" className="form">
                            <div className="form__item">
                                <input 
                                type="text" 
                                id="form__search--input" className="input" placeholder="Search by ingredient"
                                onChange={(event) => setIngredient(event.target.value)}
                                />
                            </div>
                            <div className="form__item">
                                <button className="btn btn__search" onClick={(event) => fetchCocktails(event)} type="submit">
                                <FontAwesomeIcon icon={'magnifying-glass'} />
                                </button>
                            </div>
                        </form>
                       
                    </div>

                    <i className="fa-solid fa-martini-glass search__loader"></i>
                    <div className="drinks__list">
                        <figure className="search__img--wrapper">
                            <img src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" alt="" className="search__img" />
                        </figure>
                        {cockTails.length > 0 ? (<Cocktails cockTails={cockTails}/>) : <></>}
                        
                    </div>
                    
                   
                </div>
            </div>
        </section> 
        <section id="drink_recipe">
            <div className="container">
                <div className="row recipe__row">
                   
                </div>
            </div>
        </section>
    </main>


    </div>
  )
}

export default Home