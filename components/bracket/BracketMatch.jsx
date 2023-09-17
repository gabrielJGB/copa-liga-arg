import React, { useEffect, useState } from 'react'
import '../../src/styles/BracketMatch.css'

const BracketMatch = (props) => {
    const img_size = 15
    const [local, setLocal] = useState({"equipo":"","escudo":""})
    const [visitante, setVisitante] = useState({"equipo":"","escudo":""})


    useEffect(() => {
        if(props.local && props.visitante){
            setLocal({"equipo":props.local.equipo,"escudo":props.local.escudo})
            setVisitante({"equipo":props.local.equipo,"escudo":props.local.escudo})
        }
    }, [props])
    


    
    return (
        <div className={"match "+"match"+props.matchId} >
            <div className="team">
                <div className="team-box">
                <img className="img" src={"https://www.promiedos.com.ar/"+props.local.escudo} width={img_size} height={img_size}/>
                    <div className="name local-name">{props.local.equipo}</div>
                </div>
                <div className="result result-local">-</div>
            </div>

            <div className="team">
                <div className="team-box">
                <img className="img" src={"https://www.promiedos.com.ar/"+props.visitante.escudo} width={img_size} height={img_size}/>
                    <div className="name away-name">{props.visitante.equipo}</div>
                </div>
                <div className="result result-visitante">-</div>
            </div>
        </div>
    )
}

export default BracketMatch