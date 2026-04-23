import ParqTec from "@components/home/ParqTec";
import Results from "@components/home/Results";
import Labs from "@components/home/Labs";
import Itecpb from "@components/home/Itecpb";
import Booking from "@components/home/Booking";
import Hero from "@components/home/Hero";
import Graduados from "@components/home/Graduados";
import Reveal from "@components/common/reveal"; 

// Importe o componente do formulário que criamos. 
// Ajuste o caminho '@components/...' dependendo da pasta exata onde você salvou o arquivo CurriculoForm.tsx
// import CurriculoForm from "@components/common/CurriculoForm"; 

export const metadata = {
  title: "Home",
  description:
    "Página inicial do website da Secretaria Municipal de Ciência, Tecnologia e Inovação",
};

const Home = () => {
  return (
    <>
      <Hero />
      <Reveal>
        <ParqTec />
      </Reveal>
      <Reveal>
        <Results />
      </Reveal>
      <Reveal>
        <Labs />
      </Reveal>
      <Reveal>
        <Itecpb />
      </Reveal>
      <Reveal>
        <Graduados />
      </Reveal>
      <Reveal>
        <Booking />
      </Reveal>
      
      {/* Nova Seção: Banco de Talentos / Envio de Currículos (Comentada temporariamente) */}
      {/* <Reveal>
        <section className="py-16 bg-gray-50" id="banco-de-talentos">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Banco de Talentos</h2>
              <p className="text-gray-600 mt-4">
                Quer fazer parte do ecossistema de inovação? Envie seu currículo e conecte-se com as empresas e startups do nosso Parque Tecnológico.
              </p>
            </div>
            
            <CurriculoForm />
            
          </div>
        </section>
      </Reveal> 
      */}
    </>
  );
};

export default Home;