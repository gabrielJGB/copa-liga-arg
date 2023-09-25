import React from 'react'

const Equipo = (props) => {
  return (
    <div className="fixture_match-equipo">
      <div></div>
      <div className="fixture_equipo-info">
        <img src={"http://promiedos.com.ar/" + props.escudo} alt="" />
        <div>{props.equipo}</div>
        

      </div>
        {
          Array(props.rojas).fill("").map((r, i) => (
            <div key={i} className="red-card"></div>
          ))

        }
    </div>
  )
}

export default Equipo