import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import '../../src/styles/TeamRow.css'

const TeamRow = (props) => {
    const data = useContext(DataContext)
    const [color,setColor] = useState("")




    useEffect(() => {
        if (data.obj) {
            data.obj.fechas.forEach(fecha => {
                fecha.partidos.forEach(partido => {
                    console.log()
                    if (partido.estado === "jugando" && (partido.local === props.equipo.equipo || partido.visitante === props.equipo.equipo)) {


                        if (partido.resultado === "L" && partido.local === props.equipo.equipo || partido.resultado === "V" && partido.visitante === props.equipo.equipo) {
                            setColor("#00ff00")
                        } else if (partido.resultado === "V" && partido.local === props.equipo.equipo || partido.resultado === "L" && partido.visitante === props.equipo.equipo) {
                            setColor("#ff0000")
                        } else if (partido.resultado === "E") {
                            setColor("#ffd400")
                        } else {
                            setColor("white")
                        }


                    }
                })
            })
        }
    })


    // useEffect(() => {
    //     if (data.obj) {

    //         getColor(props.equipo.equipo)

    //     }
    // }, [data])

    // const getColor = (equipo) => {

    //     data.obj.fechas.forEach(fecha => {
    //         fecha.partidos.forEach(partido => {
    //             console.log()
    //             if (partido.estado === "jugando" && (partido.local === equipo || partido.visitante === equipo)) {


    //                 if (partido.resultado === "L" && partido.local === equipo || partido.resultado === "V" && partido.visitante === equipo) {
    //                     setColor("#00ff00")
    //                 } else if (partido.resultado === "V" && partido.local === equipo || partido.resultado === "L" && partido.visitante === equipo) {
    //                     setColor("#ff0000")
    //                 } else if (partido.resultado === "E") {
    //                     setColor("#ffd400")
    //                 } else {
    //                     setColor("white")
    //                 }


    //             }
    //         })
    //     })

    // }

    const isPlaying = (equipo) => {
        let playing = data.obj.fechas.filter(fecha => fecha.partidos.some(partido => (partido.estado === "jugando") && (partido.local === equipo || partido.visitante === equipo)))
        return playing.length ? true : false
    }


/*

export default function App() {
  const inputRef = useRef();

  const imprimirValor = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input type="text" placeholder="nombre" ref={inputRef} />
      <button onClick={imprimirValor}>mostrar</button>
    </div>
    
  );
}


*/ 

    return (
        <tr className="team-row" >
            <td>{props.equipo.posicion}</td>
            <td style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
                <img style={{ marginInline: 5, }} src={"https://www.promiedos.com.ar/" + props.equipo.escudo} alt={props.equipo} />
                {props.equipo.equipo}
                <span
                    className='dot'
                    style={{
                        display: (isPlaying(props.equipo.equipo) ? "" : "none"),
                        backgroundColor: (color)
                    }}
                ></span>
            </td>
            <td style={{fontWeight:"bold"}}>{props.equipo.puntos}</td>
            <td>{props.equipo.PJ}</td>
            <td>{props.equipo.PG}</td>
            <td>{props.equipo.PE}</td>
            <td>{props.equipo.PP}</td>
            <td>{props.equipo.GF}</td>
            <td>{props.equipo.GC}</td>
            <td>{props.equipo.dif > 0 ? "+" : ""}{props.equipo.dif}</td>
        </tr>
    )
}

export default TeamRow