import React from 'react'
import GoogleMapReact from 'google-map-react';

export default function Contact() {

    const AnyReactComponent = ({ text }) => <div className="w-16 h-16 rounded-full bg-white">{text}</div>;
    return (
        <div className="md:w-10/12 w-11/12 flex md:flex-row flex-col m-auto">
            <div className="lg:w-6/12 w-full flex-1 lg:pr-2">
                <div className="bg-white rounded-3xl pt-5">
                    <p className="text-center text-purple-950 font-bold text-3xl">Контакти</p>
                    <div className="flex text-center m-auto items-center mt-5 justify-center"><img src="images/landing/gps.png" alt="ok_logo_mini" className="h-9" /><p className="font-medium text-center pl-2 text-lg">Україна, Київ, вул. Предславинська</p></div>
                    <div className="flex m-auto items-center mt-3 justify-center"><img src="images/landing/phone.png" alt="ok_logo_mini" className="h-9" /><p className="font-medium text-center pl-2 text-lg">+38 (092) 000 00 00</p></div>
                    <div className="w-full pt-4 h-124 rounded-b-3xl">
                        <GoogleMapReact
                            className=" rounded-b-3xl"
                            defaultCenter={{
                                lat: 50.447011,
                                lng: 30.525821
                            }}
                            defaultZoom={11}
                        >
                            <AnyReactComponent
                                lat={50.420871}
                                lng={30.523753}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
            <div className="lg:w-6/12 lg:pt-0 pt-4 w-full flex-1 lg:pl-2">
                <div className="bg-white h-full rounded-3xl pt-1">
                    <form className="w-full flex flex-col justify-between h-full px-3 lg:px-16 " >
                        <div>
                            <div className="flex items-center mt-5 justify-center"><p className="font-bold pl-2 text-3xl text-purple-950">Зворотній зв’яз</p><img src="images/mini_logo.png" alt="ok_logo_mini" className="h-8" /></div>
                            <input type="text" placeholder="Ім’я" className="w-full mt-4 mb-3 h-8 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            <input type="phone" placeholder="Телефон" className="w-full mb-3 h-8 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            <input type="email" placeholder="E-mail" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            <textarea type="text" placeholder="Повідомлення" className="w-full resize-none h-36 text-xl px-4 py-3 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <button type="submit" className="px-12 py-2 text-2xl font-bold text-center rounded-2xl text-white bg-purple-950 my-6 m-auto"> Надіслати</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
