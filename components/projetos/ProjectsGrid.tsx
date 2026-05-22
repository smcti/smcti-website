'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Cpu, Building2, Telescope, Users, Compass, ClipboardList,
  Radio, Camera, Bot, Globe, HeartHandshake, X, ExternalLink,
  Download, UserCheck, ChevronRight, SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '@components/common/reveal'

// ─── Types ──────────────────────────────────────────────────────────────────

type Category = 'Todos' | 'Tecnologia' | 'Smart City' | 'Educação' | 'Turismo' | 'Segurança'

interface Tag { label: string; color: string }

interface Project {
  id: string
  title: string
  shortDesc: string
  objetivos: string
  beneficios: string
  publico: string
  category: Exclude<Category, 'Todos'>
  icon: LucideIcon
  tags: Tag[]
  link?: string
  file?: string
  file2?: string
}

// ─── Style Maps ─────────────────────────────────────────────────────────────

const categoryStyles: Record<
  Exclude<Category, 'Todos'>,
  { bg: string; borderIdle: string; borderHover: string; text: string; iconBg: string; pillBg: string; pillText: string; shadowHover: string; footerBg: string }
> = {
  Tecnologia: {
    bg: 'from-blue-50/70 to-white',
    borderIdle: 'border-blue-100',
    borderHover: 'hover:border-blue-400',
    text: 'text-blue-700',
    iconBg: 'bg-blue-100 text-blue-600',
    pillBg: 'bg-blue-100',
    pillText: 'text-blue-700',
    shadowHover: 'hover:shadow-blue-100/60',
    footerBg: 'bg-blue-50/50',
  },
  'Smart City': {
    bg: 'from-teal-50/70 to-white',
    borderIdle: 'border-teal-100',
    borderHover: 'hover:border-teal-400',
    text: 'text-teal-700',
    iconBg: 'bg-teal-100 text-teal-600',
    pillBg: 'bg-teal-100',
    pillText: 'text-teal-700',
    shadowHover: 'hover:shadow-teal-100/60',
    footerBg: 'bg-teal-50/50',
  },
  Educação: {
    bg: 'from-purple-50/70 to-white',
    borderIdle: 'border-purple-100',
    borderHover: 'hover:border-purple-400',
    text: 'text-purple-700',
    iconBg: 'bg-purple-100 text-purple-600',
    pillBg: 'bg-purple-100',
    pillText: 'text-purple-700',
    shadowHover: 'hover:shadow-purple-100/60',
    footerBg: 'bg-purple-50/50',
  },
  Turismo: {
    bg: 'from-amber-50/70 to-white',
    borderIdle: 'border-amber-100',
    borderHover: 'hover:border-amber-400',
    text: 'text-amber-700',
    iconBg: 'bg-amber-100 text-amber-600',
    pillBg: 'bg-amber-100',
    pillText: 'text-amber-700',
    shadowHover: 'hover:shadow-amber-100/60',
    footerBg: 'bg-amber-50/50',
  },
  Segurança: {
    bg: 'from-rose-50/70 to-white',
    borderIdle: 'border-rose-100',
    borderHover: 'hover:border-rose-400',
    text: 'text-rose-700',
    iconBg: 'bg-rose-100 text-rose-600',
    pillBg: 'bg-rose-100',
    pillText: 'text-rose-700',
    shadowHover: 'hover:shadow-rose-100/60',
    footerBg: 'bg-rose-50/50',
  },
}

const filterActive: Record<Category, string> = {
  Todos: 'bg-cello-800 text-white border-cello-800 shadow-sm shadow-cello-800/30',
  Tecnologia: 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/30',
  'Smart City': 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/30',
  Educação: 'bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/30',
  Turismo: 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/30',
  Segurança: 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-600/30',
}

const filterInactive: Record<Category, string> = {
  Todos: 'text-cello-800 border-cello-200 hover:bg-cello-50',
  Tecnologia: 'text-blue-600 border-blue-200 hover:bg-blue-50',
  'Smart City': 'text-teal-600 border-teal-200 hover:bg-teal-50',
  Educação: 'text-purple-600 border-purple-200 hover:bg-purple-50',
  Turismo: 'text-amber-600 border-amber-200 hover:bg-amber-50',
  Segurança: 'text-rose-600 border-rose-200 hover:bg-rose-50',
}

