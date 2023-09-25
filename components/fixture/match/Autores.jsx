import React from 'react'
import ball from '../../../src/assets/ball.png'

const Autores = (props) => {
    return (
        <div className="fixture_autores-container">

            {
                        props.autores.map((nombre, i) => {

                            if (nombre != "")
                                return (
                                    <div className='fixture_autor' key={i}>
                                        <img src={ball} width={15} height={15} />
                                        <div >{nombre}</div>
                                    </div>)
                            else {
                                return ""
                            }
                        
                        })
                    }
        </div>
    )
}

export default Autores