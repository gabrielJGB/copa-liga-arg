import React, { useContext, useEffect, useState } from 'react'
import '../../src/styless/Bracket.css'
import BracketMatch from './BracketMatch'
import { DataContext } from '../../context/DataContext'

const Bracket = (props) => {
  const data = useContext(DataContext)
  const [partido1, setPartido1] = useState({ "local": props.tablas.info_tabla_1[0], "visitante": props.tablas.info_tabla_2[3] })
  const [partido2, setPartido2] = useState({ "local": props.tablas.info_tabla_2[1], "visitante": props.tablas.info_tabla_1[2] })
  const [partido3, setPartido3] = useState({ "local": props.tablas.info_tabla_2[0], "visitante": props.tablas.info_tabla_1[3] })
  const [partido4, setPartido4] = useState({ "local": props.tablas.info_tabla_1[1], "visitante": props.tablas.info_tabla_2[2] })


  // useEffect(() => {
  //   console.log(props.tablas);
  // }, [props.tablas])
  

  useEffect(() => {
    if (props.tablas) {
      setPartido1({ "local": props.tablas.info_tabla_1[0], "visitante": props.tablas.info_tabla_2[3] })
      setPartido2({ "local": props.tablas.info_tabla_2[1], "visitante": props.tablas.info_tabla_1[2] })
      setPartido3({ "local": props.tablas.info_tabla_2[0], "visitante": props.tablas.info_tabla_1[3] })
      setPartido4({ "local": props.tablas.info_tabla_1[1], "visitante": props.tablas.info_tabla_2[2] })

    }
  }, [props.tablas])



  return (
    <div className='bracket'>
      <h4>LLaves (al momento)</h4>
      <div className="bracket-grid">



        <BracketMatch matchId={1} local={partido1.local} visitante={partido1.visitante} />
        <BracketMatch matchId={2} local={partido2.local} visitante={partido2.visitante} />
        <BracketMatch matchId={3} local={partido3.local} visitante={partido3.visitante} />
        <BracketMatch matchId={4} local={partido4.local} visitante={partido4.visitante} />
        <BracketMatch matchId={5} local={{}} visitante={{}}/>
        <BracketMatch matchId={6} local={{}} visitante={{}}/>
        <BracketMatch matchId={7} local={{}} visitante={{}}/>  

        <div className="border1 border_"></div>
        <div className="border2 border_"></div>
        <div className="border3 border_"></div>
        <div className="border-top-1 border_top"></div>
        <div className="border-top-2 border_top"></div>
        <div className="border-top-3 border_top"></div>

      </div>
    </div>

  )
}

export default Bracket