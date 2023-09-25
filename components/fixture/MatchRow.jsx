import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import '../../src/styless/MatchRow.css'
import ball from '../../src/assets/ball.png'

const MatchRow = (props) => {
    const data = useContext(DataContext)
    const [class_name, set_class_name] = useState("")
    const [displayInfo, setDisplayInfo] = useState(false)

    useEffect(() => {

    }, [data])




    const get_td_1 = () => {


        return (
            <td className={props.match.estado === "jugando" ? "cronometro" : (props.match.estado === "finalizado" ? "fin" : "")} style={{ width: "10%" }}>{props.match.cronometro}</td>
        )
    }
    const td_div_style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

    }

    const td_style = {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    }

    const red_card_box = {
        display: "flex",
        flexDirection: "row",

        gap: "2px"
    }

    const img_size = 16

    const get_td_equipo = (equipo, escudo, rojas) => {



        return (
            <td style={td_style}>

                <div></div>
                <div style={td_div_style}>
                    <img style={{ width: img_size, height: img_size }} src={"https://www.promiedos.com.ar/" + escudo} alt={equipo} />
                    <div>
                        {equipo}
                    </div>
                </div>
                <div style={red_card_box}>


                    {
                        Array(rojas).fill("").map((r, i) => (
                            <div key={i} className="red-card"></div>
                        ))
                    }

                </div>
            </td>
        )
    }

    const get_td_3 = () => {
        return (
            <td style={{ fontSize: 13, width: "8%" }}>{props.match.goles_local}</td>
        )
    }

    const get_td_4 = () => {
        return (
            <td style={{ fontSize: 13, width: "8%" }}>{props.match.goles_visitante}</td>
        )
    }



    return (
        <>
            <tr className="match-row">

                {get_td_1()}
                {get_td_equipo(props.match.local, props.match.escudo_local, props.match.rojas_local)}
                {get_td_3()}
                {get_td_4()}
                {get_td_equipo(props.match.visitante, props.match.escudo_visitante, props.match.rojas_visitante)}
                <td onClick={() => { setDisplayInfo(prev => prev ? false : true) }} className="info-button">
                    {
                        displayInfo ? " - " : " + "

                    }
                </td>
            </tr>
            <tr style={{backgroundColor:"0f3c3d", display: (!displayInfo || (!(props.match.goles_local) && !(props.match.goles_visitante)) ? "none" : "table-row") }} >
                <td colSpan={3}>
                    {
                        props.match.autores_local.map((autores, i) => {

                            if (autores != "")
                                return (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "3px" }}>
                                        <img src={ball} />
                                        <div key={i}>{autores}</div>
                                    </div>)
                            else {
                                return ""
                            }
                        
                        })
                    }
                </td>
                <td style={{textAlign: "center" }} colSpan={3}>
                    {
                        props.match.autores_visitante.map((autores, i) => {

                            if (autores != "")
                                return (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "3px" }}>
                                        <img src={ball} />
                                        <div key={i}>{autores}</div>
                                    </div>)
                            else {
                                return ""
                            }
                        })
                    }
                </td>
            </tr>
            <tr style={{
                display: (displayInfo && props.match.video_id != "" ? "table-row" : "none"),
                padding: "0 !important"
            }}
            >
                <td style={{ textAlign: "center" }} colSpan={6}>
                    <button className='resumen-btn'>Ver resumen</button>
                </td>
            </tr>

        </>
    )
}


export default MatchRow