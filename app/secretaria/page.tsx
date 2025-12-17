import HeadingText from "@components/common/HeadingText"
import { AiOutlineFilePdf, AiOutlineFundProjectionScreen} from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import Timeline from "@components/secretaria/Timeline";

const page = () => {
  return (
    <>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700 text-justify">
          <HeadingText title="SMCTI" super="Sobre" />
          <div className="flex flex-col gap-4 text-justify ">
            <p>A Prefeitura de Pato Branco criou a Secretaria Municipal de Ciência, Tecnologia e Inovação através a lei nº 3.999 de 21 de março de 2013.</p>
            <p>Esta secretaria, única no estado do Paraná, tem a missão de “Elaborar, programar e gerir a política municipal de Ciência, Tecnologia e Inovação. Promover e estimular a articulação institucional intersecretarias do município com o universo acadêmico, instituições de pesquisa, empresas, entidades públicas e privadas, e com a sociedade civil organizada”.</p>
            <p>E, dentre as principais incumbências da SMCTI, está a administração do Parque Tecnológico  e da Incubadora Tecnológica de Pato Branco.</p>
            <hr />
            <a className="flex flex-row items-center gap-4 text-cyan-600 underline" href="/assets/docs/3999-Cria-Secretaria-de-Esporte-e-Secretaria-de-Ciencia-e-Tecnologia.pdf" download><AiOutlineFilePdf />Lei Municipal Nº 3.999 de 21 de Março de 2013</a>
            <a className="flex flex-row items-center gap-4 text-cyan-600 underline" href="/projetos"><AiOutlineFundProjectionScreen/> Projetos SMCTI</a>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700 text-justify">
          <HeadingText title="Da Secretaria Municipal de CTI" super="Objetivos e diretrizes" />
          <div className="flex flex-col gap-4 text-justify">
            <p>Art. 38. À Secretaria de Ciência, Tecnologia e Inovação compete:</p>
            <p>I – Formular, planejar e implementar política de fomento ao desenvolvimento do setor cientifico tecnológico e de inovação;</p>
            <p>II – Estabelecer convênios de cooperação nas áreas científica, tecnológica, com instituições públicas e privadas, nacionais e internacionais;</p>
            <p>III – Promover a instituição de mecanismos de natureza física, financeira e institucional que privilegiem o fomento das atividades de desenvolvimento tecnológico e cientifico do Município;</p>
            <p>IV – Estimular o desenvolvimento de atividades de apoio a implantação de empresas do setor tecnológico;</p>
            <p>V – Elaborar e institucionalizar políticas públicas sustentáveis para o desenvolvimento da ciência, tecnologia e inovação no município, atuando com responsabilidade social e econômica;</p>
            <p>VI – Alinhar o planejamento e estratégias da SMCTI às políticas de desenvolvimento da ciência, tecnologia a e inovação em nível estadual (SETI e suas interligadas) e federal (MCT e outros ministérios) com foco nas prioridades e necessidades do município;</p>
            <p>VII – Coordenar e executar a política municipal de ciência e tecnologia e inovação, interagindo com organizações instaladas no município e que atuam nas áreas de ensino, pesquisa e extensão e desenvolvimento tecnológico, tanto público como privadas;</p>
            <p>VIII – Elaborar planos e programas em articulação com as secretarias e demais órgãos, autarquias ou fundações municipais;</p>
            <p>IX – Articular com as demais secretarias o desenvolvimento e incorporação de tecnologias que contribuam para melhorar a qualidade e a eficiências dos serviços públicos prestados à população;</p>
            <p>X – Cooperar com o desenvolvimento e a execução de projetos de interesse das demais secretarias municipais, órgãos e entidades do Poder Executivo Municipal na área de ciência, tecnologia e inovação;</p>
            <p>XI – Estimular a execução de pesquisa básica e aplicada por meio da criação de instrumentos de incentivos e de mecanismos de participação da sociedade;</p>
            <p>XII – Promover e coordenar estudos e pesquisas socioeconômicas e levantamento sistemático de oferta e demanda da ciência e tecnologia e difundir informações para organizações, órgãos e entidades;</p>
            <p>XIII – Criar instrumentos de apoio à divulgação de documentos com o intuito de difundir e popularizar a ciência, tecnologia e inovação e promover o município de Pato Branco;</p>
            <p>XIV – Efetuar contato em níveis estadual, federal e internacional com instituições públicas e privadas, visando obter cooperação técnica e financeira a programas e a intercâmbios de informações de interesse ao desenvolvimento científico e tecnológico do município;</p>
            <p>XV – Programar, em colaboração com entidades públicas e privadas, em níveis municipal, estadual, nacional e internacional, estudos, cursos, seminários, conferências, workshops, feiras e exposições relacionados com o desenvolvimento científico e tecnológico;</p>
            <p>XVI – Incentivar e promover a formação de recursos humanos em níveis universitário e técnico-profissionalizante em consonância com os programas estadual e nacional de qualificação da força de trabalho, alinhada à demanda do setor produtivo e tecnológicos e em parceria com as demais secretarias;</p>
            <p>XVII – Planejar, desenvolver, avaliar as atividades referentes ao Parque Tecnológico e a Incubadora Tecnológica para que esses instrumentos de CT&I contribuam com infraestrutura e processos para a geração de novos empreendimentos de base tecnológica no município e região;</p>
            <p>XVIII – Realizar projetos de captação de recursos financeiros de intercâmbio científico junto aos órgãos de fomento estaduais, federais e internacionais;</p>
            <p>XIX – Consolidar na sociedade do município a percepção de CT&I como área estratégica do desenvolvimento sustentável;</p>
            <p>XX – Elaborar relatórios mensais e anuais, após a consolidação dos dados, referentes aos levantamentos ou às ações efetivamente realizadas com o objetivo de propiciar subsídios aos empresários locais ou àqueles que desejem se estabelecer no Município;</p>
            <p>XXI – Exercer outras atividades correlatas de acordo com a determinação do Chefe do Poder Executivo Municipal.</p>
            <hr />
            <a className="flex flex-row items-center gap-4 text-cyan-600 underline" href="https://sapl.patobranco.pr.leg.br/ta/349/text?print" target="_blank"><BiLinkExternal />Lei Ordinária nº 4.742, de 29 de fevereiro de 2016</a>
          </div>
        </div>
      </section>
      <section>
        <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
          <HeadingText title="Timeline" super="Nosso histórico" />
          <Timeline />
        </div>
      </section>
    </>
  )
}

export default page