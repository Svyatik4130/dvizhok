import React, { useEffect, useState } from 'react'
import SimpleLoader from '../../../Loaders/SimpleLoader';

export default function UserInformation({ UserInfo }) {
    console.log(UserInfo)
    const RegistrationDate = new Date(UserInfo.createdAt).getFullYear()
    return (
        <div className="mt-14">
            <div className="flex items-center">
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/globe.png" alt="globe" className="w-9" />
                <p className="font-semibold text-2xl ml-2">Про себе</p>
            </div>
            {UserInfo.workAs ? (
                <div className="flex items-center mt-7">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/portfolio.png" alt="portfolio" className="w-7" />
                    <p className="font-medium text-lg ml-2">Працює в <strong>{UserInfo.workAs}</strong></p>
                </div>
            ) : (null)}
            {UserInfo.occupationTown ? (
                <div className="flex items-center mt-2">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/hometown.png" alt="hometown" className="w-6" />
                    <p className="font-medium text-lg ml-2">Живе в <strong>{UserInfo.occupationTown}</strong></p>
                </div>
            ) : (null)}
            {UserInfo.workPlace ? (
                <div className="flex items-center mt-2">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/gps.png" alt="gps" className="w-6" />
                    <p className="font-medium text-lg ml-2">Працює <strong>{UserInfo.workPlace}</strong></p>
                </div>
            ) : (null)}
            {UserInfo.myProjects[0] ? (
                <>
                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/bankCard.png" alt="bankCard" className="w-6" />
                        <p className="font-medium text-lg ml-2">Інтернет ресурси:</p>
                    </div>
                    {UserInfo.myProjects.map(project => {
                        return (
                            <div className="flex items-center ml-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                <p className="font-medium text-lg ml-2">{project}</p>
                            </div>
                        )
                    })}
                </>
            ) : (null)}
            {UserInfo.myGoals ? (
                <div className="flex items-center mt-2">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/heart.png" alt="heart" className="w-6" />
                    <p className="font-medium text-lg ml-2">Місія: <strong>{UserInfo.myGoals}</strong></p>
                </div>
            ) : (null)}
            <div className="flex items-center mt-2">
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/clock.png" alt="clock" className="w-6" />
                <p className="font-medium text-lg ml-2">На Омріянїй Країні з {RegistrationDate} року</p>
            </div>
            {UserInfo.selfPresentation ? (
                <div className="flex items-start mt-2">
                    <div className="w-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg></div>
                    <p className="font-medium text-lg ml-2">Самопрезентація: <strong>{UserInfo.selfPresentation}</strong></p>
                </div>
            ) : (null)}
        </div>
    )
}
