import React from 'react'

function Header({title, subtitle}) {
  return (
    <header>
        <div className="container">
        
                <h1 className="title">{title}</h1>
                {subtitle && <h2 className="subtitle">{subtitle}</h2>}

        </div>
    </header>
  )
}

export default Header