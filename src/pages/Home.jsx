import React, {useState, useEffect} from 'react'
import Header from '../components/ui/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cocktails from '../components/Cocktails';


function Home({ingredient, setIngredient, fetchCockTails, cockTails, loading}) {

    function setDrinkIngredient(ingredient) {
        setIngredient(ingredient)
    }

    function getCockTails(event) {
        event.preventDefault();
        fetchCockTails();
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
                                onChange={(event) => setDrinkIngredient(event.target.value)}
                                />
                            </div>
                            <div className="form__item">
                                <button className="btn btn__search" onClick={(event) => getCockTails(event)} type="submit">
                                <FontAwesomeIcon icon={'magnifying-glass'} />
                                </button>
                            </div>
                        </form>
                       
                    </div>

                    <i className="fa-solid fa-martini-glass search__loader"></i>
                    <div className="drinks__list">

                        
                        {loading ? new Array(4).fill(0).map((_, index) => (
                            <div className="drink drink--skeleton" key={index}>
                            </div>
                        )) : (cockTails.length > 0 ? (<Cocktails cockTails={cockTails} ingredient={ingredient}/>) : (  <figure className="search__img--wrapper">
                            <img src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" alt="" className="search__img" />
                        </figure>))}
                        
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