'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import HeadingText from "@components/common/HeadingText";
import Reveal from "@components/common/reveal";
import { 
    Building2, Target, CheckCircle2, Users, Clock, Mail, Phone, X, 
    Scale, Star, Handshake, CalendarDays, ArrowRight,
    Zap, Lightbulb, TrendingUp, Share2, Camera, ChevronLeft, ChevronRight
} from "lucide-react";

const galleryData = [
    {
        src: "/assets/images/fotos/parqueentrada.png", 
        description: "Ambientes colaborativos projetados para estimular a criatividade."
    },
    {
        src: "/assets/images/fotos/parqueemcima.png",
        description: "Ambiente que fomenta novas ideias."
    },
    {
        src: "/assets/images/fotos/incubados.png",
        description: "Boas-vindas às novas startups que integram nosso ecossistema de inovação."
    },
    {
        src: "/assets/images/fotos/assinatura.png",
        description: "Momentos de troca de experiência entre empreendedores e mentores."
    }
];

const benefitsData = [
    { 
        title: "Consultoria", 
        description: "Acesso direto a especialistas de mercado e consultores para guiar sua jornada.", 
        icon: Users, 
        color: "text-blue-600", 
        bg: "bg-blue-50", 
        border: "border-blue-200" 
    },
    { 
        title: "Networking Estratégico", 
        description: "Conexão com ecossistema local, universidades e outras startups da região.", 
        icon: Share2, 
        color: "text-purple-600", 
        bg: "bg-purple-50", 
        border: "border-purple-200" 
    },
    { 
        title: "Cultura de Inovação", 
        description: "Ambiente onde ideias inovadoras são criadas aqui todos os dias.", 
        icon: Lightbulb, 
        color: "text-amber-600", 
        bg: "bg-amber-50", 
        border: "border-amber-200" 
    },
    { 
        title: "Incubadora Certificada CERNE I", 
        description: "Metodologia que organiza e qualifica o apoio às ideias, transformando projetos em negócios estruturados e escaláveis dentro do ambiente de inovação.", 
        icon: TrendingUp, 
        color: "text-emerald-600", 
        bg: "bg-emerald-50", 
        border: "border-emerald-200" 
    },
]
const statsData = [
    { icon: Scale, value: "20", label: "StartUps Incubadas", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-500" },
    { icon: Building2, value: "+70", label: "Empreendimentos passaram por aqui!", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-500" },
    { icon: Star, value: "+15", label: "Graduadas", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-500" },
];

const contactsData = [
    {
        id: 1,
        name: "Ana Claudia Marques",
        role: "Assessora do Departamento de Incubadora",
        photo: "/assets/images/ana.png", 
        email: "diretora.itecpb@patobranco.tec.br",
        phone: "(46) 9937-2377"
    },
    {
        id: 2,
        name: "Nelito Antônio Zanmaria",
        role: "Assistente de Gestão",
        photo: "/assets/images/nelito.png", 
        email: "itecpb@patobranco.tec.br",
        phone: "(46) 9115-3505"
    }
];

export default function AboutSection() {
  const [selectedContact, setSelectedContact] = useState<typeof contactsData[0] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
        nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-16 text-justify pb-10 relative overflow-hidden">
        
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10 pointer-events-none"></div>
      <Reveal>
        <section className="animate-fade-up animate-duration-700">
            <div className="section-default flex flex-col gap-6 text-gray-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white border border-blue-100 rounded-2xl text-blue-600 shadow-sm"><Building2 size={28}/></div>
                    <HeadingText title="A ITECPB" super="Incubadora Tecnológica" />
                </div>
                
                <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm">
                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-r-full"></div>
                    <div className="flex flex-col gap-4 text-lg leading-relaxed pl-4 text-gray-600">
                        <p>
                        A <strong className="text-gray-900">Incubadora Tecnológica de Pato Branco (ITECPB)</strong> é o ponto de partida ideal para empresas nascentes de base tecnológica que
                        buscam transformar suas ideias inovadoras em negócios sólidos e sustentáveis.
                        </p>
                        <p>
                        Somos um ecossistema dinâmico, onde a inovação, tecnologia, conhecimento e networking se entrelaçam para guiar empreendedores desde a concepção até a maturidade de suas empresas. 
                        Nosso propósito é oferecer o suporte estratégico necessário para que cada negócio supere os desafios iniciais e consolide seu lugar no mercado.
                        </p>
                        <p>
                        Com um suporte técnico e gerencial especializado, acompanhamos cada etapa do desenvolvimento, fornecendo consultoria e a realização de eventos para que as empresas prosperem. 
                        Nossa infraestrutura de <strong className="text-gray-900">1.720,28m²</strong>, incluindo salas individuais de <strong className="text-gray-900">25m²</strong> prontas para uso, foi projetada para ser um catalisador de crescimento, 
                        proporcionando um ambiente propício para a aceleração e a profissionalização.
                        </p>
                        <p>
                        Na <strong className="text-gray-900">ITECPB</strong>, acreditamos no potencial das ideias e trabalhamos para que cada empresa nascente se transforme em um caso de sucesso, 
                        impulsionando a economia e a tecnologia em Pato Branco.    
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mt-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            Localizada no Parque Tecnológico de Pato Branco (SMCTI).
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="animate-fade-up animate-delay-200">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-100/40 via-purple-50/20 to-transparent blur-3xl -z-10"></div>
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-6 md:p-10 shadow-lg ring-1 ring-black/5 relative overflow-hidden">
                    <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
                        <h3 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">
                            Números que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Impactam</span>
                        </h3>
                        <p className="text-gray-600 text-lg mt-2 font-medium">
                            Resultados reais que mostram a força do nosso ecossistema.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                        {statsData.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                            <div key={index} className={`bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border-b-[6px] ${stat.border} relative overflow-hidden`}>
                                <div className={`mb-3 p-3 rounded-full ${stat.bg} ${stat.color} bg-opacity-50 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={28} strokeWidth={2.5} />
                                </div>
                                <span className={`text-2xl md:text-4xl font-black mb-1 text-gray-800 tracking-tight`}>
                                    {stat.value}
                                </span>
                                <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="animate-fade-up animate-delay-200 py-4 relative">
             <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#444cf7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
             <div className="section-default">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-2 bg-purple-50 rounded-xl text-purple-600 mb-4 border border-purple-100">
                        <Zap size={24} className="animate-pulse"/>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                        Por que ser <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Incubado?</span>
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
                        Muito mais que um espaço físico. Oferecemos o ambiente ideal para sua startup decolar.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefitsData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="group relative bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-current ${item.color}`}></div>
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className={`p-4 rounded-2xl ${item.bg} ${item.color} ${item.border} border shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={32} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
             </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="animate-fade-up animate-delay-300 py-6">
            <div className="section-default flex flex-col gap-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-700 shadow-sm"><Camera size={28}/></div>
                    <HeadingText title="Vivendo a Inovação" super="Espaço e Pessoas" />
                </div>
                <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-white group">
                    {galleryData.map((slide, index) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <div className="relative w-full h-full">
                                <Image 
                                    src={slide.src}
                                    alt = ""
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                                    Destaque
                                </span>
                                <p className="text-gray-200 text-sm md:text-base max-w-2xl font-medium">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    <button onClick={prevSlide} className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-110">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-110">
                        <ChevronRight size={32} />
                    </button>
                    <div className="absolute bottom-6 right-8 z-20 flex gap-2">
                        {galleryData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="animate-fade-up animate-delay-300">
            <div className="section-default flex flex-col gap-6 text-gray-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white border border-green-100 rounded-2xl text-emerald-600 shadow-sm"><Target size={28}/></div>
                    <HeadingText title="Nossos Objetivos" super="Missão" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Fomentar o espírito empreendedor e projetos de base tecnológica.",
                        "Subsidiar o surgimento de novos produtos inovadores.",
                        "Ampliar o vínculo entre as Universidades e o setor empresarial.",
                        "Contribuir para o desenvolvimento econômico do Paraná.",
                        "Reduzir riscos na geração de novos empreendimentos.",
                        "Promover inovação em produtos, processos e serviços."
                    ].map((objetivo, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-50 hover:border-emerald-200 hover:shadow-lg transition-all group cursor-default">
                            <div className="bg-emerald-50 p-1.5 rounded-full shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
                                <CheckCircle2 className="text-emerald-600 group-hover:text-white transition-colors duration-300" size={18} />
                            </div>
                            <p className="text-gray-700 text-sm font-medium leading-snug">{objetivo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="animate-fade-up animate-delay-400">
            <div className="section-default grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                <div className="flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Users size={24}/></div>
                        <HeadingText title="Público Alvo" super="Para quem?" />
                    </div>
                    <div className="flex-1 flex flex-col gap-4 bg-gradient-to-br from-purple-50 to-white p-6 md:p-8 rounded-[2rem] border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-gray-700 leading-relaxed font-medium">
                            Nosso programa de incubação é direcionado a <strong className="text-purple-600">pessoas</strong> físicas, maiores de 18 anos, 
                            que são <strong className="text-purple-600">movidas pela inovação</strong> e buscam impulsionar e desenvolver seu projeto, 
                            ideia ou empresa.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-medium">
                            As propostas devem ter <strong className="text-purple-600">base tecnológica e caráter inovador</strong>, visando a <strong className="text-purple-600">aceleração e o crescimento sustentável</strong>.
                        </p>  
                    </div>
                </div>
                <div className="flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Clock size={24}/></div>
                        <HeadingText title="Atendimento" super="Agenda" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-br from-orange-50 to-white p-6 md:p-8 rounded-[2rem] border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-gray-700 leading-relaxed font-medium mb-6">
                            O atendimento é realizado de <strong className="text-orange-600">segunda à sexta</strong> nos horários:
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {["08h às 12h", "13h30 às 17h30"].map(tag => (
                                <span key={tag} className="px-6 py-3 bg-white border border-orange-100 rounded-full text-sm font-bold text-orange-600 shadow-sm whitespace-nowrap">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="animate-fade-up animate-delay-500 pt-6 pb-4">
            <div className="section-default">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white border border-gray-100 rounded-2xl text-blue-600 mb-4 shadow-md transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Mail size={28}/>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Fale Conosco</h2>
                    <p className="text-gray-500 mt-2 text-lg font-medium max-w-2xl mx-auto">
                        Tem alguma dúvida ou quer fazer parte da nossa incubadora?
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {contactsData.map((contact) => (
                        <div 
                            key={contact.id} 
                            onClick={() => setSelectedContact(contact)}
                            className="bg-white rounded-[2rem] p-4 pr-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex items-center gap-5 relative overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-cyan-400"></div>
                            <div className="relative w-20 h-20 flex-shrink-0 ml-3">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                                    <Image src={contact.photo} alt={contact.name} fill className="object-cover" />
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{contact.name}</h3>
                                <span className="text-xs font-semibold text-gray-400 mb-3">{contact.role}</span>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">VER DETALHES</span>
                                    <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </Reveal>
      {selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity animate-fade-in" onClick={() => setSelectedContact(null)}></div>
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-fade-up animate-duration-300 flex flex-col z-10 ring-8 ring-white/30">
                <div className="relative h-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-600 to-cyan-500">
                    <button onClick={() => setSelectedContact(null)} className="absolute top-5 right-5 p-2 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full text-white transition-colors z-20">
                        <X size={20} />
                    </button>
                    <div className="absolute -bottom-12 left-8 w-28 h-28 rounded-2xl border-[4px] border-white shadow-xl overflow-hidden bg-white rotate-3">
                        <Image src={selectedContact.photo} alt={selectedContact.name} fill className="object-cover" />
                    </div>
                </div>
                <div className="pt-16 pb-8 px-8 flex flex-col gap-6">
                    <div>
                        <h3 className="text-2xl font-black text-gray-800 leading-tight">{selectedContact.name}</h3>
                        <span className="text-sm font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md mt-2 inline-block">{selectedContact.role}</span>
                    </div>
                    <div className="w-full border-t border-gray-100"></div>
                    <div className="flex flex-col gap-4">
                        <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                            <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:scale-110 transition-transform"><Mail size={20} /></div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">E-mail</p>
                                <p className="text-sm font-bold text-gray-800 break-all">{selectedContact.email}</p>
                            </div>
                        </a>
                        <a href={`tel:${selectedContact.phone.replace(/\D/g,'')}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                            <div className="bg-green-50 p-3 rounded-full text-green-600 group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Telefone</p>
                                <p className="text-sm font-bold text-gray-800">{selectedContact.phone}</p>
                            </div>
                        </a>
                    </div>
                    <button onClick={() => setSelectedContact(null)} className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all text-sm shadow-lg">Fechar</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}