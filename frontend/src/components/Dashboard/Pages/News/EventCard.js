import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router';

export default function EventCard({ story }) {
    const history = useHistory()

    return (
        <div className="bg-white rounded-3xl p-3 mb-2">
            <div className="flex items-center mb-2">
                <div className="lg:w-16 lg:h-16 h-14 w-14 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${story.projectLogo})` }}></div>
                <p className="font-medium text-xl pl-3"><strong onClick={() => history.push(`/dashboard/projects/${story.projectId}`)} className="text-purple-950 hover:text-purple-850 transition-all cursor-pointer">{story.projectName}</strong> додав(-ла) {story.photosNvideos.length} нових фото</p>
            </div>
            <p className="font-medium text-lg">{story.text}</p>
            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns pl-3">
                {story.photosNvideos.map(file => {
                    return (<div className="mb-9 mx-8 h-56 responsive-image-bgImgUrl" style={{ backgroundImage: `url(${file})` }}></div>)
                })}
            </Carousel>
            <div className="flex items-center">
                <svg className=" hover:text-purple-850 hover:text-opacity-80 fill-current text-white transition-all cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <button onClick={() => history.push(`/dashboard/projects/${story.projectId}`)} className="bg-yellow-350 ml-4 text-center py-2 px-4 rounded-2xl inline-flex text-lg font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-7 ml-2" alt="support" /> </button>
            </div>
        </div>
    )
}
