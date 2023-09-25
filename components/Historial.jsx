import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { TeamHistorial } from './index'

const Historial = () => {
    const data = useContext(DataContext)
    const [historyArr, setHistoryArr] = useState([])

    useEffect(() => {
        let fullArr = []
        data.obj.fechas.forEach(fecha => {
            let arr = fecha.partidos.filter(partido => partido.local === data.selectedTeam.equipo || partido.visitante === data.selectedTeam.equipo)

            if (arr.length > 0) {
                fullArr.push(arr[0])
            }

        })
        setHistoryArr(fullArr)
    }, [data.selectedTeam])


    return (
        <div
            style={{ transform: `translateX(${data.openHistory ? "0" : "115%"})` }}
            className='historial_container'
        >

            <div className="historial_header">
                <div className="historial_header_equipo">
                    <img src={"https://www.promiedos.com.ar/" + data.selectedTeam.escudo} alt="" />
                    <div>{data.selectedTeam.equipo}</div>
                </div>
                <div>
                    <button className='historial_header_team-button' onClick={() => { }}>Plantel</button>
                    <button className='historial_header_close-button' onClick={() => { data.setOpenHistory(false) }}>Cerrar</button>
                </div>
            </div>


            <div className="historial_body">

                {
                    historyArr ?
                        <TeamHistorial selectedTeam={data.selectedTeam} arr={historyArr} />
                        :
                        <></>

                }

            </div>

        </div>
    )
}

export default Historial