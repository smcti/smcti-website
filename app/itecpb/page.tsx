import HeadingText from "@components/common/HeadingText"
import Button from "@components/common/Button"
import { AiOutlineFilePdf } from 'react-icons/ai';

const page = () => {
  return (
    <>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
          <HeadingText title="A ITECPB" super="Incubadora" />
          <div className="flex flex-col gap-4">
            <p>A Incubadora Tecnológica de Pato Branco (ITECPB) é um espaço onde a inovação, tecnologia, conhecimento e network se inter-relacionam fomentando o empreendedorismo.</p>
            <p>É um ambiente que visa oferecer suporte técnico e gerencial às empresas de base tecnológica, durante todas as etapas de desenvolvimento de negócios.</p>
            <p>Para isso conta com uma estrutura de 1.720,28 m², especialmente montada para apoiar empresas iniciantes, contendo 36 salas individuais de 25m² cada, com mobília básica.</p>
            <p>A ITECPB está lotada na Prefeitura Municipal de Pato Branco, por meio da Secretaria Municipal de Ciência, Tecnologia e Inovação (SMCTI) e está localizada dentro do Parque Tecnológico de Pato Branco.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
          <HeadingText title="Nossos objetivos" super="Objetivos" />
          <div className="flex flex-col gap-4">
            <p>&bull;&emsp;Fomentar, na comunidade regional, o espírito empreendedor, por meio do desenvolvimento de projetos de base tecnológica.</p>
            <p>&bull;&emsp;Subsidiar o surgimento de novos produtos/negócios, a partir de produtos inovadores.</p>
            <p>&bull;&emsp;Ampliar o vínculo entre as Instituições de Ensino Superior – IES e o setor empresarial, a partir da formação de nova geração de empreendedores, mais vinculada à academia.</p>
            <p>&bull;&emsp;Contribuir para o desenvolvimento econômico e social do Estado do Paraná, incentivando investimentos em atividades geradoras de riqueza e trabalho.</p>
            <p>&bull;&emsp;Reduzir os riscos envolvidos nos processos de geração de novos empreendimentos de base tecnológica.</p>
            <p>&bull;&emsp;Promover a inovação tecnológica, a partir do desenvolvimento de produtos, processos e/ou serviços intensivos em conhecimento, que atendam e/ou induzam demandas do mercado.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
          <HeadingText title="Público alvo" super="Nosso foco" />
          <div className="flex flex-col gap-4">
            <p>Pessoas físicas, maiores de 18 anos, individualmente ou em grupo, objetivando selecionar projetos para incubação na ITECPB/PR – Incubadora de Empresas de Base Tecnológica de Pato Branco/Paraná, cujos produtos, processos ou serviços propostos, sejam de base tecnológica, inovadores e alinhados com as áreas de pesquisa priorizadas pela Secretaria Municipal de Ciência, Tecnologia e Inovação – SMCTI.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
          <HeadingText title="Atendimento" super="Nossa agenda" />
          <div className="flex flex-col gap-4">
            <p>O atendimento aos incubados é realizado de segunda à sexta-feira no período comercial. São ofertadas capacitações para incrementar o conhecimento dos incubados nos 5 (cinco) eixos do Centro de Referência para Apoio a Novos Empreendimentos – CERNE, categorizados como: empreendedor, tecnologia, capital, mercado e gestão.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
          <HeadingText title="Regimentos e documentos" super="Clique e baixe" />
          <hr />
          <div className="flex flex-col gap-4">
            <a className="link" href="/assets/docs/Decreto-ITECPB-2022.pdf" download><AiOutlineFilePdf />Regimento da ITECPB</a>
            <a className="link" href="/assets/docs/UFM_2023_DECRETO_N_9_410.pdf" download><AiOutlineFilePdf />Valor da UFM</a>
            <a className="link" href="/assets/docs/MODELO-ACORDO-DE-CONFIDENCIALIDADE-PARA-BANCA-2.docx" download><AiOutlineFilePdf />Modelo Acordo de Confidencialidade</a>
          </div>
        </div>
      </section>
     
    </>
  )
}

export default page