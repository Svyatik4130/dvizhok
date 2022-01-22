import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import SuccessNotice from '../../../misc/SuccessNotice';
import ErrorNotice from '../../../misc/ErrorNotice';

export default function CalendarEventAlert({ announcement }) {
    const startDate = new Date(announcement.startDate)
    const finishDate = new Date(announcement.finishDate)
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    return (
        <Popup
            trigger={
                <div className="flex items-center p-1 hover:shadow-inner cursor-pointer transition-all rounded-lg">
                    <div className="w-1 h-1 flex-shrink-0 bg-purple-950 rounded-full"></div>
                    <p className=" pl-2 font-medium truncate text-xl text-purple-950 ">{announcement.announcementName}</p>
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
                                <p className="text-lg"><strong className="text-purple-850">{`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}.</strong> О <strong className="text-purple-850">{startDate.getHours()}:{startDate.getMinutes()}</strong></p>
                            </div>

                            <p className="font-semibold text-lg mt-1">Завершення:</p>
                            <div className="flex items-center">
                                <p className="text-lg"><strong className="text-purple-850">{`${finishDate.getDate()}/${finishDate.getMonth() + 1}/${finishDate.getFullYear()}`}.</strong> O <strong className="text-purple-850">{finishDate.getHours()}:{finishDate.getMinutes()}</strong></p>
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
