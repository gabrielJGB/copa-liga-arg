import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'

import ball from '../src/assets/ball.png'


const MatchInfo = (props) => {
    const data = useContext(DataContext)
    const [partido, setPartido] = useState(data.infoPartidos.find(partido => partido.id_partido === props.id))
    const [colores, setColores] = useState(false)

    useEffect(() => {
        setColores({
            "local": partido.local.colores,
            "visitante": partido.visitante.colores,
        })
        console.log(partido)
    }, [])




    if (!partido || !colores) {
        return (
            <></>
        )
    }


    const get_icon = (tipo) => {
        if (tipo === "amarilla") {
            return (
                <div style={{ "width": 7, "height": 11, "backgroundColor": "#efff00" }}></div>
            )

        } else if (tipo === "roja") {
            return (
                <div style={{ "width": 7, "height": 11, "backgroundColor": "#d10000" }}></div>
            )

        } else if (tipo === "cambio") {
            return (
                <div>
                    {/* <img src={arrow_in} width={15} height={15} /> */}
                </div>
            )

        } else if (tipo === "gol") {
            return (
                <img src={ball} width={15} height={15} />
            )
        } else {

        }

    }


    return (
        <div className='match-info_container'>

            <div className='match-info_header'>
                <div className="team">
                    <img src={"https://www.promiedos.com.ar/" + partido.local.escudo} alt={partido.local.nombre} width="20" height="20" />

                    <div className="team-name">
                        {partido.local.nombre}
                    </div>
                </div>

                <div className="score">
                    <div className="local">{partido.local.goles}</div>
                    <div>{" - "}</div>
                    <div className="visitante">{partido.visitante.goles}</div>

                </div>

                <div className="team">
                    <img src={"https://www.promiedos.com.ar/" + partido.visitante.escudo} alt={partido.visitante.nombre} width="20" height="20" />
                    <div className="team-name">
                        {partido.visitante.nombre}
                    </div>

                </div>

            </div>

            <div className='match-info_body'>

                <div className="match-info_estadisticas">
                    <h4>ESTADÍSTICAS</h4>

                    {
                        partido.estadisticas.map((elem, i) => (

                            <div key={i} className="estadistica">
                                <div className="titulo_estadistica">{elem.stat}</div>

                                <div className="barra_body">
                                    <div style={{ width: (elem.local_width + "%") }} className="barra_local">{elem.local_num + (elem.stat === "Posesión" ? "%" : "")}</div>

                                    <div style={{ width: (elem.visit_width + "%") }} className="barra_visitante">{elem.visit_num + (elem.stat === "Posesión" ? "%" : "")}</div>
                                </div>
                            </div>

                        ))

                    }

                </div>


                <div className="match-info_incidencias">
                    <h4>INCIDENCIAS</h4>
                    {
                        partido.incidencias.map((elem, i) => (

                            <div key={i} className="incidencia">
                                <div className="local inc">
                                    {
                                        elem.equipo === "local" ?
                                            <>
                                                <div></div>
                                                <div className="jugador">
                                                    {
                                                        elem.jugador.map((el, i) => (
                                                            <div key={i}>{el}</div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="icon">
                                                    {get_icon(elem.tipo)}
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }

                                </div>
                                <div className="minuto">{elem.minuto + "'"}</div>
                                <div className="visitante inc">

                                    {
                                        elem.equipo === "visitante" ?
                                            <>
                                                <div className="icon">
                                                    {get_icon(elem.tipo)}
                                                </div>
                                                <div className="jugador">
                                                    {
                                                        elem.jugador.map((el, i) => (
                                                            <div key={i}>{el}</div>
                                                        ))
                                                    }
                                                </div>
                                                <div></div>
                                            </>
                                            :
                                            <></>
                                    }


                                </div>
                            </div>
                        ))
                    }



                </div>

            </div>

        </div>
    )
}

export default MatchInfo