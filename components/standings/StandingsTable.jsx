import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import TeamRow from './TeamRow'
import '../../src/styles/StandingsTable.css'
import c from '../../src/styles/colors'
import { DataContext } from '../../context/DataContext'

const StandingsTable = (props) => {

const [tabla, setTabla] = useState([])

useEffect(() => {
  setTabla(props.tabla)  
  
}, [props.tabla])




  return (
    <div className="standings-table">
      <div className='standings-title' style={{color:c.light_1}}>Zona {props.zona}</div>
      <Table bordered  variant='dark' >
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Pts</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>Dif</th>
          </tr>
        </thead>
        <tbody>

          {
            tabla.map((equipo,i)=>(
              <TeamRow equipo={equipo} key={i}/>
            ))
          }

        </tbody>
      </Table>
    </div>

  )
}

export default StandingsTable