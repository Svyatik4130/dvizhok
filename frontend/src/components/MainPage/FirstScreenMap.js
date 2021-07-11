import React from 'react'
import ReactPlayer from 'react-player'

export default function FirstScreenMap() {
    return (
        <div className="w-full">
            <div style={{ marginTop: "64px" }} className="absolute w-full bg-purple-950">
                <p className="absolute text-white">hello</p>
                <div className="bg-cover">
                    <video onContextMenu={(e) => e.preventDefault()} src="images/1screen_short.mp4" preload="auto" autoplay="true" loop="true" muted="muted" className="w-full h-screen object-cover"></video>
                </div>
            </div>
        </div>
    )
}
