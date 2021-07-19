import React from 'react'

export default function ErrorNotice(props) {
    return (
        <div className="w-9/12 m-auto flex justify-between bg-red-600 text-white rounded-3xl py-1 font-bold px-4 text-center">
            <span></span>
            <span>{props.message}</span>
            <button className="bg-white rounded-full px-2 text-black" onClick={props.clearError}>X</button>
        </div>
    )
}
