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
          id="15"
          image="/assets/images/cursos/python.png"
          title="FUNDAMENTOS DE PYTHON I - ONLINE"
          description="Desenvolver habilidades para realizar tarefas de codificação relacionadas com os elementos essenciais da programação na linguagem Python. Conhecer os conceitos universais da programação de computadores, a sintaxe e a semântica da linguagem."
          partners="SMCTI e do DAINF/UTFPR-PB"
          link="https://forms.gle/waivq8BnawS4SQucA"
        />
        <CourseHeader
          id="17"
          image="/assets/images/cursos/python.png"
          title="FUNDAMENTOS DE PYTHON I - Turma Reserva"
          description="Desenvolver habilidades para realizar tarefas de codificação relacionadas com os elementos essenciais da programação na linguagem Python. Conhecer os conceitos universais da programação de computadores, a sintaxe e a semântica da linguagem."
          partners="SMCTI e do DAINF/UTFPR-PB"
          link="https://forms.gle/v5ysiD1oskWm38td9" 
        />
        <CourseHeader
          id="1"
          image="/assets/images/cursos/defesa_rede.png"
          title="DEFESA DE REDE - ANALISTA DE CIBERSEGURANÇA JÚNIOR - Online"
          description="Nesse curso você irá obter o conhecimento básico que você usará nolocal de trabalho como Analista de Cibersegurança Júnior. Este curso aborda maneiras de monitorar sua rede e como avaliar alertas de segurança."
          partners="SMCTI, UTFPR e CISCO"
          link="https://forms.gle/MiGhD86S1zYai6gJ8"
        />
        <CourseHeader
        id= "16"
        image= "/assets/images/cursos/robotica.jpg"
        title= "Introdução à Robótica Móvel com Arduino - Cadastro de Interessados"
        description= "O curso oferece uma introdução à robótica móvel, abordando teoria e prática da locomoção autônoma em robôs seguidores de linha e lutadores de sumô. Os alunos aprenderão eletrônica básica, microcontroladores e programação, desenvolvendo projetos com Arduino até a construção e programação desses robôs."
        partners= "SMCTI e do DAINF/UTFPR-PB"
        link= "https://forms.gle/wypBEPF8kCoJYqiA9"
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
