const HeaderLoading = () => {
  return (
    <div className="relative z-0 h-[100dvh] -mt-16 overflow-hidden flex flex-col items-center">
            <div className='absolute w-full h-full bg-cello-900  top-0 left-0 z-10 opacity-70'></div>
            <div className='absolute w-full h-full top-0 left-0 z-10'>
                <div className="section-default w-full h-full flex flex-col justify-end items-end ">
                    <div className="w-full relative top-[-10%] left-0">
                        <h1 className="text-zircon font-black lg:text-8xl md:text-7xl sm:text-5xl text-3xl md:text-left text-center">Parque<br />Tecnológico de<br />Pato Branco</h1>
                    </div>
                    <div className='z-20 w-fit glass px-8 py-4 m-4 bg-zircon-50 text-zircon-50 flex sm:flex-row flex-col items-center gap-4'>
                        <div>
                            <h3 className='h-12 text-center text flex items-center'>Pato Branco</h3>
                            <h2 className='text-7xl font-black'>10<span className='text-2xl'> °C</span></h2>
                            <h3 className='h-12 text-center text flex items-center'><strong>Sensação:</strong>&nbsp;200</h3>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='flex flex-row items-center justify-between'>Carregando<div className='w-12 h-12 mr-[-10%]' ></div></div>
                            <div className='flex justify-between'><strong>Vento: </strong>10 Km/h</div>
                            <div className='flex justify-between gap-4'><strong>Rajada: </strong>10 Km/h</div>
                            <div className='h-12 text-center text flex items-center justify-between'><strong>Humidade:</strong>&nbsp;0%</div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
  )
}

export default HeaderLoading