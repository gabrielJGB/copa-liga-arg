import React from 'react'
import Table from 'react-bootstrap/Table'
import TeamRow from './TeamRow'

const StandingsTable = (props) => {


  return (
    <div className="standings-table_container">
      <div className='standings-table_title' >
        Zona {props.zona}
      </div>
      <Table bordered variant='dark' >
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
            props.tabla.map((equipo, i) => (
              <TeamRow equipo={equipo} key={i} />
            ))
          }

        </tbody>
      </Table>
    </div>

  )
}

export default StandingsTable