import React, { useContext, useEffect, useState } from 'react'


import {Date,Zone,Match} from '../index'

import { DataContext } from '../../context/DataContext'


const FixtureTable = (props) => {
    const data = useContext(DataContext)
    
    const [rowsArray, setRowsArray] = useState(null)

    useEffect(() => {
        if (data.obj) {
            let fecha_actual = parseInt(data.obj.fecha_actual)
            data.setSelected(fecha_actual)
        }
    }, [data.obj])

    useEffect(() => {
        if (data.obj && data.selected) {

            let arr = []
            let dia = ""
            let zona = ""

            data.obj.fechas[data.selected - 1].partidos.forEach(partido => {
                let zona_actual = (partido.zona_local === partido.zona_visitante ? partido.zona_local : "")
                if (zona_actual != zona) {
                    arr.push(zona_actual)
                }
                if (partido.dia != dia) {
                    arr.push(partido.dia)
                    dia = partido.dia

                }
                zona = zona_actual
                arr.push(partido)
            })

            setRowsArray(arr)
        }


    }, [data.selected, data.obj])

    return (
        
        // <div className='fixture-table'>
        //     <Table bordered variant='dark'>
        //         <tbody>
        //         {
        //                 rowsArray ?
        //                     rowsArray.map((row, i) => {
        //                         if (typeof (row) === "number"){
        //                             return (<ZoneRow key={i} zone={row} />)
        //                         }
        //                         else if (typeof (row) === "string")
        //                             return (<DateRow key={i} date={row} />)
        //                         else
        //                             return (
        //                                     <MatchRow key={i} match={row} />

        //                             )
        //                     })
        //                     :
        //                     <></>
        //             }
        //         </tbody>
        //     </Table>
        // </div>

        <div className='fixture_container'>
            {
                        rowsArray ?
                            rowsArray.map((row, i) => {
                                if (typeof (row) === "number"){
                                    return (<Zone key={i} zone={row} />)
                                }
                                else if (typeof (row) === "string")
                                    return (<Date key={i} date={row} />)
                                else
                                    return (
                                            <Match key={i} match={row} />

                                    )
                            })
                            :
                            <></>
        }
        </div>


        
    )
}

export default FixtureTable