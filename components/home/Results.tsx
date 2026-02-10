'use client' // Necessário pois usa o AnimatedCounter

import resultsJson from "@public/data/resultsStartups.json";
import AnimatedCounter from '@/components/common/AnimatedCounter';

// Interface mantida igual
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
  let ano = 2022;
  const currentData = results[ano];

  // FUNÇÃO 1: Trata o valor monetário grande (Ex: "93.715.408,15")
  const parseCurrency = (str: string) => {
    if (!str) return 0;
    // Remove pontos de milhar e troca vírgula por ponto para o JS entender
    const cleanString = str.replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanString);
  };

  // FUNÇÃO 2: Trata valores com texto (Ex: "3.262M+" ou "260")
  const parseStat = (str: string) => {
    if (!str) return { value: 0, suffix: '' };
    const numericString = str.replace(/[^0-9.,]/g, ''); 
    const suffix = str.replace(/[0-9.,]/g, '');
    let value = parseFloat(numericString);

    return { value, suffix };
  };

  // Prepara o valor principal
  const mainValue = parseCurrency(currentData?.valor);

  return (
    <section className="bg-cello text-zircon-50 py-32">
      <div className="section-default flex flex-col gap-8 lg:gap-16 items-center">
        <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl">
          Resultados {ano}
        </h2>
        
        {/* --- VALOR PRINCIPAL --- */}
        <h3 className="font-black text-3xl text-cyan-400 sm:text-5xl lg:text-6xl">
          <AnimatedCounter 
             value={mainValue}
             prefix="R$ "
             separator="."
             decimal=","
             decimals={2} // Força 2 casas decimais para dinheiro
             duration={3}
          />
        </h3>
        
        <p className="lg:text-2xl sm:text-xl text-lg text-center font-semibold">
          Em faturamento das empresas âncoras e incubadas no parque
        </p>

        <div className="flex flex-col gap-8 w-full font-black lg:flex-row lg:justify-between">
          
          {/* --- LOOP DOS ARRECADAMENTOS --- */}
          {currentData?.arrecadamentos && Object.entries(currentData.arrecadamentos).map(([key, rawValue]) => {
             // Processa o valor e o sufixo (ex: value=3.262, suffix="M+")
             const { value, suffix } = parseStat(rawValue);
             
             // Define se precisa de decimais (Empregos não tem, Milhões tem)
             const numDecimals = key === 'empregos' ? 0 : 3;

             return (
               <div key={key} className="flex flex-col gap-2 items-center">
                 <h4 className="text-3xl text-cyan-400 sm:text-4xl lg:text-5xl">
                   <AnimatedCounter 
                      value={value}
                      suffix={suffix} // Adiciona o "M+" ou "+" ao final
                      separator="."
                      decimal="," // Usa vírgula se houver decimal (ex: 3,262)
                      decimals={value % 1 !== 0 ? numDecimals : 0} // Só mostra decimal se o número não for inteiro
                   />
                 </h4>
                 <p className="capitalize">
                   {key !== "empregos"
                     ? `Arrecadação ${key}`
                     : "Empregos registrados"}
                 </p>
               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Results;