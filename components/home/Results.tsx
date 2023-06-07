import resultsJson from '@public/data/resultsStartups.json'

interface ResultsData {
  [key: number]: {
    valor: string;
    arrecadamentos: {
      federal: string;
      estadual: string;
      municipal: string;
      empregos: string;
    };
  };
}

const results: ResultsData = resultsJson;


const Results = () => {
  let ano = 2021;

  return (
    <section className="bg-cello text-zircon-50 py-32">
      <div className="section-default flex flex-col gap-8 lg:gap-16 items-center">
        <h2 className='font-black text-2xl
          sm:text-3xl
          lg:text-4xl'>Resultados { ano }</h2>
        <h3 className="font-black text-3xl text-cyan-400
          sm:text-5xl
          lg:text-6xl">R$ { results[ano]?.valor }</h3>
        <p className='lg:text-2xl sm:text-xl text-lg text-center font-semibold'>Em faturamento das empresas âncoras e incubadas no parque</p>
        <div className="flex flex-col gap-8 w-full font-black 
        lg:flex-row lg:justify-between">
          {
            Object.values(results[ano]?.arrecadamentos).map((item, index) => {
              return (
                <>
                  <div className="flex flex-col gap-2 items-center">
                    <h4 className='text-3xl text-cyan-400
                      sm:text-4xl
                      lg:text-5xl'>{item}</h4>
                    <p>{Object.keys(results[ano]?.arrecadamentos)[index] != 'empregos' ?
                      `Arrecadação ${Object.keys(results[ano]?.arrecadamentos)[index]}` :
                      'Empregos registrados'}</p>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Results