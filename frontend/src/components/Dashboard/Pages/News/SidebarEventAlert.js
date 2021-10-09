import React from 'react'

export default function SidebarEventAlert() {
    
    return (
        <div className="bg-white rounded-3xl custom-shadow p-2 my-1">
            <p className="font-semibold text-2xl">14:00</p>
            <p className="font-medium text-sm pb-5">Відкрита дискусія "Нова українська школа"</p>
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
                <p className="font-medium text-sm">Львів, вул. Міцкевича, 31</p>
            </div>
        </div>
    )
}
