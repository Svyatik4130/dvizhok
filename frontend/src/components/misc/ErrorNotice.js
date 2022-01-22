import React from 'react'

export default function ErrorNotice(props) {
    return (
        <div className="w-full mb-2 m-auto items-center flex justify-between bg-red-600 text-white rounded-3xl py-1 font-bold px-4 text-center">
            <span></span>
            <span>{props.message}</span>
            <button className="bg-white rounded-full px-2 text-lg text-black" onClick={props.clearError}>X</button>
        </div>
    )
}