const tagColors: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-700' },
}

// ─── Project Data ────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'patotech',
    title: 'PatoTech',
    shortDesc:
      'Capacita jovens e profissionais em robótica, cibersegurança, IA e empreendedorismo em parceria com UTFPR, SENAI e SENAC.',
    objetivos:
      'O PatoTech é um programa desenvolvido em parceria com a DAINF-UTFPRPB, SENAI e SENAC, com o objetivo de capacitar e profissionalizar pessoas para o empreendedorismo inovador no setor de tecnologia. Por meio de cursos nas áreas de robótica, cibersegurança, ciência de dados, eletrônica, inteligência artificial e empreendedorismo, o programa busca preparar os participantes para atuar em um mercado em constante evolução.',
    beneficios:
      'O programa visa despertar o interesse dos jovens pelo universo da tecnologia, apresentando possibilidades de carreira e destacando o potencial promissor do setor para o futuro. Ao conectar ensino, inovação e mercado de trabalho, o PatoTech contribui para a formação de talentos locais e fortalece o ecossistema de tecnologia em Pato Branco, garantindo mão de obra qualificada para as empresas da cidade.',
    publico:
      'Município de Pato Branco, com foco especial em jovens e profissionais interessados em ingressar ou se aperfeiçoar no setor de tecnologia e inovação.',
    category: 'Tecnologia',
    icon: Cpu,
    tags: [{ label: 'IA', color: 'blue' }, { label: 'Inovação', color: 'blue' }, { label: 'Capacitação', color: 'blue' }],
    link: 'https://patobranco.tec.br/patotech',
  },
  {
    id: 'cidade-inteligente',
    title: 'Plano Municipal de Cidade Inteligente',
    shortDesc:
      'Plano estratégico que usa TICs para equilibrar o desenvolvimento social, econômico e ambiental da cidade, colocando o cidadão no centro.',
    objetivos:
      'Objetiva colocar o cidadão no centro do seu propósito, onde as tecnologias da informação e comunicação (TICs) poderão apoiar a vida sustentável, equilibrando seu desenvolvimento social, econômico e ambiental; engajando e incentivando seus cidadãos a participarem da vida pública e também cocriar futuros urbanos que atendam às necessidades e aspirações para si e para as futuras gerações, promovendo mais oportunidades de crescimento, pessoais e profissionais, incrementando também o desenvolvimento das empresas da cidade e região.',
    beneficios:
      'Existem projetos elaborados para a infraestrutura social e tecnológica da cidade pela própria SMCTI e também em parceria com as outras secretarias municipais. Nestes projetos estão sendo consideradas as dimensões de uma cidade inteligente: Economia, Segurança, Saúde, Educação, Tecnologia e Inovação, Empreendedorismo, Urbanismo, Governança, Mobilidade e Meio Ambiente.',
    publico: 'Município de Pato Branco',
    category: 'Smart City',
    icon: Building2,
    tags: [
      { label: 'Smart City', color: 'teal' },
      { label: 'Sustentabilidade', color: 'teal' },
      { label: 'Governança', color: 'teal' },
    ],
    link: 'https://patobranco.pr.gov.br/plano-municipal-de-cidade-inteligente/',
  },
  {
    id: 'astronomia',
    title: 'Astronomia',
    shortDesc:
      'Impulsiona o ensino de Astronomia e Ciências Afins, criando espaços de cultura científica para a comunidade local e regional.',
    objetivos:
      'Impulsionar o desenvolvimento científico e tecnológico da região na área do ensino de Astronomia e Ciências Afins e ainda propiciar um espaço voltado às demais atividades culturais para a comunidade local e regional em geral.',
    beneficios:
      'Os espaços de Ciências têm a versatilidade, a flexibilidade e as possibilidades de promover e consolidar uma cultura científica desde a informação até o conhecimento, pois pode provocar a curiosidade com exposições, sessões audiovisuais, experiências e descobertas, além de proporcionar cursos de formações rápidas e/ou regulares, para professores, alunos e a comunidade em geral.',
    publico:
      'Beneficiários diretos: 83 mil munícipes de Pato Branco — alunos de todos os níveis, professores, pesquisadores e comunidade em geral. Beneficiários indiretos: munícipes das cidades da região Sudoeste do Paraná e Oeste de Santa Catarina.',
    category: 'Educação',
    icon: Telescope,
    tags: [{ label: 'Ciência', color: 'purple' }, { label: 'Educação', color: 'purple' }, { label: 'Cultura', color: 'purple' }],
  },
  {
    id: 'centro-cidadania',
    title: 'Centro de Cidadania',
    shortDesc:
      'Promove a inclusão digital com espaços de acesso a serviços públicos online, aprendizagem tecnológica e cidadania ativa.',
    objetivos:
      'Promover a inclusão digital de todos os cidadãos visando a transformação digital e inserção em ambientes tecnológicos, por meio da disponibilidade de espaços para acesso online aos serviços públicos, aprendizagem digital e discussão de temas referentes à cidadania.',
    beneficios:
      'Propiciar oportunidades de crescimento e desenvolvimento às pessoas, por meio da inclusão social e digital, estimulando a cidadania, que trará mais dignidade e sentimento de pertencimento a uma comunidade, estimulando o engajamento dos cidadãos em projetos tecnológicos, sociais, educacionais e profissionais.',
    publico:
      'Todos os cidadãos que não tenham acesso aos serviços públicos por falta de equipamentos ou internet, e pessoas que desejem aulas de aprendizagem digital e tecnológica.',
    category: 'Smart City',
    icon: Users,
    tags: [
      { label: 'Inclusão Digital', color: 'teal' },
      { label: 'Cidadania', color: 'teal' },
      { label: 'Smart City', color: 'teal' },
    ],
  },
  {
    id: 'dti',
    title: 'Destino Turístico Inteligente',
    shortDesc:
      'Rota turística tecnológica que conecta os principais agentes de TI do município, posicionando Pato Branco como Capital de Inovação.',
    objetivos:
      'Criar uma rota turística tecnológica, conectando e apresentando os principais agentes de TI do município, oferecendo experiências memoráveis, com o intuito de fortalecer a imagem de Pato Branco como Capital Tecnológica e Inovadora e buscando destaque no cenário nacional e internacional.',
    beneficios:
      'Apresentar a estrutura do Parque Tecnológico, bem como as empresas instaladas, dando notoriedade ao ambiente de inovação, pesquisa e desenvolvimento e consequentemente atraindo investimentos e empresas que incrementem o ecossistema local de inovação e a cidade de Pato Branco.',
    publico: 'Cidadãos, turistas, empresas, escolas.',
    category: 'Turismo',
    icon: Compass,
    tags: [{ label: 'Turismo', color: 'amber' }, { label: 'Inovação', color: 'amber' }, { label: 'Imagem', color: 'amber' }],
  },
  {
    id: 'comtur',
    title: 'Formulário COMTUR',
    shortDesc:
      'Sondagem para identificar o perfil e as dificuldades de deslocamento da população das regiões Sudoeste do PR e Oeste de SC.',
    objetivos:
      'O objetivo desta sondagem é identificar o perfil e, principalmente, compreender facilidades ou dificuldades do público em geral das regiões Sudoeste do Paraná e Oeste de Santa Catarina quando necessita se deslocar para centros microrregionais e grandes centros como Curitiba, Florianópolis e São Paulo.',
    beneficios:
      'Permite ao Conselho Municipal de Turismo (COMTUR) de Pato Branco/PR obter informações valiosas sobre o perfil do público das regiões Sudoeste do Paraná e Oeste de Santa Catarina, bem como identificar facilidades e dificuldades enfrentadas por eles ao se deslocarem para centros microrregionais e grandes centros.',
    publico: 'Todos os Munícipes',
    category: 'Turismo',
    icon: ClipboardList,
    tags: [{ label: 'Turismo', color: 'amber' }, { label: 'Pesquisa', color: 'amber' }, { label: 'COMTUR', color: 'amber' }],
    link: 'https://comtur.patobranco.tec.br',
  },
  {
    id: 'luminarias-5g',
    title: 'Luminárias Inteligentes 5G + Lab 5G',
    shortDesc:
      'Luminárias com antenas 5G, câmeras inteligentes e Wi-Fi no centro da cidade, criando infraestrutura de conectividade única no interior.',
    objetivos:
      'Potencializar o desenvolvimento tecnológico, social e econômico do município por meio de luminárias inteligentes. As luminárias integram antenas para comunicação 5G, câmeras com reconhecimento facial, Wi-Fi e telegestão da iluminação pública. A fim de utilizar as tecnologias integradas de forma eficiente, foi escolhida a região central, no entorno da praça Presidente Vargas, em que se tem uma grande aglomeração de pessoas diariamente.',
    beneficios:
      'O projeto possibilita uma vantagem competitiva para empresas locais e regionais ao desenvolverem tecnologias que utilizem a rede, visto que o 5G está disponível apenas em capitais e grandes centros urbanos.',
    publico: 'Empresas com interesse no desenvolvimento de tecnologias que utilizem a comunicação 5G.',
    category: 'Tecnologia',
    icon: Radio,
    tags: [{ label: '5G', color: 'blue' }, { label: 'IoT', color: 'blue' }, { label: 'Infraestrutura', color: 'blue' }],
  },
  {
    id: 'pato-360',
    title: 'Pato 360°',
    shortDesc:
      'Sistema de videomonitoramento inteligente em parceria com o 3º BPM para garantir segurança pública em locais estratégicos do município.',
    objetivos:
      'Melhorar o serviço de segurança pública ao empregar câmeras de videomonitoramento controladas pelo 3º BPM.',
    beneficios:
      'O trabalho conjunto entre a Prefeitura e os órgãos de segurança possibilita o mapeamento de todo o município a fim de monitorar locais estratégicos de segurança, garantindo o controle remoto, pelo 3º Batalhão de Polícia Militar, nas entradas/saídas do município e em locais de grande aglomeração de pessoas.',
    publico: 'Todos os cidadãos.',
    category: 'Segurança',
    icon: Camera,
    tags: [{ label: 'Segurança', color: 'rose' }, { label: 'Monitoramento', color: 'rose' }, { label: '5G', color: 'rose' }],
  },
  {
    id: 'robotica',
    title: 'Robótica',
    shortDesc:
      'Capacita educadores em Robótica Educacional e promove competições para integrar a robótica de forma inclusiva no ensino público.',
    objetivos:
      'O Programa de Fomento à Pesquisa e Desenvolvimento Tecnológico em Robótica tem como objetivo capacitar profissionais multiplicadores nas áreas de TIC com ênfase em Robótica Educacional. Além disso, o programa busca promover a realização de eventos e competições que incentivem a integração desta área de conhecimento no ensino público de maneira inclusiva.',
    beneficios:
      'Qualificação dos educadores, a inclusão digital, o estímulo à curiosidade e criatividade, fortalecimento da relação entre a educação e o setor produtivo, e o desenvolvimento de habilidades interpessoais e comportamentais, melhorando a qualidade do ensino público.',
    publico:
      'Professores e profissionais da educação que atuam na rede pública municipal dos 15 municípios do Núcleo Regional de Educação de Pato Branco.',
    category: 'Educação',
    icon: Bot,
    tags: [{ label: 'Robótica', color: 'purple' }, { label: 'Educação', color: 'purple' }, { label: 'Inovação', color: 'purple' }],
  },
  {
    id: 'site-smcti',
    title: 'Site SMCTI',
    shortDesc:
      'Portal oficial que divulga programas, projetos e o ecossistema de inovação de Pato Branco para todos os munícipes.',
    objetivos:
      'Divulgação de programas e projetos, promoção do ecossistema de inovação, estímulo à formação científica e tecnológica e acesso à informação para toda a população do município.',
    beneficios:
      'O site oficial da Secretaria oferece uma série de benefícios, incluindo a democratização do acesso à informação, a promoção da cultura científica e tecnológica, o fortalecimento do ecossistema de inovação, a facilitação da interação entre os atores do setor, o estímulo ao empreendedorismo e à geração de conhecimento, além do aumento da transparência e da participação da sociedade nas políticas públicas relacionadas à ciência, tecnologia e inovação.',
    publico: 'Todos os Munícipes',
    category: 'Tecnologia',
    icon: Globe,
    tags: [
      { label: 'Comunicação', color: 'blue' },
      { label: 'Transparência', color: 'blue' },
      { label: 'Inovação', color: 'blue' },
    ],
    link: 'https://patobranco.tec.br',
  },
  {
    id: 'tea',
    title: 'Crianças com TEA nas Escolas',
    shortDesc:
      'Estudo com base em evidências sobre a inclusão de crianças com Transtorno do Espectro Autista nas escolas municipais de Pato Branco.',
    objetivos:
      'Atendendo à demanda da Secretaria Municipal de Educação para compreender, com base em evidências, os principais desafios e necessidades relacionados à inclusão e ao processo de aprendizagem de estudantes com Transtorno do Espectro Autista (TEA) na rede municipal. O estudo foi articulado em parceria com a Secretaria Municipal de Saúde, visando integrar perspectivas educacionais e de saúde para subsidiar decisões, políticas e ações formativas.',
    beneficios:
      'Geração de uma base de evidências para tomada de decisão; identificação de lacunas e boas práticas; apoio ao planejamento de formações, fluxos de atendimento e estratégias de acompanhamento; e fortalecimento da cooperação entre Ciência, Tecnologia e Inovação, Educação e Saúde para respostas mais rápidas e efetivas às famílias e à comunidade escolar.',
    publico:
      'Rede municipal de ensino, gestores públicos, profissionais de Educação e Saúde, conselhos e comitês municipais, famílias e comunidade interessada.',
    category: 'Smart City',
    icon: HeartHandshake,
    tags: [{ label: 'Inclusão', color: 'teal' }, { label: 'Educação', color: 'teal' }, { label: 'Saúde', color: 'teal' }],
    file: '/assets/docs/Relatório Técnico_ Realidade de Crianças com Transtorno do Espectro Autista nas Escolas de Pato Branco.pdf',
    file2: '/assets/docs/Anprotec_2025_VersaoFinalDOC_162.pdf',
  },
]

