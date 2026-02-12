'use client'

import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

interface Company {
  name: string;
  logo: string;
}

interface DynamicCarouselProps {
  companies: Company[];
  direction?: 'forward' | 'backward';
}

export default function DynamicCarousel({ companies, direction = 'forward' }: DynamicCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true }, 
    [
      AutoScroll({ 
        speed: direction === 'forward' ? 0.8 : -0.8,
        stopOnInteraction: false, 
        stopOnMouseEnter: true,   
      })
    ]
  )

  return (
    <div className="w-full py-4 relative">
      <div 
        className="overflow-hidden" 
        ref={emblaRef}
        style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' // Para Safari/Chrome
        }}
      >
        <div className="flex touch-pan-y items-center">
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div 
              className="flex-[0_0_160px] min-w-0 px-4 flex justify-center items-center" 
              key={`${index}-${company.name}`}
            >
              <div className="h-16 w-32 relative">
                <Image 
                  src={company.logo} 
                  alt={company.name} 
                  fill
                  unoptimized
                  className="object-contain mix-blend-multiply" 
                  sizes="160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}