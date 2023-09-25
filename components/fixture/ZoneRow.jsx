import React from 'react'
import '../../src/styless/ZoneRow.css'

const DateRow = (props) => {
    return (
        <tr >
            <td className='zone-row' colSpan={6} >Zona {props.zone==1?"A":"B"}</td>
        </tr>
    )
}

export default DateRow