"use client";

import { useParams } from "next/navigation";
import { moreAbout } from "@/public/data/moreAbout";
import PartnerFooter from "@components/common/PartnerFooter";

const CoursePage = () => {
  const params = useParams();
  const id = params.curso;

  const course = moreAbout.find((c) => c.id === id);

  if (!course) return <p>Curso não encontrado.</p>;

  return (
    <>
      <div className="section-default">
        <div className="flex flex-col items-center my-24">
          <h1 className="relative text-5xl justify-self-center">
            {course.title}
          </h1>
        </div>
      </div>
      <div className="w-full bg-cello">
      <div className="section-default grid py-16 gap-8 lg:gap-0 bg-cello text-white grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-4 text-justify">
          <p className="text-3xl text-center font-bold">Beneficios</p>
          {course.benefits}
        </div>
        <div className="flex flex-col mx-6 lg:mx-12 gap-2 text-justify">
          <p className="text-3xl text-center font-bold">Detalhes do Curso</p>
          {course.description}
        </div>
      </div>
      </div>
      <div className="section-default flex flex-col gap-4 mt-4 text-justify">
        <h2 className="text-4xl">Reconhecimento do curso</h2>
        <p>
          Receber uma Cisco Digital Badge oferece vantagens significativas, como
          a validação oficial de suas habilidades por uma empresa de renome
          global, facilitando a verificação por empregadores e fortalecendo sua
          marca profissional. As badges podem ser compartilhadas facilmente em
          plataformas online, aumentando sua visibilidade e credibilidade. Além
          disso, elas proporcionam recomendações personalizadas para novos
          aprendizados e acesso a oportunidades de emprego, ajudando você a se
          alinhar com outros especialistas e se destacar em um mercado de
          trabalho competitivo.
        </p>
        <p>
          <strong>IMPORTANTE:</strong> Apenas os estudantes que obtiverem uma
          nota igual ou superior a 70% em qualquer tentativa do exame final
          receberão a insígnia digital. Os alunos que já receberam o distintivo
          deste curso em algum momento não o receberão novamente.
        </p>
      </div>
      <PartnerFooter/>
    </>
  );
};

export default CoursePage;
