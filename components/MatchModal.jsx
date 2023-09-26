import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'


const MatchModal = (props) => {
    const data = useContext(DataContext)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        let width = window.innerWidth
        let height = Math.floor((width/(16/9)))

        setWidth(width)
        setHeight(height)
        console.log(width,height);
    }, [])
    

  

    return (
        <div
            style={{ display: (data.matchDisplay ? "" : "none") }}
            onClick={() => { data.setMatchDisplay(false) }}
            className='match-modal_container'>

            <div className='match-modal_video'>
                {/* <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+data.matchDisplay.video_id} ></iframe> */}

        
                <iframe 
                    width={width<800?width:800} 
                    height={height}
                    src={`https://www.youtube.com/embed/${props.id}`}
                    frameborder="0" 
                    allowfullscreen="allowfullscreen"
                >
                    
                </iframe>
            </div>
        </div>
    )
}

export default MatchModal