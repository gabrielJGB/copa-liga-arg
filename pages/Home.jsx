import React, { useContext, useEffect, useState } from 'react'
import { StandingsTable, Fixture, FixtureArrows, FixtureButtons, Bracket, MatchModal, Historial } from '../components'
import { DataContext } from '../context/DataContext'

import Table from 'react-bootstrap/Table'
const Home = () => {
  const data = useContext(DataContext)

  useEffect(() => {
    let body = document.querySelector("body")
    if(data.matchDisplay){
        body.style.overflow = "hidden"
    }else{
        body.style.overflow = ""
    }


  }, [data.matchDisplay])
  


  if (data.cargando) {
    return (
      <div style={{padding:"20px"}}> Cargando...</div>
    )
  }



  return (
    <div className="home_container">

      {
        data.error ?
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
              <MatchModal match={data.matchDisplay}/>
              :
              <></>
            }

            <Historial />

          </>

      }


    </div>

  )
}

export default Home