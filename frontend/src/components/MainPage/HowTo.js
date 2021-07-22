import React from 'react'

export default function HowTo() {
    return (
        <div className="mt-16">
            <p className="text-bold lg:text-5xl hidden lg:block text-center">Як створити Омріяну Країну?</p>
            <p className="text-bold text-4xl lg:hidden text-center">Як створити <br/> Омріяну Країну?</p>
            <div className="hidden xl:block mt-7 relative m-auto lg:w-10/12">
                <div className="flex flex-row">
                    <div className="flex flex-col w-6/12 justify-between items-center pr-7">
                        <div className="flex justify-between w-full items-center">
                            <div className="bg-white rounded-3xl py-4 px-5 font-medium text-2xl w-/12">
                                <p>Ми сплачуємо податки, ходимо на вибори, мріємо про зміни. Але вони, мабуть, десь забарилися.<br />
                                    <br />
                                    Тоді ми подумали – а що, якщо ми самі почнемо робити ті зміни, про які мріємо? І почнемо виділяти
                                    на важливі проекти по 100 гривень щомісяця? Гроші невеликі, але якщо нас буде багато, то… </p>
                            </div>
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/arrows/arrow1.png" alt="arrow1" className="ml-8 h-4/6" />
                        </div>
                        <div>
                            <div className="bg-white mt-32 rounded-3xl py-4 px-5">
                                <p className="font-medium text-2xl">Якщо ж у вас вже є важливий проект, без якого ви не уявляєте Омріяну Країну,
                                    то на платформі «DvizhOK» ви зможете знайти однодумців, команду й необхідні ресурси!</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-6/12 font-medium text-2xl">
                        <div className="w-9/12">
                            <div className="bg-white rounded-3xl py-4 px-5">
                                <p className="font-semibold text-2xl">Гуртом ми можемо гори зрушити!</p>
                                <p className="font-medium text-2xl">Щоб досягти масштабних змін спільними зусиллями, ми створили платформу «DvizhOK».</p>
                            </div>
                            <div className="mt-2">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/arrows/arrow2.png" className="mr-9 ml-auto w-4/12" alt="arrow2" />
                            </div>
                        </div>
                        <div className='relative flex'>
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/arrows/arrow4.png" alt="arrow3" className="h-4/6 absolute top-2/4" />
                            <div className=" bg-white rounded-3xl py-4 px-5 ml-40">
                                <p>Лише 100 гривень щомісяця можуть змінити країну! Адже йтимуть вони не в бюджет і не в кишеню чиновника.<br />
                                    <br />
                                    На платформі «DvizhOK» ви самі обираєте реальні проекти, які важливі для вас.
                                    Ви визначаєте пріоритети, контролюєте витрати, стаєте справжнім Творцем змін! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-6 px-4 xl:hidden">
                <div className="bg-white rounded-3xl py-4 px-5 font-medium text-lg w-/12">
                    <p>Ми сплачуємо податки, ходимо на вибори, мріємо про зміни. Але вони, мабуть, десь забарилися.<br />
                        <br />
                        Тоді ми подумали – а що, якщо ми самі почнемо робити ті зміни, про які мріємо? І почнемо виділяти
                        на важливі проекти по 100 гривень щомісяця? Гроші невеликі, але якщо нас буде багато, то… </p>
                </div>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/arrows/arrow1_mob.png" alt="arrow1_mob" className="w-10/12 md:w-4/12 m-auto my-3" />
                <div className="bg-white rounded-3xl py-4 px-5 font-medium text-lg w-/12">
                    <p className="font-medium text-lg">Якщо ж у вас вже є важливий проект, без якого ви не уявляєте Омріяну Країну,
                        то на платформі «DvizhOK» ви зможете знайти однодумців, команду й необхідні ресурси!</p>
                </div>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/arrows/arrow2_mob.png" alt="arrow2_mob" className="w-10/12 md:w-4/12 m-auto my-3" />
                <div className="bg-white rounded-3xl py-4 px-5 font-medium text-lg w-/12">
                    <p className="font-semibold text-lg">Гуртом ми можемо гори зрушити!</p>
                    <p className="font-medium text-lg">Щоб досягти масштабних змін спільними зусиллями, ми створили платформу «DvizhOK».</p>
                </div>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/arrows/arrow1_mob.png" alt="arrow1_mob" className="w-10/12 md:w-4/12 m-auto my-3" />
                <div className=" bg-white rounded-3xl py-4 px-5 text-lg font-medium">
                    <p>Лише 100 гривень щомісяця можуть змінити країну! Адже йтимуть вони не в бюджет і не в кишеню чиновника.<br />
                        <br />
                        На платформі «DvizhOK» ви самі обираєте реальні проекти, які важливі для вас.
                        Ви визначаєте пріоритети, контролюєте витрати, стаєте справжнім Творцем змін! </p>
                </div>
            </div>
        </div>
    )
}
