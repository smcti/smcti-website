"use client";

import CourseCard from "@components/common/CourseCard";
import CourseHeader from "@components/common/CourseHeader";
import PartnerFooter from "@components/common/PartnerFooter";
import courseOpen from "@/public/data/courseOpen.json";
import courseClosed from "@/public/data/courseClosed.json";

const page = () => {
  return (
    <>
      <div className="my-32 p-6 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">

        <CourseHeader
          id="17"
          image="/assets/images/cursos/python.png"
          title="FUNDAMENTOS DE PYTHON I - Turma Reserva"
          description="Desenvolver habilidades para realizar tarefas de codificação relacionadas com os elementos essenciais da programação na linguagem Python. Conhecer os conceitos universais da programação de computadores, a sintaxe e a semântica da linguagem."
          partners="SMCTI e do DAINF/UTFPR-PB"
          link="https://forms.gle/v5ysiD1oskWm38td9" 
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
