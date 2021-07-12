import React from 'react'

import ChartCard from '../Chart/ChartCard'
import ChartLegend from '../Chart/ChartLegend'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import {
    doughnutOptions,
    lineOptions,
    barOptions,
    doughnutLegends,
    lineLegends,
    barLegends,
} from '../utils/demo/chartsData'

export default function Goal() {
    return (
        <div className='mt-9 w-10/12 m-auto text-purple-950'>
            <div className="w-10/12 m-auto">
                <p className="text-center font-bold text-5xl tracking-wide">НАША МЕТА</p>
                <p className="text-center text-9xl font-bold tracking-widest mt-6">1 000 000</p>
                <p className="text-center font-bold text-4xl mt-6">	ОКтивістів, Творців та Лідерів, які своїми діями, проектами та ресурсами змінять країну!</p>
                <div className="h-0.5 w-3/12 m-auto bg-pink-450 mt-8"></div>
            </div>
            <div className="w-full mt-6">
                <p className="text-center font-bold text-5xl text-purple-950">Статистика</p>
                <div className="flex flex-row mt-5">
                    <div className="w-4/12 pr-3">
                        <div className="bg-white rounded-3xl pt-8">
                            <p className="text-center font-bold text-2xl">Oднодумців</p>
                            <ChartCard>
                                <Doughnut {...doughnutOptions} />
                                <ChartLegend legends={doughnutLegends} />
                            </ChartCard>
                        </div>
                    </div>
                    <div className="w-4/12 px-3">
                        <div className="bg-white rounded-3xl pt-8">
                            <div className="flex items-center justify-center"><p className="text-center font-bold text-2xl">Творців</p><img src="images/mini_logo.png" alt="ok_logo_mini" className="h-9" /></div>
                            <ChartCard>
                                <Doughnut {...doughnutOptions} />
                                <ChartLegend legends={doughnutLegends} />
                            </ChartCard>
                        </div>
                    </div>
                    <div className="w-4/12 pl-3">
                        <div className="bg-white rounded-3xl pt-8">
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
