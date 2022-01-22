import React from 'react'

export default function loading() {
    return (
        <div>
        <div className="w-full h-screen bg-purple-850">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <span>Loading</span>
            </div>
            <a className='text-center absolute bottom-0 left-0 text-gray-400' href="https://codepen.io/ahmadbassamemran/pen/bXRPdr">Source</a>
        </div>
        </div>
    )
}
