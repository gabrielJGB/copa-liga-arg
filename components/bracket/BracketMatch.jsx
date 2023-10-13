import React, { useEffect, useState } from 'react'


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
        <div className={"bracket_match "+"bracket_match"+props.matchId} >
            <div className="bracket_team">
                <div className="bracket_team-box">
                <img className="bracket_img" src={"https://www.promiedos.com.ar/"+props.local.escudo} width={img_size} height={img_size}/>
                    <div className="bracket_name bracket_local-name">{props.local.equipo}</div>
                </div>
                <div className="bracket_result bracket_result-local">-</div>
            </div>

            <div className="bracket_team">
                <div className="bracket_team-box">
                <img className="bracket_img" src={"https://www.promiedos.com.ar/"+props.visitante.escudo} width={img_size} height={img_size}/>
                    <div className="bracket_name bracket_away-name">{props.visitante.equipo}</div>
                </div>
                <div className="bracket_result bracket_result-visitante">-</div>
            </div>
        </div>
    )
}

export default BracketMatch