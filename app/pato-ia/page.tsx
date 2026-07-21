'use client'

import Reveal from "@components/common/reveal"
import HeadingText from "@components/common/HeadingText"
import {
  Landmark,
  Handshake,
  GraduationCap,
  FlaskConical,
  FileText,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Cpu,
  Camera,
  Mail,
  DockIcon,
  Brain,
  ChartArea,
  MessageCircle,
  Factory,
  MapIcon,
  KeyboardIcon,
  File,
  Workflow,
  PencilIcon,
  PencilLineIcon,
  Server,
} from "lucide-react"
import { MdWork } from "@node_modules/react-icons/md"

const pilares = [
  {
    id: "servidor",
    tag: "Inovação",
    icon: Server,
    title: "Servidor de IA Interno",
    description:
      "Um servidor interno com inteligência artificial local, projetado para unificar e otimizar processos de empresas e instituições públicas. A plataforma oferecerá maior segurança, privacidade, eficiência e autonomia no uso da IA.",
    status: "Em breve",
  },
  {
    id: "papeia",
    tag: "Capacitação",
    icon: GraduationCap,
    title: "PapeIA",
    description:
      "Programa de workshops de inteligência artificial voltado à capacitação prática dos servidores públicos, levando IA aplicada ao dia a dia de diferentes setores da gestão municipal.",
    status: "Operando",
    logo: "/assets/images/pato-ia/papeia-logo.png",
  },
  {
    id: "localiza",
    tag: "Automação",
    icon: Factory,
    title: "Localiza Empresas",
    description:
      "Iniciativa desenvolvida para facilitar a localização e divulgação das empresas, startups e empreendedores. Funciona como um mapa interativo, permitindo que visitantes encontrem rapidamente organizações instaladas no Parque Tecnológico e obtenham informações sobre elas.",
    status: "Operando",
  },
  {
    id: "vibeCoding",
    tag: "Automação",
    icon: KeyboardIcon,
    title: "Desenvolvimento Interno",
    description:
      "Uso de ferramentas de automação baseadas em inteligência artificial para o desenvolvimento dos sistemas municipais e resolução de problemas, garantindo eficiência no desenvolvimento, além de consistência técnica e visual.",
    status: "Operando",
  },
  { id: "pato-parceiro", 
    tag: "Agente de IA", 
    icon: MessageCircle, 
    title: "Pato Parceiro", 
    description: "Agente de IA desenvolvido para facilitar parcerias com a administração pública. Auxilio na interpretação de leis, elaboração de termos, análise de patrocínios, doações, PPPs e acordos de cooperação, indicando o instrumento jurídico adequado para cada situação.", 
    status: "Operando", 
  }, 
  { id: "licita-pb", 
    tag: "Agente de IA", 
    icon: MessageCircle, 
    title: "LicitaAiPB", 
    description: "Agente de IA focado em auxiliar licitações do Município de Pato Branco/PR. Analisa ETP, TR, DFD e demais documentos conforme a Lei 14.133/2021, decretos municipais e checklists oficiais, apontando conformidades, inconsistências, melhorias e emitindo parecer técnico.", 
    status: "Operando", 
  },
  {
    id: "desenho",
    tag: "Atração",
    icon: PencilLineIcon,
    title: "Desenho Realista",
    description:
      "Evento focado em apresentar a IA e suas capacidades para o público geral, de uma forma divertida e convidativa. Os participantes tiravam fotos de seus desenhos, que eram convertidos para esboços realistas, por meio de Inteligência Artificial.",
    status: "Realizado",
  },
  {
    id: "oficina",
    tag: "Atração",
    icon: MdWork,
    title: "Profissão do Futuro",
    description:
      "Evento focado em apresentar a IA ao público mais novo, com inspiração e novidade. Os participantes tiravam uma foto de si mesmos e informavam a profissão dos seus sonhos, então a Inteligência Artificial gerava uma imagem realista deles no futuro exercendo essa profissão.",
    status: "Realizado",
  },
  
]

const statusColors = {
  "Em breve": "bg-amber-100 text-amber-800 border-amber-200",
  "Operando": "bg-blue-100 text-blue-800 border-blue-200",
  "Realizado": "bg-emerald-100 text-emerald-800 border-emerald-200",
}

const iniciativasRelacionadas = [
  {
    id: "patotech",
    title: "PatoTech — Escola de Inovação",
    description:
      "Capacita jovens e adultos em programação, robótica, cibersegurança e inteligência artificial, em parceria com UTFPR, SENAI e SENAC. Reconhecido com o Prêmio Gestor Público Paraná 2025.",
    logo: "/assets/images/logos/patotech.png",
    href: "/patotech",
    icon: Cpu,
  },
  {
    id: "pato360",
    title: "Pato 360°",
    description:
      "Sistema municipal de videomonitoramento que aplica reconhecimento facial, leitura de placas e análise de áudio por IA para fortalecer a segurança pública em Pato Branco e região.",
    logo: "/assets/images/logos/pato360.png",
    href: "/pato360",
    icon: Camera,
  },
  {
    id: "mapa",
    title: "Mapa Cultural de Pato Branco",
    description:
      "Sistema desenvolvido para mapear, acompanhar e divulgar os eventos culturais de Pato Branco. Possui não só publicações sobre os eventos, mas também conta com um mapa interativo do município, destacando os eventos ativos.",
    logo: "/assets/icons/brasao.png",
    href: "https://mapacultural.patobranco.tec.br/",
    icon: MapIcon,
  },
]

