'use client'

import navItems from '@public/data/navItems.json';
import {AiOutlineMenu} from 'react-icons/ai'


const handleDropdown = () => {
    const dialog: HTMLElement | null = document.getElementById('dropdownMenu');

    dialog?.classList.toggle('hidden');
}

const Nav = () => {
  return (
    <nav className='w-full bg-cello-800 z-10'>
        <div className='flex flex-row justify-between max-w-6xl mx-auto my-0 h-16 py-2 px-4 sm:px-8'>
            <div className='h12 pt-[5px]'>
                <img className='h-full' 
                    src='/assets/icons/logo-secretaria-white.svg'
                    alt="Logo secretaria de CTI" />
            </div>
            {/* Desktop Navigation */}
            <ul className='md:flex hidden flex-row gap-4 items-center'>
                {
                    Object.values(navItems).map((item, index) => (
                        <li 
                            key={index}
                            className='h-fit text-white
                                hover:text-gray-300'>
                                <a href={item.path}>{item.name}</a>
                        </li>
                    ))
                }
            </ul>
            {/* Mobile navigation */}
            <AiOutlineMenu 
                className='md:hidden burguer-menu text-white
                hover:cursor-pointer'
                onClick={handleDropdown}/>
            <div 
                className='absolute top-16 left-auto right-0 m-0 hidden z-40 bg-white p-4'
                id='dropdownMenu'>
                <ul className='flex flex-col gap-4 items-end'>
                    {
                        Object.values(navItems).map((item, index) => (
                            <li 
                                key={index}
                                className='h-fit text-gray-700 
                                hover:text-gray-600'>
                                    <a href={item.path}>{item.name}</a>
                            </li>
                        ))
                    }
                </ul>   
            </div>
        </div>
    </nav>
  )
}

export default Nav