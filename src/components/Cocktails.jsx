import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

function Cocktails({cockTails, ingredient}) {

    const navigate = useNavigate();
    return (

        <>
            {cockTails.map((cockTail) => {
                return (
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
        </>
    )
}

export default Cocktails