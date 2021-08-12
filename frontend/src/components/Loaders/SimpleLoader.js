import React from 'react'

export default function SimpleLoader() {
    return (
        <div className="w-full h-full relative">
            <div class="gooey">
                <span class="dot"></span>
                <div class="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
