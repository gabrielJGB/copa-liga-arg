import React from 'react'
import '../../src/styless/DateRow.css'

const DateRow = (props) => {
    return (
        <tr >
            <td className='day-row' colSpan={6} >{props.date}</td>
        </tr>
    )
}

export default DateRow