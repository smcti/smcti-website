import HeadingText from "@components/common/HeadingText";
import Button from "@components/common/Button";
import { AiOutlineFilePdf } from "react-icons/ai";
import moment from "moment";

interface RegDoc {
  name: string;
  path: string;
  date: Date;
}

const RegDocs: RegDoc[] = [
  /* {
    name: "Edital de Chamada 10.2025",
    path: "/assets/docs/Edital_de_Chamada_01_2024_1.pdf",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Edital de Chamada 01.2024",
    path: "/assets/docs/Edital_de_Chamada_01_2024_1.pdf",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Edital de Seleção 01.2024",
    path: "/assets/docs/Edital_de_Selecao_01_2024_1.pdf",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Modelo Acordo de Confidencialidade",
    path: "/assets/docs/MODELO-ACORDO-DE-CONFIDENCIALIDADE-PARA-BANCA-2.docx",
    date: moment("2023-01-01").toDate(),
  },
  {
    name: "Valor da UFM",
    path: "/assets/docs/UFM_2023_DECRETO_N_9_410.pdf",
    date: moment("2022-12-06").toDate(),
  }
  {
    name: "Regimento da ITECPB",
    path: "/assets/docs/Regimento Interno - Decreto.pdf",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Anexo I: Formulário de Inscrição",
    path: "/assets/docs/Anexo_I_Ficha_de_inscricao.docx",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Anexo II:Formulário de Avaliação Comite Técnico",
    path: "/assets/docs/Anexo_II_Avaliacao_comite_tecnico.docx",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Anexo III: Formulário de Avaliação Banca",
    path: "/assets/docs/Anexo_III_Avaliacao_Banca.pdf",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Anexo  IV: Declaração Proponente",
    path: "assets/docs/Anexo_IV_Declaracao_proponente.docx",
    date: moment("2024-15-08").toDate(),
  },
  {
    name: "Resultados das Inscrições Recebidas",
    path: "assets/docs/Edital_de_Seleção_01-2024_Inscriações_Homologadas.pdf",
    date: moment("2024-19-08").toDate(),
  },
  {
    name: "Convocação para banca pública",
    path: "assets/docs/Copia_de_Convocacao_dos_inscritos_para_a_banca_docx_signed.pdf",
    date: moment("2024-23-08").toDate(),
  },
  {
    name: "Resultado das Inscrições Homologadas - Proponentes Pre-Incubação",
    path: "assets/docs/Resultado_das_Inscrições_Homologadas_etapa01.pdf",
    date: moment("2024-19-12").toDate(),
  },*/
  {
    name: "Ata de Nominação dos Avaliadores das Propostas",
    path: "assets/docs/ata_avaliadores_2025.pdf",
    date: moment("2025-11-13").toDate(),
  },  {
    name: "Ata de Entrega das Propostas para Incubação",
    path: "assets/docs/ata_propostas_2025.pdf",
    date: moment("2025-11-13").toDate(),
  },  {
    name: "Edital Chamamento Incubadora 2025",
    path: "assets/docs/01-EDITAL-DE-CHAMADA-INCUBADORA-25.pdf",
    date: moment("2025-10-03").toDate(),
  },
  {
    name: "Edital Seleção Incubadora 2025",
    path: "assets/docs/01-EDITAL-DE-SELECAO-INCUBADORA-25.pdf",
    date: moment("2025-10-03").toDate(),
  },
   {
    name: "Decreto 10584 e Regimento.pdf",
    path: "assets/docs/Decreto 10584 e Regimento.pdf",
    date: moment("2025-10-03").toDate(),
  },
   {
    name: "Declaração do Proponente.docx",
    path: "assets/docs/Delcaração do Proponente.docx",
    date: moment("2025-10-03").toDate(),
  },
   {
    name: "Proposta do Projeto 2025",
    path: "assets/docs/Proposta do projeto.docx",
    date: moment("2025-10-03").toDate(),
  },
   {
    name: "UFM 2025",
    path: "assets/docs/UFM 2025.pdf",
    date: moment("2025-10-03").toDate(),
  },
    {
    name: "2025-10-09 - Nivelamento da Proposta",
    path: "assets/docs/2025-10-09 - Nivelamento da proposta.pdf",
    date: moment("2025-10-09").toDate(),
  },
];

