import React from 'react'

import ChartCard from '../Chart/ChartCard'
import ChartLegend from '../Chart/ChartLegend'
import { Doughnut } from 'react-chartjs-2'
import {
    doughnutOptions,
    doughnutLegends,
} from '../utils/demo/chartsData'

export default function Goal() {
    return (
        <div className='mt-9 w-full md:w-10/12 m-auto text-purple-950'>
            <div className="w-10/12 m-auto">
                <p className="text-center font-bold text-3xl md:text-5xl tracking-wide">НАША МЕТА</p>
                <p className="text-center text-5xl md:text-7xl lg:text-9xl font-bold tracking-widest mt-6">1 000 000</p>
                <p className="text-center font-bold text-xl md:text-4xl mt-6">	ОКтивістів, Творців та Лідерів, які своїми діями, проектами та ресурсами змінять країну!</p>
                <div className="h-0.5 w-7/12 md:w-3/12 m-auto bg-pink-450 mt-8"></div>
            </div>
            <div className="w-full mt-6">
                <p className="text-center font-bold text-3xl md:text-5xl text-purple-950">Статистика</p>
                <div className="flex flex-col md:flex-row mt-5">
                    <div className=" w-11/12 m-auto md:w-4/12 px-0 md:py-0 pt-0 md:pr-3">
                        <div className="bg-white rounded-xl md:rounded-3xl pt-8">
                            <p className="text-center font-bold text-2xl">Oднодумців</p>
                            <ChartCard>
                                <Doughnut {...doughnutOptions} />
                                <ChartLegend legends={doughnutLegends} />
                            </ChartCard>
                        </div>
                    </div>
                    <div className=" w-11/12 m-auto md:w-4/12 px-0 md:py-0 pt-6 md:px-3">
                        <div className="bg-white rounded-xl md:rounded-3xl pt-8">
                            <div className="flex items-center justify-center"><p className="text-center font-bold text-2xl">Творців</p><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png" alt="ok_logo_mini" className="h-9" /></div>
                            <ChartCard>
                                <Doughnut {...doughnutOptions} />
                                <ChartLegend legends={doughnutLegends} />
                            </ChartCard>
                        </div>
                    </div>
                    <div className=" w-11/12 m-auto md:w-4/12 px-0 md:py-0 pt-6 md:pl-3">
                        <div className="bg-white rounded-xl md:rounded-3xl pt-8">
                            <p className="text-center font-bold text-2xl">Проектів</p>
                            <ChartCard>
                                <Doughnut {...doughnutOptions} />
                                <ChartLegend legends={doughnutLegends} />
                            </ChartCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
