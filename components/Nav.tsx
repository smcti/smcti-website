'use client'

import navItems from '@/public/data/navItems.json';
import { AiOutlineMenu, AiOutlineCaretDown } from 'react-icons/ai'
import { Menu } from '@headlessui/react'

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
                            <li key={index} className='h-fit text-white'>
                                {item.dropdown ?
                                    <Menu >
                                        <div className='relative'>
                                            <Menu.Button>
                                                <span className="flex items-center" >
                                                    {item.name}
                                                    <AiOutlineCaretDown />
                                                </span>
                                            </Menu.Button>
                                            <Menu.Items className={'flex flex-col absolute bg-cello w-fit min-w-full pr-2 shadow-[-8px_0_0_0_rgb(30,53,96,1)] rounded-b-sm'}>
                                                {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                                    <Menu.Item key={dropdownIndex}>
                                                        {({ active }) => (
                                                            <a href={dropdownItem.path} className="py-2 hover:text-gray-300 whitespace-nowrap" >{dropdownItem.name}</a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </div>
                                    </Menu>
                                    :
                                    <a href={item.path}>{item.name}</a>
                                }
                            </li>
                        ))
                    }
                </ul>
                {/* Mobile navigation */}
                <AiOutlineMenu
                    className='md:hidden burguer-menu text-white
                hover:cursor-pointer'
                    onClick={handleDropdown} />
                <div
                    className='absolute top-16 left-auto right-0 m-0 hidden z-40 bg-white p-4'
                    id='dropdownMenu'>
                    <ul className='flex flex-col gap-4 items-end'>
                        {
                            Object.values(navItems).map((item, index) => (
                                <li
                                    key={index}
                                    className='h-fit text-gray-700 hover:text-gray-600'>
                                    {item.dropdown ?
                                        <Menu >
                                            <div className=''>
                                                <Menu.Button className={`w-full`}>
                                                    <div className='flex justify-end w-full'>
                                                        <span className="flex items-center" >
                                                            <AiOutlineCaretDown />
                                                            {item.name}
                                                        </span>
                                                    </div>

                                                </Menu.Button>
                                                <Menu.Items className={'flex flex-col bg-white w-full justify-end'}>
                                                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                                        <Menu.Item key={dropdownIndex}>
                                                            {({ active }) => (
                                                                <a href={dropdownItem.path} className="py-2 hover:text-gray-300 text-right " >{dropdownItem.name}</a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </div>
                                        </Menu>
                                        :
                                        <a href={item.path}>{item.name}</a>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Nav