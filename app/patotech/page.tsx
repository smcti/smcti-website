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
          id="20"
          image="/assets/images/cursos/htmlcss.jpeg"
          title="HTML E CSS - CRIAÇÃO DE WEBSITES "
          description="Desenvolver habilidades fundamentais, entender como a web é construída e visualizar-se em uma carreira na área de desenvolvimento front-end. Compreender como as páginas ganham estrutura com HTML, estilo com CSS e como essas linguagens dão vida a sites modernos e acessíveis.
          Palavra passe: PARCERIAPATOBRANCO"
          partners="SMCTI e SENAC"
          link="https://www.pr.senac.br/cursos/?uep=9&tc=202600084"
          date="07/07/2026 a 04/08/2026"
        />

        <CourseHeader
          id="23"
          image="/assets/images/cursos/Programador_Atual.png"
          title="PROGRAMADOR DE SISTEMAS"
          description="Desenvolva habilidades em programação, lógica computacional e desenvolvimento de sistemas com um curso completo e prático. Ideal para quem deseja iniciar na área de tecnologia e se preparar para o mercado de trabalho."
          partners="SMCTI e SENAI"
          link="https://forms.gle/dyxhKeEdaWz7ZpFU8"
          date="16/06/2026 a 12/11/2026"
        />

      </div>
      <div className="mt-32 flex flex-col h-full bg-cello gap-8 text-white">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Em andamento:</p>
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
