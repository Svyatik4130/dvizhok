import React, { useState } from 'react'
import { Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { loggedUser } from '../../actions/UserActions'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const history = useHistory()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)

    const logout = () => {
        if (userData) {
            dispatch(loggedUser({
                token: undefined,
                user: undefined
            }))
            localStorage.setItem("auth-token", "")
            history.push("/")
        }
    }

    return (
        <nav className="fixed w-full z-50 bg-white">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a onClick={() => history.push("/")}><img
                                className="h-8 cursor-pointer"
                                src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/logo.png"
                                alt="Workflow"
                            /></a>
                        </div>
                        <div className="hidden xl:block">
                            <div className="ml-10 text-purple-950 font-semibold flex items-baseline">
                                <a className="flex ml-0 mr-6" href="#idea" onClick={() => history.push("/comix")}>Ідея</a>
                                <a className="flex mx-6" href="#plans" onClick={() => history.push("/#plans")}>Плани</a>
                                <a className="flex mx-6 cursor-pointer" onClick={() => history.push("/guest/projects/")}>Проекти</a>
                                <a className="flex mx-6" href="#team" onClick={() => history.push("/#team")}>Команда</a>
                                <a className="flex mx-6" href="#white_paper" onClick={() => history.push("/#white_paper")}>White paper</a>
                                <a className="flex mx-6" href="#blog" onClick={() => history.push("/#blog")}>Блог</a>
                                <a className="flex mx-6" href="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/presentation/%D0%98%D0%BD%D0%B2%D0%B5%D1%81%D1%82%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_DvizhOK_compressed-1643966546724.pdf" download onClick={() => history.push("/#invest")}>Інвесторам</a>
                            </div>
                        </div>
                    </div>
                    <div className="items-center hidden xl:block">
                        {userData.user ? (
                            // <div>
                            //     <h1 className=" font-semibold">Вітаю, {userData.user.name}</h1>
                            //     <button onClick={logout} className="rounded-lg bg-red-600 text-white w-full">Вийти</button>
                            // </div>
                            <div className="flex justify-end pr-4">
                                <div className="w-14 h-14 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}></div>
                                <div className="ml-2">
                                    <p className="inline-block font-bold text-lg text-purple-850">{userData.user.name}</p>
                                    <p onClick={() => { history.push("/dashboard") }} className=" bg-yellow-350 hover:bg-yellow-400 transition-all text-black font-medium px-2 cursor-pointer rounded-xl">Особистий кабінет</p>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => history.push('/signin')} className="px-12 py-2 my-4 text-xl rounded-xl text-white bg-purple-950">Вхiд</button>
                        )
                        }
                    </div>
                    <div className="-mr-2 flex xl:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-purple-950 inline-flex items-center justify-center p-2 rounded-md text-gray-400"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block bg-colo h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="xl:hidden" id="mobile-menu">
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#idea" onClick={() => history.push("/comix")} className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Ідея
                            </a>
                            <a href="#plans" onClick={() => history.push("/#plans")} className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Плани
                            </a>
                            <a onClick={() => history.push("/guest/projects/")} className="text-purple-950 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">
                                Проекти
                            </a>
                            <a href="#team" onClick={() => history.push("/#team")} className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Команда
                            </a>
                            <a href="#white_paper" onClick={() => history.push("/#white_paper")} className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                White paper
                            </a>
                            <a href="#blog" onClick={() => history.push("/#blog")} className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Блог
                            </a>
                            <a href="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/presentation/%D0%98%D0%BD%D0%B2%D0%B5%D1%81%D1%82%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_DvizhOK_compressed-1643966546724.pdf" download onClick={() => history.push("/#invest")} className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Інвесторам
                            </a>
                            {userData.user ? (
                                <div className="flex xl:pr-4 items-center">
                                    <div className="w-14 h-14 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}></div>
                                    <div className="ml-2 xl:w-10/12">
                                        <p className=" w-full font-bold text-lg text-purple-850">{userData.user.name}</p>
                                        <div className="flex justify-between">
                                            <button onClick={() => { history.push("/dashboard") }} className=" bg-yellow-350 hover:bg-yellow-400 transition-all whitespace-nowrap text-black font-medium px-2 cursor-pointer rounded-lg py-2">Особистий кабінет</button>
                                            <button onClick={logout} className="rounded-lg py-2 px-2 ml-2 bg-red-600 whitespace-nowrap text-white font-medium">Вийти</button>

                                        </div>

                                        {/* <div>
                                            <h1 className=" font-semibold">Вітаю, {userData.user.name}</h1>
                                        </div> */}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <button onClick={() => history.push('/signin')} className="px-12 py-2 my-4 text-xl rounded-xl text-white bg-purple-950">Вхiд</button>
                                    <button onClick={() => history.push('/signup')} className="px-12 py-2 my-4 text-xl rounded-xl text-white bg-purple-950">Реєстрація</button>
                                </div>
                            )
                            }
                        </div>
                    </div>
                )}
            </Transition>
        </nav >
    )
}