const page = () => {
  return (
    <div className="my-32 flex flex-col gap-8">
      <section className="">
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="A ITECPB" super="Incubadora" />
          <div className="flex flex-col gap-4">
            <p>
              A Incubadora Tecnológica de Pato Branco (ITECPB) é um espaço onde
              a inovação, tecnologia, conhecimento e network se inter-relacionam
              fomentando o empreendedorismo.
            </p>
            <p>
              É um ambiente que visa oferecer suporte técnico e gerencial às
              empresas de base tecnológica, durante todas as etapas de
              desenvolvimento de negócios.
            </p>
            <p>
              Para isso conta com uma estrutura de 1.720,28 m², especialmente
              montada para apoiar empresas iniciantes, contendo 36 salas
              individuais de 25m² cada, com mobília básica.
            </p>
            <p>
              A ITECPB está lotada na Prefeitura Municipal de Pato Branco, por
              meio da Secretaria Municipal de Ciência, Tecnologia e Inovação
              (SMCTI) e está localizada dentro do Parque Tecnológico de Pato
              Branco.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Nossos objetivos" super="Objetivos" />
          <ul className="flex list-disc flex-col gap-4">
            <li>
              Fomentar, na comunidade regional, o espírito empreendedor, por
              meio do desenvolvimento de projetos de base tecnológica.
            </li>
            <li>
              Subsidiar o surgimento de novos produtos/negócios, a partir de
              produtos inovadores.
            </li>
            <li>
              Ampliar o vínculo entre as Instituições de Ensino Superior – IES e
              o setor empresarial, a partir da formação de nova geração de
              empreendedores, mais vinculada à academia.
            </li>
            <li>
              Contribuir para o desenvolvimento econômico e social do Estado do
              Paraná, incentivando investimentos em atividades geradoras de
              riqueza e trabalho.
            </li>
            <li>
              Reduzir os riscos envolvidos nos processos de geração de novos
              empreendimentos de base tecnológica.
            </li>
            <li>
              Promover a inovação tecnológica, a partir do desenvolvimento de
              produtos, processos e/ou serviços intensivos em conhecimento, que
              atendam e/ou induzam demandas do mercado.
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Público alvo" super="Nosso foco" />
          <div className="flex flex-col gap-4">
            <p>
              Pessoas físicas, maiores de 18 anos, individualmente ou em grupo,
              objetivando selecionar projetos para incubação na ITECPB/PR –
              Incubadora de Empresas de Base Tecnológica de Pato Branco/Paraná,
              cujos produtos, processos ou serviços propostos, sejam de base
              tecnológica, inovadores e alinhados com as áreas de pesquisa
              priorizadas pela Secretaria Municipal de Ciência, Tecnologia e
              Inovação – SMCTI.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Atendimento" super="Nossa agenda" />
          <div className="flex flex-col gap-4">
            <p>
              O atendimento aos incubados é realizado de segunda à sexta-feira
              no período comercial. São ofertadas capacitações para incrementar
              o conhecimento dos incubados nos 5 (cinco) eixos do Centro de
              Referência para Apoio a Novos Empreendimentos – CERNE,
              categorizados como: empreendedor, tecnologia, capital, mercado e
              gestão.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Regimentos e documentos" super="Clique e baixe" />
          <hr />
          <div className="flex flex-col gap-4">
            {RegDocs.map((doc, index) => (
              <div key={index}>
                <a className="link" href={doc.path} download>
                  <AiOutlineFilePdf />
                  <span className="text-sm">
                    {doc.name}
                    {/* {moment(doc.date).format("DD/MM/YYYY")} */}
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

export default page;
