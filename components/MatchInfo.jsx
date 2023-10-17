import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'

import ball from '../src/assets/ball.png'
import arrow_in from '../src/assets/arrow_in.png'
import arrow_out from '../src/assets/arrow_out.png'
import lesion_img from '../src/assets/lesion.png'

const MatchInfo = (props) => {
    const data = useContext(DataContext)
    const [partido, setPartido] = useState(data.infoPartidos.find(partido => partido.id_partido === props.id))
    const [colores, setColores] = useState(false)
    const [displaySeccion1, setDisplaySeccion1] = useState("block")
    const [displaySeccion2, setDisplaySeccion2] = useState("block")
    const [displaySeccion3, setDisplaySeccion3] = useState("block")
    const [playerShow, setPlayerShow] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState(false)
    const [playerObj, setPlayerObj] = useState(false)


    useEffect(() => {
        setColores({
            "local": partido.local.colores,
            "visitante": partido.visitante.colores,
        })
        // console.log(partido)
    }, [])


    useEffect(() => {

        let player_obj = false

        if (selectedPlayer) {
            player_obj = data.planteles.find(equipo => equipo.equipo === selectedPlayer.equipo)?.jugadores.find(jugador => jugador.numero === selectedPlayer.numero)

            if (player_obj) {
                player_obj.altura = selectedPlayer.altura
                player_obj.esCapitan = selectedPlayer.esCapitan
                player_obj.rojas = selectedPlayer.rojas
                player_obj.amarillas = selectedPlayer.amarillas
                player_obj.goles = selectedPlayer.goles
                player_obj.lesion = selectedPlayer.lesion
                player_obj.cambio_in = selectedPlayer.cambio_in
                player_obj.cambio_out = selectedPlayer.cambio_out

                setPlayerObj(player_obj)
            }else{
                setPlayerShow(false)
            }

        }
    }, [selectedPlayer])


    useEffect(() => {

        if (!playerShow) {
            setSelectedPlayer(false)
            setPlayerObj(false)
        }

    }, [playerShow])




    const icono_roja = (w, h) => {
        return (
            <div style={{ width: w, height: h, backgroundColor: "#d10000" }}></div>
        )
    }

    const icono_amarilla = (w, h) => {
        return (
            <div style={{ width: w, height: h, backgroundColor: "#efff00" }}></div>
        )
    }

    const icono_flecha_in = (w, h) => {
        return (
            <img src={arrow_in} width={w} height={h} />
        )
    }


    const icono_flecha_out = (w, h) => {
        return (
            <img src={arrow_out} width={w} height={h} />
        )
    }

    const icono_gol = (w, h) => {
        return (
            <img src={ball} width={w} height={h} />
        )
    }

    const icono_lesion = (w, h) => {
        return (
            <img src={lesion_img} width={w} height={h} />
        )
    }

    const get_jugador_elem = (jugador, i) => {

        // let color_nombre = ""
        // if(jugador.cambio_in){
        //     color_nombre = "#00ff00"
        // }else if(jugador.cambio_out){
        //     color_nombre = "#ff6565"
        // }


        let bcolor = ""
        if (jugador.posicion === "ARQ") {
            bcolor = "#b5691b"
        } else if (jugador.posicion === "DEF") {
            bcolor = "#166db9"
        } else if (jugador.posicion === "MED") {
            bcolor = "#128d2d"
        } else if (jugador.posicion === "DEL") {
            bcolor = "#a30d0d"
        }


        return (
            <div
                onClick={() => {
                    setPlayerShow(prev => prev ? true : "-")
                    setSelectedPlayer(jugador)
                }}
                key={i} className="jugador"
                style={{ borderColor: bcolor }}>

                <div className='jugador-left'>
                    <div
                        className={"numero" + (jugador.esCapitan ? " capitan" : "")}>
                        {jugador.numero}
                    </div>

                    <div className="bandera">
                        <img src={"http://promiedos.com.ar/" + jugador.pais} />
                    </div>

                    <div className="nombre">
                        <span >{jugador.nombre}</span>
                        {
                            jugador.cambio_in ? icono_flecha_in(7, 10) : <></>
                        }
                        {
                            jugador.cambio_out ? icono_flecha_out(7, 10) : <></>
                        }
                    </div>
                </div>


                <div className="icons">

                    {
                        jugador.lesion ? icono_lesion(12, 12) : <></>
                    }
                    {
                        Array(jugador.amarillas).fill("").map((r, i) => (
                            icono_amarilla(8, 13)
                        ))
                    }
                    {
                        Array(jugador.rojas).fill("").map((r, i) => (
                            icono_roja(8, 13)
                        ))
                    }
                    {
                        Array(jugador.goles).fill("").map((r, i) => (
                            icono_gol(17, 17)
                        ))
                    }

                </div>
            </div>
        )

    }

    const get_text_elem = (text) => {

        if (text.includes("Lesion")) {
            text = text.replace(" (Lesion)", "")
            return (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                    {icono_lesion(12, 12)}
                    <span>{text}</span>
                </div>
            )

        } else {
            return text
        }

    }

    const get_icon_incidencia = (tipo) => {

        if (tipo === "amarilla") {
            return (
                icono_amarilla(9, 13)
            )

        } else if (tipo === "roja") {
            return (
                icono_roja(9, 13)
            )

        } else if (tipo === "cambio") {
            return (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 4 }}>

                    {icono_flecha_in(16, 11)}
                    {icono_flecha_out(16, 11)}

                </div>
            )

        } else if (tipo === "gol") {
            return (icono_gol(17, 17))
        }
    }


    if (!partido || !colores) {
        return (
            <></>
        )
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
                    <div>{"-"}</div>
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

                <div className="match-info_formaciones">
                    <h4 onClick={() => {
                        setDisplaySeccion1(prev => prev == "block" ? "none" : "block")
                    }} >
                        FORMACIONES
                    </h4>

                    <div style={{ display: displaySeccion1 }} className="match-info_seccion">

                        <div className="titulares">
                            <h5>TITULARES</h5>
                            <div className="contenedor">
                                <div className="local">

                                    {
                                        partido.local.datos.titulares.map((jugador, i) => (
                                            get_jugador_elem(jugador, i)
                                        ))
                                    }

                                    <div className="jugador"> DT: {partido.local.datos.tecnico}</div>
                                </div>
                                <div className="visitante">

                                    {
                                        partido.visitante.datos.titulares.map((jugador, i) => (
                                            get_jugador_elem(jugador, i)
                                        ))
                                    }
                                    <div className="jugador">
                                        {"DT:" + partido.visitante.datos.tecnico}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="suplentes">
                            <h5>SUPLENTES</h5>
                            <div className="contenedor">
                                <div className="local">
                                    {
                                        partido.local.datos.suplentes.map((jugador, i) => (
                                            get_jugador_elem(jugador, i)
                                        ))
                                    }
                                </div>
                                <div className="visitante">
                                    {
                                        partido.visitante.datos.suplentes.map((jugador, i) => (
                                            get_jugador_elem(jugador, i)
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="match-info_estadisticas">
                    <h4 onClick={() => {
                        setDisplaySeccion2(prev => prev == "block" ? "none" : "block")
                    }} >
                        ESTADÍSTICAS
                    </h4>

                    <div style={{ display: displaySeccion2 }} className="match-info_seccion">
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
                </div>

                <div className="match-info_incidencias">
                    <h4 onClick={() => {
                        setDisplaySeccion3(prev => prev == "block" ? "none" : "block")
                    }} >
                        CRONOLOGÍA
                    </h4>

                    <div style={{ display: displaySeccion3 }} className="match-info_seccion">
                        {
                            partido.incidencias.map((elem, i) => (

                                <div key={i} className="incidencia">
                                    <div style={{ padding: 7, backgroundColor: (elem.equipo === "local" ? "#1a1e2e" : "") }} className="local inc">
                                        {
                                            elem.equipo === "local" ?
                                                <>
                                                    <div></div>
                                                    <div className="jugador">
                                                        {
                                                            elem.jugador.map((el, i) => (
                                                                <div key={i}>{get_text_elem(el)}</div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="icon">
                                                        {get_icon_incidencia(elem.tipo)}
                                                    </div>
                                                </>
                                                :
                                                <></>
                                        }

                                    </div>
                                    <div className="minuto">{elem.minuto + "'"}</div>
                                    <div style={{ padding: 7, backgroundColor: (elem.equipo === "visitante" ? "#1a1e2e" : "") }} className="visitante inc">

                                        {
                                            elem.equipo === "visitante" ?
                                                <>
                                                    <div className="icon">
                                                        {get_icon_incidencia(elem.tipo)}
                                                    </div>
                                                    <div className="jugador">
                                                        {
                                                            elem.jugador.map((el, i) => (
                                                                <div key={i}>{get_text_elem(el)}</div>
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

            <div
                onClick={() => { setPlayerShow(prev => prev ? false : true) }}
                style={{ height: (playerShow ? "40%" : "0") }}
                className="match-info_player"
            >
                {
                    playerObj ?
                        <>
                            <img className='img' src={playerObj.foto_medium} alt={playerObj.nombre} />
                            <div>
                                <h3>{playerObj.nombre}</h3>
                                <div> {playerObj.pos_detalle} </div>
                                <div>{playerObj.edad + " años"}</div>
                                {
                                    playerObj.altura != "-" ?
                                        <div>{playerObj.altura + " cm"}</div>
                                        :
                                        <></>
                                }
                                <div>{playerObj.valor}</div>
                                <div>
                                    {playerObj.nacionalidad.map((n, i) => (
                                        <img style={{ paddingRight: 4 }} key={i} src={n.bandera} alt={n.pais} />
                                    ))}
                                </div>
                            </div>
                        </>
                        :
                        <></>
                }
                <div></div>
            </div>
        </div>
    )
}

export default MatchInfo