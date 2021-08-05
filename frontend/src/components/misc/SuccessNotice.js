import React from 'react'

export default function SuccessNotice(props) {

    setTimeout(() => {
        props.clearError()
    }, 4000);

    return (
        <div className="w-full m-auto flex bg-green-700 justify-center text-white rounded-3xl py-1 font-bold px-4 text-center">
            <span>{props.message}</span>
        </div>
    )
}
