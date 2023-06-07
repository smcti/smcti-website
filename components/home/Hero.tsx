'use client'
import HeaderLoading from './HeaderLoading';

import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [data, setData]: [data: any, setData: any]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const apiKey = 'a09e34cbcb4ffbbdd9c0d41d7e785b26';
        const units = 'metric';
        const lang = 'pt_br';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=pato%20branco&appid=${apiKey}&lang=${lang}&units=${units}`,
          { next: {revalidate: 240} }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (loading) {
    return <HeaderLoading />; // Render a loading state while data is being fetched
  }

  return (
    <header>
        <div className="relative z-0 h-[100dvh] -mt-16 overflow-hidden flex flex-col items-center">
            <div className='absolute w-full h-full bg-cello-900  top-0 left-0 z-10 opacity-70'></div>
            <iframe src="https://player.vimeo.com/video/733797633?h=1f62ec9502&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;loop=1&amp;autoplay=1&amp;background=1&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" className="top-0 left-0 min-w-[1920px] h-full scale-150 transform-gpu" title="homepage_smcti"></iframe>
            <div className='absolute w-full h-full top-0 left-0 z-10'>
                <div className="section-default w-full h-full flex flex-col justify-end items-end ">
                    <div className="w-full relative top-[-10%] left-0">
                        <h1 className="text-zircon font-black lg:text-8xl md:text-7xl sm:text-5xl text-3xl md:text-left text-center">Parque<br />Tecnológico de<br />Pato Branco</h1>
                    </div>
                    {data && (
                        <div className='z-20 w-fit glass px-8 py-4 m-4 text-zircon-50 flex sm:flex-row flex-col items-center gap-4'>
                            <div>
                                <h3 className='h-12 text-center text flex items-center'>{data.name}</h3>
                                <h2 className='text-7xl font-black'>{Math.round(data.main.temp)}<span className='text-2xl'> °C</span></h2>
                                <h3 className='h-12 text-center text flex items-center'><strong>Sensação:</strong>&nbsp;{Math.round(data.main.feels_like)}</h3>
                            </div>
                            <div className='flex flex-col justify-between h-full'>
                                <div className='flex flex-row items-center justify-between'>{data.weather[0].description}<img className='w-12 h-12 mr-[-10%]' src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" /></div>
                                <div className='flex justify-between'><strong>Vento: </strong>{data.wind.speed} Km/h</div>
                                <div className='flex justify-between gap-4'><strong>Rajada: </strong>{data.wind.gust} Km/h</div>
                                <div className='h-12 text-center text flex items-center justify-between'><strong>Humidade:</strong>&nbsp;{data.main.humidity}%</div>
                            </div>    
                        </div>
                    )}
                </div>
            </div>
        </div>
        {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
    </header>
  );
};

export default Hero;
