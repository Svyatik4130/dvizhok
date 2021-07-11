import React, { useState } from 'react'
import { Transition } from "@headlessui/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8"
                                src="images/logo.png"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden xl:block">
                            <div className="ml-10 text-purple-950 text-xl font-semibold flex items-baseline">
                                <a style={{ marginRight: "0px" }} className="flex" href="#">Головна</a>
                                <a className="flex mx-6" href="#works">Ідея</a>
                                <a className="flex mx-6" href="#skills">Плани</a>
                                <a className="flex mx-6" href="#skills">Проекти</a>
                                <a className="flex mx-6" href="#skills">Команда</a>
                                <a className="flex mx-6" href="#skills">White paper</a>
                                <a className="flex mx-6" href="#skills">Блог</a>
                                <a className="flex mx-6" href="#skills">Slack</a>
                            </div>
                        </div>
                    </div>
                    <div className="items-center hidden xl:block">
                        <button className="px-12 py-2 my-4 text-xl rounded-2xl text-white bg-purple-950">Вхiд</button>
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
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Головна
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Ідея
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Плани
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Проекти
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Команда
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                White paper
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Блог
                            </a>
                            <a href="#" className="text-purple-950 block px-3 py-2 rounded-md text-base font-medium">
                                Slack
                            </a>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    )
}
