import { useMemo } from "react";
import Image from "next/image";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone,
  Layers
} from "lucide-react";

interface EmpresaAncora {
  id: number;
  name: string;
  logo: string;
  description: string;
  segmento: string;
  email: string;
  phone: string;
}

const ancorasData: EmpresaAncora[] = [
  { 
    id: 1,
    name: "Akiyama", 
    logo: "/assets/images/logos-empresas_ancoras/akiyama.png",
    description: "Ê uma empresa de tecnologia especializada em soluções de identificação biométrica, reconhecimento facial, autenticação de pessoas e automação industrial.",
    segmento: "Tecnologia / Automação",
    email: "contato@akiyama.com.br",
    phone: "(  )     -    ",
  },
  { 
    id: 2,
    name: "Bitz Softwares", 
    logo: "/assets/images/logos-empresas_ancoras/bitz.png",
    description: "Simplificar e modernizar a gestão do setor de hospitalidade brasileiro.",
    segmento: "Software",
    email: "contato@bitzsoftwares.com.br",
    phone: "(  )     -    ",
  },
  { 
    id: 3,
    name: "Emitelli", 
    logo: "/assets/images/logos-empresas_ancoras/emitelli.png",
    description: "Ê uma empresa brasileira especializada na montagem de placas eletrônicas e produtos finais.",
    segmento: "Eletrônica",
    email: "contato@emitelli.com.br",
    phone: "(  )     -    ",
  },
   { 
    id: 4,
    name: "Gás Facil", 
    logo: "/assets/images/logos-empresas_ancoras/gasfacil.png",
    description: "É uma rede de lojas autônomas pioneira na venda de botijões de gás de cozinha (GLP), operando com tecnologia de autoatendimento.",
    segmento: "Varejo / Automação",
    email: "contato@gasfacil.com.br",
    phone: "(  )     -    ",
  },
   { 
    id: 5,
    name: "Softfocus", 
    logo: "/assets/images/logos-empresas_ancoras/softfocus.png",
    description: "A Softfocus impulsiona a prosperidade no agronegócio unindo pessoas, crédito e tecnologia. Desenvolvemos soluções ágeis para instituições financeiras.",
    segmento: "Agritech",
    email: "contato@softfocus.com.br",
    phone: "(  )     -    ",
  }
];

export default function EmpresasPage() {
  const sortedAncoras = useMemo(() => {
    return [...ancorasData].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, []);

  return (
    <section className="py-16 overflow-hidden relative min-h-screen z-0 bg-slate-50">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent -z-10 pointer-events-none"></div>

        <div className="section-default flex flex-col gap-8 mb-12 px-4 max-w-7xl mx-auto relative z-10">
           <div className="text-center flex flex-col items-center gap-4">
               <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-100 shadow-sm animate-fade-down">
                 <Building2 size={14} className="animate-pulse" /> Ecossistema
               </span>
               <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight animate-fade-up">
                 Empresas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Âncoras</span>
               </h2>
               <p className="text-gray-500 max-w-2xl text-lg animate-fade-up animate-delay-100">
                   Conheça as empresas estabelecidas no Parque Tecnológico que impulsionam o desenvolvimento regional.
               </p>
           </div>
        </div>

        <div className="section-default px-4 max-w-7xl mx-auto pb-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {sortedAncoras.map((item, idx) => (
                 <div 
                   key={item.id}
                   className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 border border-gray-100 group flex flex-col overflow-hidden hover:-translate-y-2 h-full animate-fade-up"
                   style={{ animationDelay: `${idx * 100}ms` }}
                 >
                     <div className="h-44 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-8 border-b border-gray-50 relative group-hover:from-blue-50/50 group-hover:to-white transition-colors duration-500">
                         <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                             <Image 
                               src={item.logo} 
                               alt={item.name} 
                               fill
                               unoptimized
                               className="object-contain drop-shadow-sm"
                             />
                         </div>
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm border border-gray-100 flex items-center gap-1.5 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                            <Layers size={10} /> {item.segmento}
                         </div>
                     </div>
                     
                     <div className="p-6 flex flex-col flex-grow relative">
                        <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full"></div>

                        <div className="mb-4">
                           <h4 className="text-xl font-black text-gray-800 mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
                             {item.name}
                           </h4>
                           <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-medium">
                             {item.description}
                           </p>
                        </div>

                        <div className="pt-4 border-t border-gray-50 mt-auto flex flex-col gap-2.5">
                           <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                              <Mail size={16} className="text-blue-500 shrink-0" />
                              <span className="truncate">{item.email}</span>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                              <Phone size={16} className="text-blue-500 shrink-0" />
                              <span className="truncate">{item.phone}</span>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                              <MapPin size={14} className="text-gray-300" /> Pato Branco
                           </div>
                        </div>
                     </div>
                 </div>
              ))}
           </div>
        </div>
    </section>
  );
}
