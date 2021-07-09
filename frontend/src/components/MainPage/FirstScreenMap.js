import React from 'react'
import ReactPlayer from 'react-player'

export default function FirstScreenMap() {
    return (
        <div className="relative w-full">
            <div style={{ marginTop: "64px" }} className="absolute w-full bg-purple-950">
                <p className="absolute">hello</p>
                <ReactPlayer onContextMenu={(e)=> e.preventDefault()}
                    url="images/1screen_short.mp4"
                    className='w-full h-full'
                    width='100%'
                    playing={true}
                    controls={false}
                    loop={true}
                    height="100%"
                    muted={true}
                />
            </div>
        </div>
    )
}
