import React from 'react'

const TeamHistorial = (props) => {

    const getResultColor = (match) => {

        if (match.estado != "no empezado") {
            if (match.local === props.selectedTeam.equipo && match.resultado === "L" || match.visitante === props.selectedTeam.equipo && match.resultado === "V") {
                return "#0c7c0c"
            } else if (match.visitante === props.selectedTeam.equipo && match.resultado === "L" || match.local === props.selectedTeam.equipo && match.resultado === "V") {
                return "#c70202"
            } else if (match.resultado === "E") {
                return "#d7d705"
            }
        }
    }

    const formatDate = (date) => {

        let day = date.match(/\d+/)
        let fechaLower = date.toLowerCase()
        if (day) {


            let month

            if (fechaLower.includes("enero")) {
                month = 1
            } else if (fechaLower.includes("febrero")) {
                month = 2
            } else if (fechaLower.includes("marzo")) {
                month = 3
            } else if (fechaLower.includes("abril")) {
                month = 4
            } else if (fechaLower.includes("mayo")) {
                month = 5
            } else if (fechaLower.includes("junio")) {
                month = 6
            } else if (fechaLower.includes("julio")) {
                month = 7
            } else if (fechaLower.includes("agosto")) {
                month = 8
            } else if (fechaLower.includes("septiembre")) {
                month = 9
            } else if (fechaLower.includes("octubre")) {
                month = 10
            } else if (fechaLower.includes("noviembre")) {
                month = 11
            } else if (fechaLower.includes("diciembre")) {
                month = 12
            }


            return day + "/" + month
        }
        else if (fechaLower === "a confirmar") {
            return "-"
        } else {
            return "Susp."
        }
    }


    return (
        <>
            {
                props.arr.map((match, i) => (
                    <div 
                    
                    className={`historial_row ${(match.estado==="jugando"?"historial_jugando":"")}`} key={i}>
                        <div 
                        
                        className="historial_row_fecha-num">{i + 1}</div>
                        <div className="historial_row_dia">{formatDate(match.dia)}</div>
                        <div className="historial_row_lov">
                            {
                                match.local === props.selectedTeam.equipo ? "L" : "V"
                            }
                        </div>
                        <div className="historial_row_equipo">

                            {match.local === props.selectedTeam.equipo ?
                                (<>
                                    <img style={{ marginRight: 5 }} src={"https://www.promiedos.com.ar/" + match.escudo_visitante} />
                                    <div className="historial_row_equipo_nombre">{match.visitante}</div>
                                </>
                                )
                                :
                                (<>
                                    <img style={{ marginRight: 5 }} src={"https://www.promiedos.com.ar/" + match.escudo_local} />
                                    <div className="historial_row_equipo_nombre">{match.local}</div>
                                </>
                                )}


                        </div>
                        <div 
                            style={{ color: (getResultColor(match) === "#d7d705" ? "black" : "white"), backgroundColor: (getResultColor(match)) }}
                            className="historial_row_resultado">
                        {match.local ===  props.selectedTeam ?
                                                    (match.goles_local + "-" + match.goles_visitante)
                                                    :
                                                    (match.goles_visitante + "-" + match.goles_local)
                                                }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default TeamHistorial


{/* <div className="historial_row">
                    <div className="historial_row_fecha-num">1</div>
                    <div className="historial_row_dia">22/09</div>
                    <div className="historial_row_lov">V</div>
                    <div className="historial_row_equipo">
                        <img src="https://www.promiedos.com.ar/images/18/17.png" alt="" />
                        <div className="historial_row_equipo_nombre">Racing Club</div>
                    </div>
                    <div className="historial_row_resultado">7-7</div>
                </div> */}