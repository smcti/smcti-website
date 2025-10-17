import HeadingText from "@components/common/HeadingText"
import { AiOutlineFilePdf } from 'react-icons/ai';
import moment from "moment";

interface RegDoc {
  name: string;
  path: string;
  date: Date;
}

const RegDocs: RegDoc[] = [
  {
    name: "Regimento Parque e decreto",
    path: "assets/docs/2025-05-30 - Regimento Parque e decreto.pdf",
    date: moment("2025-10-17").toDate(),
  },
  {
    name: "Edital Seleção Laboratórios 2025",
    path: "assets/docs/EDITAL_DE_SELECAO_02_2025_LABORATORIOS.pdf",
    date: moment("2025-10-17").toDate(),
  },
   {
    name: "ANEXO II - Art. 7 da Constituição Federal",
    path: "assets/docs/ANEXO II - Art. 7 da Constituição Federal.docx",
    date: moment("2025-10-17").toDate(),
  },
   {
    name: "ANEXO IV - Conhecimento e Concordância do Edital",
    path: "assets/docs/ANEXO IV - Conhecimento e Concordância do Edital.docx",
    date: moment("2025-10-17").toDate(),
  },
   {
    name: "ANEXO V - Termo de Vistoria",
    path: "assets/docs/ANEXO V - Termo de Vistoria.docx",
    date: moment("2025-10-17").toDate(),
  },
   {
    name: "ANEXO VI - Declaração de Dispensa de Vistoria",
    path: "assets/docs/ANEXO VI - Declaração de Dispensa de Vistoria.docx",
    date: moment("2025-10-17").toDate(),
  },
  {
    name: "ANEXO VII - Declaração de ausência de conflitos de interesse da Banca",
    path: "assets/docs/ANEXO VII - Declaração de ausência de conflitos de interesse da Banca.docx",
    date: moment("2025-10-17").toDate(),
  },
  {
    name: "ANEXO VIII - Proposta de Projeto",
    path: "assets/docs/ANEXO VIII - Proposta de Projeto.docx",
    date: moment("2025-10-17").toDate(),
  },
  {
    name: "ANEXO IX - Plano de Ação",
    path: "assets/docs/ANEXO IX - Plano de Ação.docx",
    date: moment("2025-10-17").toDate(),
  }
];


const page = () => {
  return (
    <div>
      <section className="section-default my-32 text-gray-700 flex flex-col gap-8">
        <HeadingText title="Parque Tecnológico" super="Sobre" />
        <div className="flex flex-col gap-4">
          <p>O Parque Tecnológico de Pato Branco é uma estrutura modelo, voltada à pesquisa, extensão e incubação de empresas de base tecnológica. No espaço, é possível criar e desenvolver projetos inovadores, que consolidam o ambiente tecnológico do município e a postura de Pato Branco enquanto Cidade Inteligente, inovadora e conectada com o futuro.</p>
          <p>Inaugurado em 01 de Julho de 2016, o espaço dispõem de estruturas físicas compostas por seis módulos industriais de 553,8 m² cada para empresas âncoras, e 1720 m² divididos em 32 salas de 25 m² cada, destas 8 são ocupadas pela SMCTI e as demais destinadas a empresas incubadas na ITECPB.</p>
        </div>
      </section>
      <section className="section-default my-32 flex flex-col gap-8 text-gray-700">
        <HeadingText title="Dos objetivos" super="Sobre" />
        <div className="flex flex-col gap-4">
          <p>O Parque Tecnológico de Pato Branco é uma estrutura modelo, voltada à pesquisa, extensão e incubação de empresas de base tecnológica. No espaço, é possível criar e desenvolver projetos inovadores, que consolidam o ambiente tecnológico do município e a postura de Pato Branco enquanto Cidade Inteligente, inovadora e conectada com o futuro.</p>
          <p>O Parque Tecnológico tem a finalidade de:</p>
          <p>&nbsp;&bull; Atrair novas atividades de pesquisa, desenvolvimento e produção de bens e serviços inovadores;</p>
          <p>&nbsp;&bull; Incentivar novas iniciativas de base tecnológica;</p>
          <p>&nbsp;&bull; Estimular a transferência de tecnologias para os integrantes do Parque;</p>
          <p>&nbsp;&bull; Estimular a visão empreendedora e oportunidades de trabalho;</p>
          <p>&nbsp;&bull; Aproximar a comunidade dos integrantes do Parque Tecnológico, criando oportunidades para novos projetos de pesquisa tecnológica de ponta</p>
        </div>
        <div>§ 1°. Os objetivos do Parque Tecnológico poderão ser atingidos por meio da interação e cooperação entre instituições de ensino, instituições científicas e tecnológicas, empresas de base tecnológica, entidades ou órgãos da administração pública direta e indireta federal, estadual e municipal.</div>
        <hr />
        <a href="/assets/docs/Regimento-Parque-Tecnologico.pdf" className="link" download><AiOutlineFilePdf />DECRETO Nº 7.863, DE 8 DE DEZEMBRO DE 2015</a>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Regimentos e Documentos" super="Clique e baixe" />
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
  )
}

export default page
