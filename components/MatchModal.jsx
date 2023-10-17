import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import MatchInfo from './MatchInfo'
import MatchVideo from './MatchVideo'


const MatchModal = (props) => {
    const data = useContext(DataContext)
   

    return (
        <div
            style={{ transform: `translateX(${data.matchDisplay ? "0" : "115%"})` }}
            // style={{transform:(`translateX(${data.matchDisplay?"0px":"100%"})`)}}
            // style={data.matchDisplay?{transform:"translateX(0px)"}:{transform:"translateX(100%)"}}
            className='match-modal_container'>
            
            <button 
                onClick={() => { data.setMatchDisplay(false) }}
                className='match-modal_close-button'>Cerrar</button>
        
            <MatchVideo video_id={props.match.video_id}/>
            <MatchInfo id={props.match.id}/>
            
            
        </div>
    )
}

export default MatchModal