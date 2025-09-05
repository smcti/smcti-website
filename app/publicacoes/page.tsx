import HeadingText from "@components/common/HeadingText";
import { AiOutlineFilePdf } from "react-icons/ai";
import moment from "moment";

interface RegDoc {
  name: string;
  path: string;
  date: Date;
}

const RegDocs: RegDoc[] = [
  {
    name: "Relatório Técnico Realidade de Crianças com Transtorno do Espectro Autista nas Escolas de Pato Branco",
    path: "/assets/docs/Relatório Técnico_ Realidade de Crianças com Transtorno do Espectro Autista nas Escolas de Pato Branco.pdf",
    date: moment("2025-09-28").toDate(),
  },
  {
    name: "Anprotec 2025",
    path: "/assets/docs/Anprotec_2025_VersaoFinalDOC_162.pdf",
    date: moment("2025-09-28").toDate(),
  },
];

const Page = () => {
  return (
    <div className="my-32 flex flex-col gap-8">
      <section className="">
        <div className="section-default flex flex-col gap-8 ">
          <h2 className="font-black text-2xl sm:text-5xl ">ESTUDO EXPLORATÓRIO — TEA NAS ESCOLAS DE PATO BRANCO</h2>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Nossos objetivos" />
          <p className="flex flex-col gap-4">
            Atendendo à demanda da Secretaria Municipal de Educação para
            compreender, com base em evidências, os principais desafios e
            necessidades relacionados à inclusão e ao processo de aprendizagem
            de estudantes com Transtorno do Espectro Autista (TEA) na rede
            municipal. O estudo foi articulado em parceria com a Secretaria
            Municipal de Saúde, visando integrar perspectivas educacionais e de
            saúde para subsidiar decisões, políticas e ações formativas.
          </p>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Relatório técnico" />
          <div className="flex flex-col gap-4">
            <p>
              O Relatório Técnico do Estudo Exploratório consolida o contexto, a
              metodologia, os resultados e as recomendações para a melhoria
              contínua do atendimento a estudantes com TEA.{" "}
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Benefícios" />
          <p>
            Geração de uma base de evidências para tomada de decisão;
            identificação de lacunas e boas práticas; apoio ao planejamento de
            formações, fluxos de atendimento e estratégias de acompanhamento; e
            fortalecimento da cooperação entre Ciência, Tecnologia e Inovação,
            Educação e Saúde para respostas mais rápidas e efetivas às famílias
            e à comunidade escolar.
          </p>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Público alvo" />
          <div className="flex flex-col gap-4">
            <p>
              Rede municipal de ensino, gestores públicos, profissionais de
              Educação e Saúde, conselhos e comitês municipais, famílias e
              comunidade interessada.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Documentos" />
          <hr />
          <div className="flex flex-col gap-4">
            {RegDocs.map((doc, index) => (
              <div key={index}>
                <a className="link inline-flex items-center gap-2" href={doc.path} download>
                  <AiOutlineFilePdf size={20} />
                  <span className="text-sm">
                    {doc.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
