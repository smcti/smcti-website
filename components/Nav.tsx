"use client";

import { useState, useEffect } from "react";
import navItems from "@/public/data/navItems.json";
import { AiOutlineMenu, AiOutlineCaretDown } from "react-icons/ai";
import { Menu } from "@headlessui/react";

const Nav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleDropdown = () => {
    const dialog = document.getElementById("dropdownMenu");
    dialog?.classList.toggle("hidden");
  };

  return (
    <nav 
      className={`w-full bg-cello-800 sticky top-0 z-[100] transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className='flex flex-row justify-between max-w-6xl mx-auto my-0 h-16 py-2 px-4 sm:px-8 items-center'>
        <div className='h-12 pt-[5px]'>
          <img
            className='h-full'
            src='/assets/icons/logo-secretaria-white.svg'
            alt='Logo secretaria de CTI'
          />
        </div>

        {/* Desktop Navigation */}
        <ul className='lg:flex hidden flex-row gap-4 items-center'>
          {Object.values(navItems).map((item, index) => (
            <li key={index} className='h-fit text-white transition-transform duration-200 hover:scale-105 hover:text-cello-100'>
              {item.dropdown ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="focus:outline-none">
                    <span className='flex items-center gap-1'>
                      {item.name}
                      <AiOutlineCaretDown />
                    </span>
                  </Menu.Button>
                  <Menu.Items className="flex flex-col absolute left-0 w-fit shadow-xl overflow-hidden mt-4 min-w-[200px] rounded-lg bg-white z-[110]">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Menu.Item key={dropdownIndex}>
                        {({ active }) => (
                          <a
                            href={dropdownItem.path}
                            className={`px-4 py-3 text-gray-900 whitespace-nowrap border-b border-gray-50 last:border-0 ${
                              active ? 'bg-gray-100' : 'bg-white'
                            }`}
                          >
                            {dropdownItem.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              ) : (
                <a href={item.path} className="hover:underline">{item.name}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile navigation */}
        <AiOutlineMenu
          className='lg:hidden burguer-menu text-white text-2xl hover:cursor-pointer'
          onClick={handleDropdown}
        />
        
        {/* Mobile Dropdown Menu */}
        <div
          className='absolute top-16 left-0 right-0 hidden z-40 bg-white shadow-2xl p-4 border-t border-gray-100'
          id='dropdownMenu'
        >
          <ul className='flex flex-col gap-4 items-end'>
            {Object.values(navItems).map((item, index) => (
              <li key={index} className='w-full text-right h-fit text-gray-700 hover:text-gray-600'>
                {item.dropdown ? (
                  <Menu as="div">
                    <Menu.Button className='w-full'>
                      <div className='flex justify-end items-center gap-1'>
                        <AiOutlineCaretDown />
                        {item.name}
                      </div>
                    </Menu.Button>
                    <Menu.Items className='flex flex-col bg-gray-50 mt-2 rounded-md'>
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Menu.Item key={dropdownIndex}>
                          <a href={dropdownItem.path} className='py-3 px-4 hover:text-cello-600 border-b border-white last:border-0'>
                            {dropdownItem.name}
                          </a>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                ) : (
                  <a href={item.path} className="block py-2">{item.name}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;