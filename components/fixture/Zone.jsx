import React from 'react'

const Zone = (props) => {
  return (
    <div className='fixture_zone'>Zona {props.zone==1?"A":"B"}</div>
  )
}

export default Zone