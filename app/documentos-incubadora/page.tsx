'use client'

import HeadingText from "@components/common/HeadingText";
import moment from "moment";
import { FileDown, Scale, FileCheck, FileText, Calendar } from "lucide-react";

interface RegDoc {
  name: string;
  path: string;
  date: Date;
}

const RegDocsData: RegDoc[] = [
  { name: "Decreto 10584 e Regimento.pdf", path: "assets/docs/Decreto 10584 e Regimento.pdf", date: moment("2025-10-03").toDate() },
  { name: "UFM 2026", path: "assets/docs/UFM_2026.pdf", date: moment("2025-12-15").toDate() },
];

const RegDocs = RegDocsData.sort((a, b) => b.date.getTime() - a.date.getTime());
const DocCard = ({ doc, variant = 'blue' }: { doc: RegDoc, variant?: 'blue' | 'rose' }) => {
  const colors = variant === 'blue' 
    ? { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200', iconBg: 'bg-blue-100', icon: FileText }
    : { bg: 'bg-rose-50', text: 'text-rose-600', border: 'group-hover:border-rose-200', iconBg: 'bg-rose-100', icon: FileCheck };

  const Icon = colors.icon;

  return (
    <a 
      href={doc.path} 
      download
      className={`group relative flex flex-col gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${colors.border}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`p-3 rounded-xl ${colors.iconBg} ${colors.text} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
           <Icon size={24} />
        </div>
        
        <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600 transition-colors">
            <FileDown size={18} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-gray-800 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2" title={doc.name}>
          {doc.name}
        </h3>
        
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mt-1">
          <Calendar size={14} className={colors.text} />
          <span>Atualizado em: {moment(doc.date).format("DD/MM/YYYY")}</span>
        </div>
      </div>

      <div className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${colors.bg} overflow-hidden`}>
          <div className={`h-full w-0 group-hover:w-full ${colors.text.replace('text', 'bg')} transition-all duration-700 ease-out opacity-30`}></div>
      </div>
    </a>
  );
};

export default function DocumentsSection() {
  return (
    <div className="flex flex-col gap-12 relative pb-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent -z-10 pointer-events-none"></div>
        <section className="animate-fade-up animate-delay-200">
            <div className="section-default flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border border-rose-100 rounded-2xl text-rose-600 shadow-sm"><Scale size={28}/></div>
                        <HeadingText title="Regimentos e Documentos" super="Documentos Gerais" />
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-rose-200 via-gray-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {RegDocs.map((doc, index) => (
                        <DocCard key={index} doc={doc} variant="rose" />
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}