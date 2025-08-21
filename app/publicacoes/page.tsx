import HeadingText from "@components/common/HeadingText";
import { AiOutlineFilePdf } from "react-icons/ai";
import moment from "moment";

const Page = () => {
  return (
    <div className="my-32 flex flex-col gap-8">
      <section className="">
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText
            title="ESTUDO EXPLORATÓRIO — TEA NAS ESCOLAS DE PATO BRANCO"
          />
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Nossos objetivos" super="Objetivos" />
          <p className="flex list-disc flex-col gap-4 pl-5">
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
          <HeadingText title="Relatório técnico" super="Relatório" />
          <div className="flex flex-col gap-4">
            <p>O Relatório Técnico do Estudo Exploratório consolida o contexto, a metodologia, os resultados e as recomendações para a melhoria contínua do atendimento a estudantes com TEA. </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText
            title="Benefícios"
          />
          <p>Geração de uma base de evidências para tomada de decisão; identificação de lacunas e boas práticas; apoio ao planejamento de formações, fluxos de atendimento e estratégias de acompanhamento; e fortalecimento da cooperação entre Ciência, Tecnologia e Inovação, Educação e Saúde para respostas mais rápidas e efetivas às famílias e à comunidade escolar.</p>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Público alvo" super="Público" />
          <div className="flex flex-col gap-4">
            <p>Rede municipal de ensino, gestores públicos, profissionais de Educação e Saúde, conselhos e comitês municipais, famílias e comunidade interessada.
</p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Encaminhamento" super="Encaminhamentos" />
          <div className="flex flex-col gap-4">
            <p>
              Concluída a etapa de análise das propostas submetidas, conduzida
              pela comissão designada e devidamente referendada pelo Conselho
              Municipal de Ciência, Tecnologia e Inovação, iniciou-se o processo
              interno de definição do modelo técnico mais apropriado para a
              contratação dos serviços propostos. Tal definição está sendo
              conduzida com base nas especificidades das propostas recebidas,
              nos princípios da legalidade, economicidade e eficiência, bem como
              na busca por garantir a melhor execução do projeto. Ressalta-se
              que o modelo de contratação será amplamente publicizado tão logo
              esteja finalizado, assegurando a transparência e o acesso à
              informação a todos os interessados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
