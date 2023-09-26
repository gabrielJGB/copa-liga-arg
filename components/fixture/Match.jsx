import React, { useContext, useEffect, useState } from 'react'
import { Cronometro, Equipo, Goles, Autores } from '../index'
import { DataContext } from '../../context/DataContext'

const Match = (props) => {
    const data = useContext(DataContext)
    const [matchInfoVisible, setMatchInfoVisible] = useState(false)



    return (
        <div className="fixture_match-container">
            <div className="fixture_match">
                <Cronometro estado={props.match.estado} cronometro={props.match.cronometro} />
                <Equipo escudo={props.match.escudo_local} equipo={props.match.local} rojas={props.match.rojas_local} />
                <Goles goles={props.match.goles_local} />
                <Goles goles={props.match.goles_visitante} />
                <Equipo escudo={props.match.escudo_visitante} equipo={props.match.visitante} rojas={props.match.rojas_visitante} />
                <button
                    disabled={props.match.estado != "no empezado" ? false : true}
                    className='fixture_match-button'
                    onClick={() => { setMatchInfoVisible(prev => prev ? false : true) }}>
                    {
                        matchInfoVisible ? "-" : "+"
                    }
                </button>


            </div>


            <div style={{ maxHeight: (matchInfoVisible ? "100px" : null) }} className="fixture_match-info">

                {
                    props.match.estado === "finalizado" && !props.match.goles_local && !props.match.goles_visitante ?
                        <></>
                        :
                        <>
                            <Autores autores={props.match.autores_local} />
                            <Autores autores={props.match.autores_visitante} />
                        </>

                }


                {
                    props.match.video_id != "" ?
                        <button
                            onClick={() => data.setMatchDisplay(props.match.video_id)}
                            className='fixture_button-resumen'>Ver resumen</button>
                        :
                        <></>

                }


            </div>

        </div>
    )
}

export default Match