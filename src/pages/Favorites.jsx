import React from 'react'
import Header from '../components/ui/Header'

function Favorites() {
  return (
    <>
         <Header title="Your Favorites Cocktails"  />
         <main>
                <section id="favorites">
                    <div className="container">
                        <div className="row">
                            <div className="drinks__list">
                            
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
    </>
  )
}

export default Favorites