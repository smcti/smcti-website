import ProjectsGrid from "@components/projetos/ProjectsGrid"
import Reveal from "@components/common/reveal"

export const metadata = {
  title: 'Projetos | SMCTI Pato Branco',
  description:
    'Conheça os projetos desenvolvidos pela Secretaria Municipal de Ciência, Tecnologia e Inovação de Pato Branco — iniciativas de inovação, educação, inclusão digital, turismo e segurança pública.',
}

export default function Projetos() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cello-800">
        {/* Background decorative circles */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cello-700/50 blur-3xl" />
          <div className="absolute top-8 right-0 w-72 h-72 rounded-full bg-cello-900/60 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-40 rounded-full bg-cyan-500/10 blur-2xl" />
        </div>

        <div className="section-default relative py-10 sm:py-14 flex flex-col gap-4">
          {/* Super label */}
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-cyan-400 after:block after:w-20 after:h-px after:bg-cyan-400">
            SMCTI · Pato Branco
          </span>

          {/* Main headline */}
          <h1 className="text-white font-black text-3xl sm:text-5xl leading-tight max-w-2xl">
            Projetos de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Inovação
            </span>{' '}
            e Tecnologia
          </h1>

          {/* Subtitle */}
          <p className="text-cello-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            Iniciativas que transformam Pato Branco em referência nacional de Ciência,
            Tecnologia e Inovação — da inclusão digital à conectividade 5G.
          </p>
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────────────── */}
      <section className="section-default my-12">
        <Reveal>
          <ProjectsGrid />
        </Reveal>
      </section>
    </>
  )
}