export default function PatoIAPage() {
  return (
    <div className="-mt-8 bg-zircon-50 text-slate-900">
      {/* HERO */}
      <section
        className="relative overflow-hidden text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/pato-ia/hero-pato-ia.jpg')" }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-cello-950/80" />
        <div className="relative z-10 section-default flex flex-col gap-8 py-24 sm:py-36">
          <Reveal>
            <div className="flex flex-col gap-6 max-w-3xl mt-6">
              <h1 className="font-black text-4xl sm:text-6xl leading-tight">
                Pato{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  IA
                </span>
              </h1>
              <p className="text-lg text-cello-100 leading-relaxed">
                Iniciativas de inteligência artificial que estão transformando a gestão pública
                de Pato Branco — governança, capacitação, agentes inteligentes e infraestrutura
                a serviço do cidadão.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { label: "Iniciativas tecnológicas", value: "8+" },
                { label: "Servidor interno unificado", value: "IA Local" },
                { label: "Comissão e Lei de IA", value: "Instituída" },
                { label: "Programas de aprendizado de IA", value: "Capacitação" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
                >
                  <span className="block font-black text-xl sm:text-2xl text-cyan-300">
                    {stat.value}
                  </span>
                  <span className="text-xs text-cello-100 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* O QUE É */}
      <Reveal>
        <section className="section-default flex flex-col gap-8 py-16">
          <HeadingText title="O que é o Pato IA" super="Sobre a iniciativa" />
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50 relative overflow-hidden">
            <div className="flex flex-col gap-4 relative z-10 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                Pato Branco vem se consolidadando como referência estadual e nacional em Ciência,
                Tecnologia e Inovação, e a inteligência artificial passa a ocupar papel central
                nessa estratégia. O <strong className="text-cello-700">Pato IA</strong> reúne, em
                um só espaço, as iniciativas do município que aplicam IA à gestão pública — da
                governança e capacitação de servidores ao apoio a licitações e à segurança urbana
                — para que a população acompanhe de forma transparente como a tecnologia vem
                sendo utilizada em benefício do cidadão.
              </p>
              <p>
                A condução dessas iniciativas é feita pela{" "}
                <strong>Secretaria Municipal de Ciência, Tecnologia e Inovação (SMCTI)</strong>,
                por meio da Comissão de Implantação de inteligência artificial, responsável por
                orientar o uso ético, seguro e responsável da tecnologia em todas as secretarias
                do município.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* INICIATIVAS */}
      <Reveal>
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="section-default flex flex-col gap-10">
            <HeadingText title="Vertentes do Pato IA" super="Iniciativas tecnológicas" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {pilares.map((p, idx) => {
                const Icon = p.icon
                return (
                  <div
                    key={`${p.id}-${idx}`}
                    id={p.id}
                    className="relative bg-zircon-50 flex flex-col gap-3 pt-2 pb-6 pr-4 pl-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                  >
                    
                    <div className="flex items-center gap-2.5 pt-6">
                      <span
                      className={`absolute right-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        statusColors[p.status as keyof typeof statusColors]
                      }`}
                    >
                      {p.status}
                    </span>
                      <div className="p-2 bg-cello-800 text-cyan-300 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                        
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-cello-600">
                          {p.tag}
                        </span>
                        <h3 className="font-bold text-gray-800 text-sm leading-snug">{p.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed text-justify flex-1 line-clamp-5">
                      {p.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PROJETOS */}
      <Reveal>
        <section className="py-16">
          <div className="section-default flex flex-col gap-10">
            <HeadingText title="IA em ação no município" super="Projetos ativos" />
            <p className="text-gray-500 -mt-4 max-w-2xl">
              Além dos pilares do Pato IA, outras iniciativas da SMCTI já aplicam inteligência
              artificial nas atividades do dia a dia do município.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {iniciativasRelacionadas.map((it) => {
                const Icon = it.icon
                return (
                  <a
                    key={it.id}
                    href={it.href}
                    className="bg-white group flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-cello-800 text-cyan-300 rounded-lg">
                        <Icon size={20} />
                      </div>
                      <img src={it.logo} alt={`Logo ${it.title}`} className="h-10 w-auto object-contain" />
                    </div>
                    <h3 className="font-bold text-gray-800">{it.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed text-justify flex-1">
                      {it.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-cello-700 group-hover:gap-2 transition-all">
                      Saiba mais <ArrowRight size={14} />
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* MARCOS E INVESTIMENTOS DE IA */}
      <Reveal>
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="section-default flex flex-col gap-10">
            <HeadingText
              title="Estrutura, Governança e Investimentos"
              super="Marcos Fundamentais"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Lei Municipal */}
              <div className="bg-zircon-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-cello-800 text-cyan-300 rounded-xl group-hover:scale-105 transition-transform">
                      <FileText size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cello-700 bg-cello-100/80 px-2.5 py-1 rounded-full">
                      Lei Municipal nº 6.544/2025
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Lei Municipal de IA</h3>
                    <p className="text-xs text-cello-600 font-medium mt-0.5">Marco Regulatório do Município</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed text-justify">
                    Legislação pioneira que fixa princípios éticos, diretrizes de transparência, supervisão humana, responsabilidade e salvaguarda da privacidade para o uso de sistemas de IA na administração pública direta e indireta, em alinhamento com a LGPD.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <a
                    href="/assets/docs/Lei-n6544-Diretrizes-para-implementacao-e-uso-de-ia.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cello-700 hover:text-cello-900 transition-colors"
                  >
                    <FileText size={13} /> Lei Ordinária nº 6.544/2025 (PDF)
                  </a>
                </div>
              </div>
              {/* Card 2: Comissão */}
              <div className="bg-zircon-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-cello-800 text-cyan-300 rounded-xl group-hover:scale-105 transition-transform">
                      <Landmark size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cello-700 bg-cello-100/80 px-2.5 py-1 rounded-full">
                      Portarias 71 e 72/2025
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Comissão de Implantação de IA</h3>
                    <p className="text-xs text-cello-600 font-medium mt-0.5">Órgão Colegiado Municipal</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed text-justify">
                    Instituída pela Portaria GP nº 71/2025 para estruturar diretrizes éticas e estratégicas. A comissão é composta por 11 membros nomeados pela Portaria GP nº 72/2025, integrando representantes das Secretarias de Administração, CT&amp;I, Desenvolvimento Econômico, Procuradoria e Gabinete.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col gap-2">
                  <a
                    href="/assets/docs/71-2025-GP-institui-comissao-ia.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cello-700 hover:text-cello-900 transition-colors"
                  >
                    <FileText size={13} /> Portaria GP nº 71/2025 (Instituição)
                  </a>
                  <a
                    href="/assets/docs/72-2025-GP-nomeacao-comissao-ia.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cello-700 hover:text-cello-900 transition-colors"
                  >
                    <FileText size={13} /> Portaria GP nº 72/2025 (Nomeação)
                  </a>
                </div>
              </div>
              {/* Card 3: Laboratório */}
              <div className="bg-zircon-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-cello-800 text-cyan-300 rounded-xl group-hover:scale-105 transition-transform">
                      <FlaskConical size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                      Em Implantação
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Laboratório de IA</h3>
                    <p className="text-xs text-cello-600 font-medium mt-0.5">Parque Tecnológico de Pato Branco</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed text-justify">
                    Espaço tecnológico projetado para ser o hub municipal de pesquisa, prototipagem, testes e desenvolvimento de soluções de IA aplicadas aos serviços públicos e ao ecossistema local de inovação.
                  </p>
                </div>
                <div className="mt-6 pt-3 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <Sparkles size={18} className="text-amber-500 shrink-0" />
                  <div>
                    <span className="block font-black text-cello-900 text-sm">R$ 400.000,00+</span>
                    <span className="text-[10px] text-gray-500">Repasse Fundo a Fundo · Seia/PR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CONTATO */}
      <Reveal>
        <section className="bg-white">
          <div className="section-default py-16">
            <div className="rounded-3xl bg-gradient-to-br from-cello-800 to-cello-950 text-white p-10 sm:p-14 text-center relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
              <div className="relative flex flex-col items-center gap-6">
                <h2 className="text-3xl sm:text-4xl font-black">
                  IA a serviço do <span className="text-cyan-300">cidadão</span>
                </h2>
                <p className="text-cello-100 max-w-2xl">
                  Tem uma ideia ou demanda envolvendo inteligência artificial na gestão pública?
                  Fale com a Comissão de IA do município.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-cello-800 font-semibold rounded-full px-6 py-3 hover:bg-cello-50 transition-colors"
                >
                  <Mail size={18} />
                  Entrar em contato
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* LGPD */}
      <Reveal>
        <section className="py-10 border-y border-gray-100">
          <div className="section-default">
            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-yellow-800 text-sm flex items-start gap-3">
              <ShieldCheck size={18} className="shrink-0 mt-0.5" />
              <p>
                O uso de inteligência artificial pelas iniciativas do Pato IA segue as diretrizes
                estabelecidas pela Comissão de Implantação de inteligência artificial do
                município, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD) e
                com os princípios de transparência, ética e segurança da informação.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  )
}