const CATEGORIES: Category[] = ['Todos', 'Tecnologia', 'Smart City', 'Educação', 'Turismo', 'Segurança']

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered =
    activeCategory === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory)

  // ESC to close modal
  useEffect(() => {
    if (!selectedProject) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedProject])

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <>
      {/* ── Filter bar ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Filtrar projetos por categoria">
        <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-200 ${activeCategory === cat
                ? filterActive[cat]
                : `bg-white ${filterInactive[cat]}`
              }`}
          >
            {cat}
          </button>
        ))}
      </div>



      {/* ── Cards grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => {
          const s = categoryStyles[project.category]
          const Icon = project.icon
          return (
            <Reveal key={project.id}>
              <article
                id={`project-card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className={`
                  group relative flex flex-col min-h-[280px]
                  bg-gradient-to-br ${s.bg}
                  border ${s.borderIdle} ${s.borderHover}
                  rounded-2xl shadow-sm hover:shadow-xl ${s.shadowHover}
                  transition-all duration-300 hover:-translate-y-1.5
                  cursor-pointer overflow-hidden
                `}
              >
                {/* Card header */}
                <div className="flex items-start gap-3 p-5 pb-3">
                  <div
                    className={`
                      flex-shrink-0 w-12 h-12 rounded-xl
                      ${s.iconBg}
                      flex items-center justify-center
                      transition-transform duration-300 group-hover:scale-110
                    `}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`block text-[10px] font-bold uppercase tracking-widest ${s.text}`}>
                      {project.category}
                    </span>
                    <h3 className="mt-0.5 text-gray-800 font-bold text-base leading-snug line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Short description */}
                <p className="px-5 pb-3 text-[15px] text-gray-700 leading-relaxed line-clamp-4 min-h-[5rem]">
                  {project.shortDesc}
                </p>

                {/* Tag pills */}
                <div className="mt-auto px-5 pt-2 pb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => {
                    const tc = tagColors[tag.color] ?? tagColors.blue
                    return (
                      <span
                        key={tag.label}
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tc.bg} ${tc.text}`}
                      >
                        {tag.label}
                      </span>
                    )
                  })}
                </div>

                {/* Footer: CTA only */}
                <div
                  className={`
                    px-5 py-3 flex items-center justify-center
                    border-t ${s.borderIdle} ${s.footerBg}
                  `}
                >
                  <span
                    className={`
                      flex items-center gap-1 text-xs font-semibold
                      ${s.text} px-3.5 py-1.5 rounded-full
                      border border-transparent
                      transition-all duration-250 ease-out
                      group-hover:border-current group-hover:gap-2
                    `}
                  >
                    Saiba mais
                    <ChevronRight size={14} className="transition-transform duration-250 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* ── Modal (portal to body so fixed positioning works outside Reveal transforms) ── */}
      {selectedProject && createPortal((() => {
        const p = selectedProject
        const s = categoryStyles[p.category]
        const Icon = p.icon
        return (
          <div
            id="project-modal-overlay"
            className="fixed inset-0 z-[45] flex items-center justify-center p-4 backdrop-blur-md bg-white/10"
            onClick={() => setSelectedProject(null)}
          >
            <div
              id="project-modal-content"
              role="dialog"
              aria-modal="true"
              aria-label={p.title}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className={`
                  sticky top-0 z-10 flex items-start gap-4 p-6 pb-4
                  bg-gradient-to-br ${s.bg} border-b ${s.borderIdle} rounded-t-2xl
                `}
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center`}>
                  <Icon size={26} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`block text-[10px] font-bold uppercase tracking-widest ${s.text}`}>
                    {p.category}
                  </span>
                  <h2 className="mt-0.5 text-gray-800 font-black text-xl leading-snug">
                    {p.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.tags.map((tag) => {
                      const tc = tagColors[tag.color] ?? tagColors.blue
                      return (
                        <span
                          key={tag.label}
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tc.bg} ${tc.text}`}
                        >
                          {tag.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <button
                  id="project-modal-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Fechar"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 flex flex-col gap-5">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Objetivos
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.objetivos}</p>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Benefícios
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.beneficios}</p>
                </div>

                {/* Audience highlight */}
                <div className={`flex items-start gap-3 p-3.5 rounded-xl ${s.pillBg}`}>
                  <UserCheck size={16} className={`mt-0.5 flex-shrink-0 ${s.pillText}`} />
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${s.pillText}`}>
                      Público-alvo
                    </span>
                    <p className={`mt-0.5 text-sm ${s.pillText}`}>{p.publico}</p>
                  </div>
                </div>

                {/* Links / Downloads */}
                {(p.link || p.file || p.file2) && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${s.borderIdle} ${s.text} bg-white hover:brightness-95 transition-all text-sm font-medium`}
                      >
                        <ExternalLink size={15} />
                        Acessar site do projeto
                      </a>
                    )}
                    {p.file && (
                      <a
                        href={p.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${s.borderIdle} ${s.text} bg-white hover:brightness-95 transition-all text-sm font-medium`}
                      >
                        <Download size={15} />
                        Baixar Relatório Técnico
                      </a>
                    )}
                    {p.file2 && (
                      <a
                        href={p.file2}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${s.borderIdle} ${s.text} bg-white hover:brightness-95 transition-all text-sm font-medium`}
                      >
                        <Download size={15} />
                        Baixar Documento Anprotec 2025
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })(), document.body)}
    </>
  )
}
