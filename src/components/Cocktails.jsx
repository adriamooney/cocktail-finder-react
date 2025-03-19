import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cocktails({cockTails}) {

    console.log(cockTails);
  return (

    <div>
        {cockTails.map((cockTail) => {
            <div class="drink click" id="drink-${cockTail.idDrink}" onClick="getFullRecipe(${cockTail.idDrink})">   
            <figure className="drink__img--wrapper">
                <h3 className="drink__title">${cockTail.strDrink}</h3>
                <img src="${cockTail.strDrinkThumb}" alt="" className="drink__img" />
                <div className="drink__overlay" >
                    <button className="btn drink__recipe--link"><FontAwesomeIcon icon="martini-glass"></FontAwesomeIcon> Full Recipe</button>
                </div>
            </figure>
        </div>
        })}
    </div>
  )
}

export default Cocktails