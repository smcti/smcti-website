'use client'

import { useState } from "react";
import Image from "next/image";
import { 
  TrendingUp, 
  Handshake,  
  Settings,   
  X,
  UserCircle2,
  ChevronRight
} from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  photo: string;
  description: string;
}

interface MentorCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  colorTheme: 'purple' | 'blue' | 'emerald';
  mentors: Mentor[];
}

const mentorsData: MentorCategory[] = [
  {
    id: "mercado",
    title: "Mercado",
    description: "Especialistas em branding, growth hacking e validação de mercado.",
    icon: TrendingUp,
    colorTheme: "purple",
    mentors: [
      { id: 101, name: "Ana Marketing", role: "Growth Specialist", photo: "/assets/images/avatar.png", description: "10 anos de experiência escalando startups unicórnio via tráfego pago." },
      { id: 102, name: "João Produto", role: "Product Manager", photo: "/assets/images/avatar.png", description: "Especialista em Roadmap e Product Market Fit." },
      { id: 103, name: "Maria Brand", role: "Branding", photo: "/assets/images/avatar.png", description: "Construção de marcas fortes e identidade visual." },
      { id: 104, name: "Carlos SEO", role: "SEO Expert", photo: "/assets/images/avatar.png", description: "Otimização de busca orgânica e conteúdo." },
      { id: 105, name: "Sofia UX", role: "UX Researcher", photo: "/assets/images/avatar.png", description: "Pesquisa com usuários e testes de usabilidade." },
    ]
  },
  {
    id: "comercial",
    title: "Comercial",
    description: "Mentores focados em vendas B2B, negociação e Customer Success.",
    icon: Handshake,
    colorTheme: "blue",
    mentors: [
      { id: 201, name: "Carlos Vendas", role: "Head de Sales", photo: "/assets/images/avatar.png", description: "Estruturação de máquinas de vendas previsíveis." },
      { id: 202, name: "Fernanda CRM", role: "CS Manager", photo: "/assets/images/avatar.png", description: "Retenção de clientes e estratégias de Upsell." }
    ]
  },
  {
    id: "gestao",
    title: "Gestão",
    description: "Liderança, financeiro e processos ágeis para escalar com segurança.",
    icon: Settings,
    colorTheme: "emerald",
    mentors: [
      { id: 301, name: "Roberto CFO", role: "Investidor Anjo", photo: "/assets/images/avatar.png", description: "Valuation e captação de investimentos." }
    ]
  }
];

export default function MentoresPage() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [activeTheme, setActiveTheme] = useState<string>('blue');

  const handleOpenMentor = (mentor: Mentor, theme: string) => {
    setActiveTheme(theme);
    setSelectedMentor(mentor);
  };

  const getThemeColor = (theme: string) => {
    switch(theme) {
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'emerald': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      <section className="animate-fade-up pt-10">
        <div className="section-default text-center flex flex-col items-center gap-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-200">Nosso Time</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800">
                Rede de Mentores
            </h1>
            <p className="text-gray-500 max-w-2xl text-lg">
                Conecte-se com profissionais experientes prontos para acelerar o seu negócio.
            </p>
        </div>
      </section>

      {mentorsData.map((category) => {
        const Icon = category.icon;
      
        let headerIconColor = "text-blue-600 bg-blue-100";
        let titleGradient = "from-blue-600 to-cyan-500";

        if (category.colorTheme === 'purple') {
            headerIconColor = "text-purple-600 bg-purple-100";
            titleGradient = "from-purple-600 to-fuchsia-500";
        }
        if (category.colorTheme === 'emerald') {
            headerIconColor = "text-emerald-600 bg-emerald-100";
            titleGradient = "from-emerald-600 to-teal-500"; 
        }

        return (
          <section key={category.id} className="animate-fade-up">
            <div className="section-default flex flex-col gap-10">
              <div className="flex flex-col items-center text-center gap-3 border-b border-gray-100 pb-8">
                 <div className={`p-3 rounded-2xl ${headerIconColor} mb-2`}>
                    <Icon size={32} />
                 </div>
                 <h2 className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}>
                    {category.title}
                 </h2>
                 
                 <p className="text-gray-500 max-w-2xl">
                    {category.description}
                 </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 justify-items-center">
                {category.mentors.map((mentor) => (
                   <div 
                     key={mentor.id}
                     className="flex flex-col items-center gap-3 group w-full max-w-[180px]"
                   >
                       <div 
                         className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 border-2 border-dashed border-gray-200 group-hover:border-blue-400 cursor-pointer transition-all duration-300"
                         onClick={() => handleOpenMentor(mentor, category.colorTheme)}
                       >
                           <div className="relative w-full h-full rounded-full overflow-hidden shadow-sm group-hover:shadow-md">
                               <Image 
                                 src={mentor.photo} 
                                 alt={mentor.name} 
                                 fill 
                                 className="object-cover group-hover:scale-110 transition-transform duration-500"
                               />
                           </div>
                       </div>
                       <div className="text-center flex flex-col items-center gap-1 w-full">
                          <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                            {mentor.name}
                          </h4>
                          <button 
                            onClick={() => handleOpenMentor(mentor, category.colorTheme)}
                            className="text-xs font-semibold text-gray-400 hover:text-blue-600 flex items-center gap-1 mt-1 transition-colors uppercase tracking-wide"
                          >
                             Ver Perfil <ChevronRight size={12} />
                          </button>
                       </div>
                   </div>
                ))}
              </div>

            </div>
          </section>
        );
      })}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
             onClick={() => setSelectedMentor(null)}
           ></div>

           <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up animate-duration-300 flex flex-col">
              <div className="relative h-32 bg-gray-100">
                  <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden`}>
                     <Image 
                        src={selectedMentor.photo} 
                        alt={selectedMentor.name} 
                        fill 
                        className="object-cover"
                     />
                  </div>
                  <button 
                    onClick={() => setSelectedMentor(null)}
                    className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
              </div>

              <div className="pt-16 pb-8 px-8 text-center flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">{selectedMentor.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 border ${getThemeColor(activeTheme)}`}>
                        {selectedMentor.role}
                    </span>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="text-left">
                     <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Sobre</h4>
                     <p className="text-gray-600 leading-relaxed text-sm text-justify">
                        {selectedMentor.description}
                     </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2 bg-gray-50 py-2 rounded-lg">
                      <UserCircle2 size={14} /> Mentor verificado ITECPB
                  </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}