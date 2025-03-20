import React from 'react'
import logo from '../../assets/cocktail_logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/init';
import { signOut } from 'firebase/auth';

function Nav({user, setUser}) {

function logout() {
    signOut(auth);
    setUser(null);
 }

  return (
    <nav>

            <div className="row nav__row">
                <figure className="logo__wrapper">
                    <img src={logo} alt="" className="logo__img" />
                    <span className="logo__text">CocktailFinder</span>
                </figure>
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/" className="nav__link">Find your cocktail</Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/favorites" className="nav__link">Favorites</Link>
                    </li>
                    {user && <li className="nav__item">
                        <span onClick={logout} className="user__icon">{user.email[0].toUpperCase()}</span>
                    </li>}
                    
                </ul>
               
            </div>
        </nav>
  )
}

export default Nav

