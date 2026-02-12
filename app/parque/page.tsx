'use client'

import Reveal from "@components/common/reveal";
import HeadingText from "@components/common/HeadingText";
import moment from "moment";
import { 
  Building2, 
  Target, 
  FileText, 
  CheckCircle2, 
  FileCheck, 
  Calendar,
  FileDown,
  Rocket,
  Scale
} from "lucide-react";

interface RegDoc {
  name: string;
  path: string;
  date: Date;
}

const RegDocsData: RegDoc[] = [
  { name: "Regimento Parque e decreto", path: "assets/docs/2025-05-30 - Regimento Parque e decreto.pdf", date: moment("2025-10-17").toDate() },
  { name: "UFM 2026", path: "assets/docs/UFM_2026.pdf", date: moment("2025-12-15").toDate() }
];

const EditalData: RegDoc[] = [
  { name: "16/12/2025 - Ata de Homologação de Inscrições", path: "assets/docs/Ata_homologação_inscrições.pdf", date: moment("2025-12-16").toDate() },
  { name: "01/12/2025 - Ata para Nominar Avaliadores", path: "assets/docs/ata_nominar_avaliadores_propostas_assinado.pdf", date: moment("2025-12-01").toDate() },
  { name: "01/12/2025 - Ata de Entrega das Propostas", path: "assets/docs/ata_entrega_propostas_assinado.pdf", date: moment("2025-12-01").toDate() },
  { name: "23/12/2025 - Ata de Ratificação", path: "assets/docs/2025-12-23 - Ata de ratificacao assinada.pdf", date: moment("2025-12-23").toDate() },
  { name: "09/01/2026 - Ordem da Banca", path: "assets/docs/2026-01-09 - Ordem da Banca assinado.pdf", date: moment("2026-01-09").toDate() },
  { name: "04/02/2026 - Convocação dos Aprovados", path: "assets/docs/2026-02-04 - Ata do Resultado Final assinada.pdf", date: moment("2026-02-04").toDate() },
  { name: "ANEXO II - Art. 7 da Constituição Federal", path: "assets/docs/ANEXO II - Art. 7 da Constituição Federal.docx", date: moment("2025-10-17").toDate() },
  { name: "ANEXO IV - Conhecimento e Concordância do Edital", path: "assets/docs/ANEXO IV - Conhecimento e Concordância do Edital.docx", date: moment("2025-10-17").toDate() },
  { name: "ANEXO V - Termo de Vistoria", path: "assets/docs/ANEXO V - Termo de Vistoria.docx", date: moment("2025-10-17").toDate() },
  { name: "ANEXO VI - Declaração de Dispensa de Vistoria", path: "assets/docs/ANEXO VI - Declaração de Dispensa de Vistoria.docx", date: moment("2025-10-17").toDate() },
  { name: "ANEXO VII - Declaração de ausência de conflitos de interesse da Banca", path: "assets/docs/ANEXO VII - Declaração de ausência de conflitos de interesse da Banca.docx", date: moment("2025-10-17").toDate() },
  { name: "ANEXO VIII - Proposta de Projeto", path: "assets/docs/ANEXO VIII - Proposta de Projeto.docx", date: moment("2025-10-17").toDate() },
  { name: "ANEXO IX - Plano de Ação", path: "assets/docs/ANEXO IX - Plano de Ação.docx", date: moment("2025-10-17").toDate() },
  { name: "Edital Seleção Laboratórios 2025", path: "assets/docs/EDITAL_DE_SELECAO_02_2025_LABORATORIOS.pdf", date: moment("2025-10-17").toDate() },
  { name: "Ata de Ratificação do Resultado Final Assinado", path: "assets/docs/2026-02-12 - Ata de ratificação do Resultado Final assinado.pdf", date: moment("2026-02-12").toDate() }
];

const RegDocs = RegDocsData.sort((a, b) => b.date.getTime() - a.date.getTime());
const Edital = EditalData.sort((a, b) => b.date.getTime() - a.date.getTime());

