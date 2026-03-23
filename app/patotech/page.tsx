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
          id="19"
          image="/assets/images/cursos/informaticabasica.jpeg"
          title="Informática Básica"
          description="Curso de Informática Básica voltado à introdução dos principais conceitos e ferramentas do uso do computador no dia a dia. Aborda fundamentos de hardware e software, navegação e configurações do sistema operacional Windows, além da utilização prática dos aplicativos Word e Excel, incluindo edição de textos, formatação, fórmulas, gráficos e impressão. Também contempla noções de internet, redes, navegação segura, mecanismos de busca e uso de correio eletrônico."
          partners="SMCTI e SENAC"
          link="https://forms.gle/3z9z6VEM9UgLbMZJA"
        />
        <CourseHeader
          id="20"
          image="/assets/images/cursos/msexcel.jpeg"
          title="MS Excel Operações Essenciais"
          description="Curso introdutório de Excel que apresenta a interface do programa e os conceitos fundamentais, como pasta de trabalho, planilhas e células. Aborda a inserção e organização de dados, além de formatação básica (fonte, alinhamento, bordas e preenchimento). Também explora os principais tipos de valores em células e ensina a realizar cálculos essenciais, como soma, subtração, multiplicação e divisão."
          partners="SMCTI e SENAC"
          link="https://forms.gle/wPkBCafAhg9JV1ya8" 
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
