"use client";

import CourseCard from "@components/common/CourseCard";
import CourseHeader from "@components/common/CourseHeader";
import PartnerFooter from "@components/common/PartnerFooter";
import courseOpen from "@/public/data/courseOpen.json";
import courseClosed from "@/public/data/courseClosed.json";
import HeadingText from "@components/common/HeadingText";

const page = () => {
  return (
    <>
      <div className="my-32 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">

        <section className="">
          <div className="section-default flex flex-col gap-8 text-gray-700">
            <HeadingText title="Patotech" super="Cursos" />
          </div>
        </section>


        <CourseHeader
          id="21"
          image="/assets/images/cursos/auxiliarinformatica.jpeg"
          title="Auxiliar de Informática
          "
          description="O curso de Auxiliar de Informática aborda os fundamentos do uso do computador, incluindo o sistema operacional Windows, organização de arquivos e pastas, além do uso de ferramentas básicas como editor de texto, planilhas e apresentações. Aprenda a criar e formatar documentos, trabalhar com tabelas, utilizar fórmulas em planilhas e produzir slides. Além da parte técnica, o curso inclui conteúdos voltados ao desenvolvimento pessoal e profissional, como relações interpessoais, ética, cidadania, saúde e segurança no trabalho e consciência ambiental."
          partners="SMCTI e SENAI"
          link="https://docs.google.com/forms/d/e/1FAIpQLSe_zyK4cZ_ZQ_ojiWcSCaDsdr10brWolbyl03xyc9ndhxaq0g/viewform"
        />
        <CourseHeader
          id="19"
          image="/assets/images/cursos/informaticabasica.jpeg"
          title="Informática Básica"
          description="Curso de Informática Básica voltado à introdução dos principais conceitos e ferramentas do uso do computador no dia a dia. Aborda fundamentos de hardware e software, navegação e configurações do sistema operacional Windows, além da utilização prática dos aplicativos Word e Excel, incluindo edição de textos, formatação, fórmulas, gráficos e impressão. Também contempla noções de internet, redes, navegação segura, mecanismos de busca e uso de correio eletrônico.
          Palavra passe: PARCERIAPATOBRANCO"
          partners="SMCTI e SENAC"
          link="https://www.pr.senac.br/cursos/?uep=9&tc=202600064"
        />
        <CourseHeader
          id="22"
          image="/assets/images/cursos/3dparamaes.jpeg"
          title="Impressão 3D para Mães"
          description="O workshop Amor Impresso – 3D para Mães é uma experiência prática e criativa que apresenta, de forma simples e acolhedora, o universo da impressão 3D. As participantes aprendem como transformar ideias em objetos reais, explorando a tecnologia para criar peças personalizadas com significado, unindo inovação, criatividade e emoção."
          partners="SMCTI"
          link="https://docs.google.com/forms/d/e/1FAIpQLSfopUrUHadgdTaIqHAGfLCmDPXHxmwvddvS3seyGPEuLQyS3g/viewform?usp=sharing&ouid=116689063623064374363"
        />
        
      </div>
      <div className="mt-32 flex flex-col h-full bg-cello gap-8 text-white">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Disponíveis:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-between">
            {Object.values(courseOpen).map((item, index) => (
              <CourseCard
                key={index}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                partner={item.partner}
                duration={item.duration}
                isNotOpen={item.isNotOpen}
                redirectUrl={item.link}
              />
            ))}
          </div> 
        </div>
      </div>
      <div className="mt-32 flex flex-col h-full bg-zirco-50 gap-8 text-black">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Indisponíveis:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(courseClosed).map((item, index) => (
              <CourseCard
                key={index}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                partner={item.partner}
                duration={item.duration}
                isNotOpen={item.isNotOpen}
                redirectUrl={item.link}
              />
            ))}
          </div>
        </div>
        <PartnerFooter />
      </div>
    </>
  );
};

export default page;
