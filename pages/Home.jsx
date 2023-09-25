import React, { useContext, useEffect, useState } from 'react'
import { StandingsTable, Fixture, FixtureArrows, FixtureButtons, Bracket, ScorersTable, MatchModal } from '../components'
import { DataContext } from '../context/DataContext'


const Home = () => {
  const data = useContext(DataContext)


  if (data.cargando) {
    return (
      <div style={{padding:"20px"}}> Cargando...</div>
    )
  }



  return (
    <div className="home_container">

      {
        data.error || !data.tablas ?
          <h3 className='home_error'>Ha ocurrido un error :(</h3>
          :

          <>
            <div className="home_main-container">
              <div className="home_table-container">
                <StandingsTable tabla={data.tablas.info_tabla_1} zona="A" />
                <StandingsTable tabla={data.tablas.info_tabla_2} zona="B" />
              </div>
              <div className='home_fixture-container'>
                <FixtureButtons />
                <FixtureArrows />
                <Fixture />
              </div>
            </div>

            <div className='home_bracket-container'>
              <Bracket tablas={data.tablas} />
            </div>


            {
              data.matchDisplay?
              <MatchModal id={data.matchDisplay}/>
              :
              <></>
            }
          </>

      }

    </div>

  )
}

export default Home