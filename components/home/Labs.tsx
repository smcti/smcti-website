'use client'

import HeadingText from "@components/common/HeadingText"
import labs from "@public/data/labs.json"
import { BsCodeSquare } from 'react-icons/bs';
import { BsRobot } from 'react-icons/bs';
import { BsBoxes } from 'react-icons/bs';

const Labs = () => {
  const iconList = [BsCodeSquare, BsRobot, BsBoxes];

  const renderIcon = (icon: any) => {
    const Icon = icon;
    return (
      <Icon size={24}/>
    )
  }

  return (
    <section className='section-default py-32'>
      <div className="flex flex-col gap-16 md:">
        <HeadingText title='Laboratórios de pesquisa e inovação' super='Desenvolvimento e inovação' />
        <div className="flex flex-col md:flex-row gap-4">
          { 
            Object.values(labs).map((item, index) => {
              return (
                <div className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col gap-4
                hover:shadow-lg hover:cursor-pointer" onClick={
                 () => {
                  window.location.assign(item.link)
                 } 
                }>
                  <div className="w-12 h-12 flex items-center text-gray-400 border-gray-300 justify-center rounded-full border">
                    { renderIcon(iconList[index]) }
                  </div>
                  <h3 className="text-gray-900 text-lg font-black">{ item.lab }</h3>
                  <p className='text-justify text-gray-600'>{ item.desc }</p>
                </div>
              )
            }) 
          }
        </div>
      </div>
    </section>
  )
}

export default Labs