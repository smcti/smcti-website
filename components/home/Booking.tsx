'use client'

import HeadingText from "@components/common/HeadingText"
import agenda from "@public/data/appointments.json"

import { FaUsers } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { GiTheater } from 'react-icons/gi';
import { FaBus } from 'react-icons/fa';

const Booking = () => {
    const iconList = [FaUsers, FaUserFriends, GiTheater, FaBus];

    const renderIcon = (icon: any) => {
        const Icon = icon;
        return (
            <Icon size={48}/>
        )
    }

    return (
        <section className='my-32'>
            <div className="section-default flex flex-col gap-16">
                <HeadingText title='Reserva de espaços e visitas' super='Agendamentos' reverse />
                <div className="flex flex-col md:flex-row gap-4">
                    {
                        Object.values(agenda).map((item, index) => {
                            return (
                                <div key={index} className={`w-full bg-white h-48 rounded-lg p-4 border flex flex-col justify-between border-t-4
                                    hover:cursor-pointer hover:shadow-lg md:hover:-translate-y-2 md:transition-all 
                                    ${index == 0 ? 'border-t-red-500' : ''}
                                    ${index == 1 ? 'border-t-green-500' : ''}
                                    ${index == 2 ? 'border-t-blue-500' : ''}
                                    ${index == 3 ? 'border-t-yellow-500' : ''}`}
                                    onClick={ () => {
                                        window.location.assign(item.href)
                                    } }>
                                    <h3 className="text-gray-800 font-black">{item.title}</h3>
                                    <div className={`flex flex-row justify-end
                                    ${index == 0 ? 'text-red-500' : ''}
                                    ${index == 1 ? 'text-green-500' : ''}
                                    ${index == 2 ? 'text-blue-500' : ''}
                                    ${index == 3 ? 'text-yellow-500' : ''}
                                    `}>
                                        { renderIcon(iconList[index]) }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Booking