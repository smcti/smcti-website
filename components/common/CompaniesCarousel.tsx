'use client'

import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll' 
import Image from 'next/image'

const companies = [
  { name: 'SafeEduca', logo: '/assets/images/LogosIncubadas/SafeEduca.png' }, 
  { name: 'Rock Jobs', logo: '/assets/images/LogosIncubadas/RockJobs.png' },
  { name: 'PhBot', logo: '/assets/images/LogosIncubadas/PhBot.png' },
  { name: 'SafeEduca', logo: '/assets/images/LogosIncubadas/SafeEduca.png' }, 
  { name: 'Rock Jobs', logo: '/assets/images/LogosIncubadas/RockJobs.png' },
  { name: 'PhBot', logo: '/assets/images/LogosIncubadas/PhBot.png' },
];

export default function CompaniesCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      dragFree: true 
    }, 
    [
      AutoScroll({ 
        speed: 1, 
        stopOnInteraction: false,
        stopOnMouseEnter: true,  
      })
    ]
  )

  return (
    <div className="w-full py-10">     
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y items-center">
          {companies.map((company, index) => (
            <div 
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%] min-w-0 px-4 flex justify-center items-center" 
              key={index}
            >
              <div className="h-40 w-64 relative grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <Image 
                  src={company.logo} 
                  alt={company.name} 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}