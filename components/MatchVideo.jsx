import React, { useEffect, useState } from 'react'

const MatchVideo = (props) => {

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let width = window.innerWidth
    let height = Math.ceil((width / (16 / 9)))

    setWidth(width < 800 ? width : 800)
    setHeight(height)


  }, [])

  return (

    <div className='match-modal_video'>

      <iframe

        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${props.video_id}`}
        
        // allowFullscreen="allowfullscreen"
      >

      </iframe>
    </div>
  )
}

export default MatchVideo