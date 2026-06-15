"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Award, BookOpenCheck, Info } from "lucide-react";
import { moreAbout } from "@/public/data/moreAbout";
import PartnerFooter from "@components/common/PartnerFooter";

const richTextStyles =
  "space-y-4 text-sm leading-7 text-slate-700 [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:text-slate-950 [&_u]:font-bold [&_u]:text-slate-950 [&_u]:no-underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

const CoursePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.curso) ? params.curso[0] : params.curso;
  const course = moreAbout.find((item) => item.id === id);

  if (!course) {
    return (
      <div className="-mt-8 bg-zircon-50 text-slate-900">
        <section className="section-default py-20">
          <button
            type="button"
            onClick={() => router.push("/patotech")}
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-cello-600 hover:text-cello-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para PatoTech
          </button>
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Detalhes do curso</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Curso não encontrado</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Não encontramos informações para este curso. Volte para a página PatoTech e escolha uma oportunidade disponível.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const isProgrammingCourse = id === "20" || id === "23" || id === "24";
  const isBasicComputerCourse = id === "19" || id === "21";

  return (
    <div className="-mt-8 bg-zircon-50 text-slate-900">
      <section className="bg-cello-950 text-white">
        <div className="section-default py-16 sm:py-20">
          <button
            type="button"
            onClick={() => router.push("/patotech")}
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para PatoTech
          </button>
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-200">Detalhes do curso</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {course.title}
          </h1>
        </div>
      </section>

      <section className="section-default py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-100 text-cello-800">
                <BookOpenCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Aprendizado</p>
                <h2 className="text-2xl font-black text-slate-950">Benefícios</h2>
              </div>
            </div>
            <div className={richTextStyles}>{course.benefits}</div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                <Info className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Informações</p>
                <h2 className="text-2xl font-black text-slate-950">Detalhes do curso</h2>
              </div>
            </div>
            <div className={richTextStyles}>{course.description}</div>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="section-default py-12 sm:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Reconhecimento</p>
                <h2 className="text-2xl font-black text-slate-950">Como essa formação contribui</h2>
              </div>
            </div>

            {isProgrammingCourse ? (
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  A formação aproxima teoria e prática para que o participante compreenda os fundamentos da programação e consiga aplicar o conhecimento em projetos reais. O foco é construir uma base clara para continuar estudando, desenvolver autonomia e reconhecer oportunidades na área de tecnologia.
                </p>
                <p>
                  Cursos como HTML e CSS e Programador de Sistemas ajudam o aluno a visualizar caminhos de entrada no mercado, com noções essenciais de lógica, desenvolvimento, organização de código e solução de problemas.
                </p>
              </div>
            ) : isBasicComputerCourse ? (
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  A formação fortalece competências digitais para estudo, trabalho e rotina pessoal. O participante desenvolve mais autonomia no uso do computador, organização de arquivos, ferramentas de produtividade e navegação segura.
                </p>
                <p>
                  Esse conhecimento básico amplia a confiança para novas capacitações e melhora o preparo para atividades profissionais que exigem familiaridade com tecnologia.
                </p>
              </div>
            ) : (
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Receber uma Cisco Digital Badge oferece validação oficial de habilidades por uma empresa reconhecida globalmente, facilitando a verificação por empregadores e fortalecendo a presença profissional do participante.
                </p>
                <p>
                  <strong>IMPORTANTE:</strong> Apenas estudantes que obtiverem nota igual ou superior a 70% em qualquer tentativa do exame final receberão a insígnia digital. Alunos que já receberam o distintivo deste curso não o receberão novamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-default py-12 sm:py-16">
        <PartnerFooter />
      </section>
    </div>
  );
};

export default CoursePage;
