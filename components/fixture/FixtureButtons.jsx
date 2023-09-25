import React, { useContext } from 'react';
import '../../src/styless/FixtureButtons.css'
import Button from 'react-bootstrap/Button';
import { DataContext } from '../../context/DataContext';


const FixtureButtons = () => {
  const data = useContext(DataContext)
  const fechas = data.obj.fechas.length
  const variant = "success"

  return (
    <div className='fixture_buttons'>

      {
        Array.from(Array(fechas).keys()).map((b, i) => (
          <Button
            variant={data.selected === (i+1) ? variant : "outline-" + variant}
            
            size='sm'
            className='fixture-button'
            key={i}
            onClick={()=> data.setSelected(i+1) }
          >{i+1}</Button>
        ))

      }

    </div>
  )
}

export default FixtureButtons