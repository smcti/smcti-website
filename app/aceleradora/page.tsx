import HeadingText from "@components/common/HeadingText";
// CORREÇÃO 2: Caminho de importação ajustado
import { AiOutlineFilePdf } from "react-icons/ai";
import moment from "moment";

interface RegDoc {
  name: string;
  path: string;
  date: Date;
}

const RegDocs: RegDoc[] = [
  {
    name: "Solicitação de Proposta (RFP)",
    path: "/assets/docs/Solicitacao_de_Proposta_2025.pdf",
    // CORREÇÃO 1: Formato da data corrigido para YYYY-MM-DD
    date: moment("2025-05-29").toDate(),
  },
];

const page = () => {
  return (
    <div className="my-32 flex flex-col gap-8">
      <section className="">
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="A aceleradora" super="Aceleradora" />
          <div className="flex flex-col gap-4">
            <p>
              Pato Branco, localizada no sudoeste do Paraná, é reconhecida
              nacionalmente como um dos polos emergentes de tecnologia e
              inovação do Brasil. Com destaque em rankings de qualidade de vida,
              cidades inteligentes e educação, o município abriga um ecossistema
              vibrante composto por universidades, incubadoras, startups e mais
              de 365 empresas de base tecnológica. Seu setor de tecnologia
              responde por 23% do PIB municipal, gerando milhares de empregos e
              oportunidades.
            </p>
            <p>
              Como parte da estratégia de fortalecimento desse ecossistema, a
              Prefeitura Municipal de Pato Branco, por meio da Secretaria de
              Ciência, Tecnologia e Inovação, em parceria com a Universidade
              Tecnológica Federal do Paraná (UTFPR) – Câmpus Pato Branco, está
              estruturando a Aceleradora Tecnológica de Startups no Parque
              Tecnológico.
            </p>
            <p>
              O projeto conta com o apoio da Fundação Araucária, por meio do
              programa SEPARTEC e da Chamada Pública Tadeu Felismino, voltado ao
              incentivo de ambientes promotores de inovação no estado do Paraná.
              A aceleradora irá complementar a jornada de desenvolvimento das
              startups, conectando iniciativas de pré-incubação, incubação e
              apoio institucional já existentes na cidade e na região.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Nossos objetivos" super="Objetivos" />
          <ul className="flex list-disc flex-col gap-4 pl-5">
            <li>
              Planejar estrategicamente e estruturar o modelo de negócios da
              aceleradora.
            </li>
            <li>
              Executar o primeiro ciclo de aceleração: seleção, capacitação,
              mentoria e demoday.
            </li>
            <li>Formar redes locais de mentores e investidores.</li>
            <li>Definir o uso da infraestrutura do Parque Tecnológico.</li>
            <li>Desenvolver um modelo de sustentabilidade de longo prazo.</li>
          </ul>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Como participar" super="Participação" />
          <div className="flex flex-col gap-4">
            <p>
              A chamada está aberta para propostas de instituições
              especializadas, com ou sem fins lucrativos, que operem programas
              de aceleração com histórico comprovado.
            </p>
            <p>
              <strong>Prazo final para envio das propostas: 30/06/2025</strong>
            </p>
            <p>
              As propostas devem ser enviadas até 30 dias após a publicação
              para: <strong>contato@patobranco.tec.br</strong>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Detalhes da Solicitação de Proposta" super="Documentos" />
          <hr />
          <div className="flex flex-col gap-4">
            {RegDocs.map((doc, index) => (
              <div key={index}>
                <a className="link inline-flex items-center gap-2" href={doc.path} download>
                  <AiOutlineFilePdf size={20} />
                  <span className="text-sm">
                    {doc.name}
                    {/* Exemplo de como formatar a data, se desejar exibi-la */}
                    {/* ({moment(doc.date).format("DD/MM/YYYY")}) */}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="section-default flex flex-col gap-8 text-gray-700">
          <HeadingText title="Propostas Recebidas" super="Propostas" />
          <div className="flex flex-col gap-4">
            <p>
              Segue abaixo, em ordem alfabética, a relação de empresas e instituições que
              nos enviaram propostas:
            </p>
            {/* CORREÇÃO 3: Adicionado <ul> para a lista de propostas */}
            <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>ACE</li>
                <li>Alperman</li>
                <li>Darwin</li>
                <li>IEBT Innovation</li>
                <li>Impact HUB</li>
                <li>MOA Ventures</li>
                <li>Ventiur</li>
                <li>Venture HUB</li>
            </ul>

            <p>
              As propostas serão analisadas pelo comitê da Aceleradora, e até o dia
              <strong> 25/07</strong> divulgaremos a proposta (ou propostas) que mais se adequa
              à nossa realidade, para darmos seguimento às análises.
            </p>

            <p>
              Agradecemos a todos que nos enviaram suas propostas!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
