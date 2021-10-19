import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import SuccessNotice from '../../../misc/SuccessNotice';
import ErrorNotice from '../../../misc/ErrorNotice';

export default function SidebarEventAlert({ announcement }) {
    const startTime = new Date(announcement.startTime)
    const finishTime = new Date(announcement.finishTime)
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    return (
        <Popup
            trigger={
                <div className="bg-white rounded-3xl custom-shadow hover:bg-gray-50 transition-all cursor-pointer hover:shadow-inner p-2 my-1">
                    <p className="font-semibold text-2xl">{`${startTime.getHours()}:${startTime.getMinutes()}`}</p>
                    <p className="font-medium text-sm pb-5">{announcement.announcementName}</p>
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2/12" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
                        <p className="font-medium text-sm projectName-text break-words w-10/12">{announcement.locationString}</p>
                    </div>
                </div>
            }
            modal
            nested
        >
            {close => (
                <div className="modal bg-white rounded-xl overflow-y-scroll max-h-screen">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="w-full bg-gray-100 px-4 py-2 text-black text-2xl font-bold rounded-t-xl">
                        Інформація про анонс
                    </div>

                    <div className="px-8 z-40">
                        <div className="w-10/12 mt-3 m-auto">
                            <div className="px-2 m-auto">
                                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                            </div>
                        </div>
                        <div className="px-8">
                            <div className="w-full flex items-end">
                                <p className="font-semibold text-xl">Назва:</p>
                                <p className="text-lg pl-1 text-purple-850">{announcement.announcementName}</p>
                            </div>

                            <div className="w-full mt-1">
                                <p className="font-semibold text-xl">Опис:</p>
                                <p className="text-lg text-purple-850">{announcement.text}</p>
                            </div>

                            <p className="font-semibold text-lg mt-3">Початок:</p>
                            <div className="flex items-center">
                                <p className="text-lg"><strong className="text-purple-850">{announcement.startDate}.</strong> О <strong className="text-purple-850">{startTime.getHours()}:{startTime.getMinutes()}</strong></p>
                            </div>

                            <p className="font-semibold text-lg mt-1">Завершення:</p>
                            <div className="flex items-center">
                                <p className="text-lg"><strong className="text-purple-850">{announcement.finishDate}.</strong> O <strong className="text-purple-850">{finishTime.getHours()}:{finishTime.getMinutes()}</strong></p>
                            </div>
                        </div>
                    </div>


                    <div className="w-full rounded-b-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                        <button
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                close();
                            }}
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}