const DocCard = ({ doc, variant = 'blue' }: { doc: RegDoc, variant?: 'blue' | 'rose' }) => {
  const colors = variant === 'blue' 
    ? { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200', iconBg: 'bg-blue-100', icon: FileText }
    : { bg: 'bg-rose-50', text: 'text-rose-600', border: 'group-hover:border-rose-200', iconBg: 'bg-rose-100', icon: FileCheck };

  const Icon = colors.icon;

  return (
    <a 
      href={doc.path} 
      download
      className={`group relative flex flex-col gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${colors.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`p-2 rounded-lg ${colors.iconBg} ${colors.text} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
           <Icon size={20} />
        </div>
        
        <div className="p-1.5 rounded-full bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600 transition-colors">
            <FileDown size={16} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-gray-600 transition-colors line-clamp-2" title={doc.name}>
          {doc.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 mt-1">
          <Calendar size={12} className={colors.text} />
          <span>{moment(doc.date).format("DD/MM/YYYY")}</span>
        </div>
      </div>

      <div className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${colors.bg} overflow-hidden`}>
          <div className={`h-full w-0 group-hover:w-full ${colors.text.replace('text', 'bg')} transition-all duration-700 ease-out opacity-30`}></div>
      </div>
    </a>
  );
};

const ParqueTecnologicoPage = () => {
  return (
    <div className="flex flex-col gap-16 py-20 pb-32 text-justify bg-slate-50 min-h-screen relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-full h-[1500px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent -z-10 pointer-events-none"></div>

      <Reveal>
        <section className="section-default">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Building2 size={28}/></div>
                    <HeadingText title="Parque Tecnológico" super="Sobre" />
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -mr-8 -mt-8"></div>

                    <div className="flex flex-col gap-6 relative z-10 text-gray-600 leading-relaxed text-lg">
                        <p>
                            O <strong className="text-blue-600">Parque Tecnológico de Pato Branco</strong> é uma estrutura modelo, voltada à pesquisa, extensão e incubação de empresas de base tecnológica. No espaço, é possível criar e desenvolver projetos inovadores, que consolidam o ambiente tecnológico do município e a postura de Pato Branco enquanto Cidade Inteligente, inovadora e conectada com o futuro.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 mt-2">
                             <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm"><Building2 size={20}/></div>
                                <div>
                                    <span className="block font-bold text-gray-800 text-lg">6 Módulos</span>
                                    <span className="text-xs text-gray-500 uppercase">Industriais (553m² cada)</span>
                                </div>
                             </div>
                             <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm"><Target size={20}/></div>
                                <div>
                                    <span className="block font-bold text-gray-800 text-lg">32 Salas</span>
                                    <span className="text-xs text-gray-500 uppercase">Incubação (25m² cada)</span>
                                </div>
                             </div>
                        </div>
                        <p>
                            Inaugurado em 01 de Julho de 2016, o espaço dispõe de estruturas físicas robustas destinadas a empresas âncoras, SMCTI e empresas incubadas na ITECPB.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-white py-16 border-y border-gray-100">
            <div className="section-default flex flex-col gap-10 text-gray-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600"><Target size={28}/></div>
                    <HeadingText title="Dos Objetivos" super="Finalidade" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "Atrair novas atividades de pesquisa, desenvolvimento e produção de bens e serviços inovadores.",
                        "Incentivar novas iniciativas de base tecnológica.",
                        "Estimular a transferência de tecnologias para os integrantes do Parque.",
                        "Estimular a visão empreendedora e oportunidades de trabalho.",
                        "Aproximar a comunidade dos integrantes do Parque, criando oportunidades para novos projetos.",
                        "Promover cooperação entre ensino, empresas e poder público."
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 group">
                            <CheckCircle2 className="text-green-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                            <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                        </div>
                    ))}
                </div>
                
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-yellow-800 text-sm italic text-center">
                    § 1°. Os objetivos do Parque Tecnológico poderão ser atingidos por meio da interação e cooperação entre instituições de ensino, instituições científicas e tecnológicas, empresas de base tecnológica e órgãos públicos.
                </div>
            </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section-default flex flex-col gap-12">
            
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border border-blue-100 rounded-2xl text-blue-600 shadow-sm"><Rocket size={28}/></div>
                        <HeadingText title="Edital Seleção 2025" super="Processo Seletivo" />
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-blue-200 via-gray-200 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Edital.map((doc, index) => (
                        <DocCard key={index} doc={doc} variant="blue" />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border border-rose-100 rounded-2xl text-rose-600 shadow-sm"><Scale size={28}/></div>
                        <HeadingText title="Regimentos e Documentos" super="Downloads Gerais" />
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-rose-200 via-gray-200 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {RegDocs.map((doc, index) => (
                        <DocCard key={index} doc={doc} variant="rose" />
                    ))}
                </div>
            </div>

        </section>
      </Reveal>

    </div>
  )
}

export default ParqueTecnologicoPage