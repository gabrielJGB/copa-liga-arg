import React, { useEffect, useState } from 'react'

const Cronometro = (props) => {
  
  const getClassName = (estado)=>{
    return (estado === "jugando" || estado === "finalizado")? "fixture_cronometro-"+estado :  "" ;
  }

  return (
    <div className={getClassName(props.estado)}>{props.cronometro}</div>
  )
}

export default Cronometro