import React, { useContext, useEffect, useState } from 'react'
import { StandingsTable, FixtureTable, FixtureArrows, FixtureButtons, Bracket, ScorersTable } from '../components'
import { DataContext } from '../context/DataContext'
import '../src/styles/Home.css'

const Home = () => {
  const data = useContext(DataContext)
  const [tablas, setTablas] = useState(false)


  useEffect(() => {
    if (data.tablas) {
      setTablas(data.tablas)
    }
  }, [data.tablas])



  if (data.cargando) {
    return (
      <div> Cargando...</div>
    )
  } 
  
  if (data.error || !tablas) {
    return (
      <div style={{padding:"15px"}}>
        <h2>Ha ocurrido un error</h2>
        <div style={{color:"gray"}}>{data.error.message}</div>
      </div>
    )
  }

  return (
    <div className='main-container'>



      <>
        <div className='upper-container'>
          <div className="standings-tables-container">

            <StandingsTable tabla={tablas.info_tabla_1} zona="A" />
            <StandingsTable tabla={tablas.info_tabla_2} zona="B" />

          </div>

          <div className="fixture-table-container">
            <div className="fixture-table-container-header">
              <FixtureButtons />
              <FixtureArrows />
            </div>
            <FixtureTable />
          </div>
        </div>

        <div className="bracket-container">
          {
            tablas ?
              <Bracket tablas={tablas} />
              :
              <></>
          }
        </div>

        
      </>

    </div>


  )
}

export default Home