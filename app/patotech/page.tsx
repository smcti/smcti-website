"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Filter,
  GraduationCap,
  KeyRound,
  Layers3,
  Mail,
  MapPin,
  MonitorCog,
  Rocket,
  Search,
  User,
  UsersRound,
  Wifi,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import CourseCard from "@components/common/CourseCard";
import PartnerFooter from "@components/common/PartnerFooter";
import courseOpen from "@/public/data/courseOpen.json";
import courseClosed from "@/public/data/courseClosed.json";

type CourseBase = {
  id: string;
  image: string;
  title: string;
  description: string;
  partner: string;
  duration: string;
  isNotOpen: boolean;
  link: string;
};

const courseCategories = [
  "Todos",
  "Programação",
  "Desenvolvimento Web",
  "Impressão 3D",
  "Robótica",
  "Tecnologia e Inovação",
  "Sistemas",
  "Outros cursos",
] as const;

type CourseCategory = (typeof courseCategories)[number];

const courseModalities = ["Todos", "Online", "Presencial"] as const;

type CourseModality = (typeof courseModalities)[number];

const categoryIcons: Record<CourseCategory, LucideIcon> = {
  Todos: Search,
  Programação: Code2,
  "Desenvolvimento Web": MonitorCog,
  "Impressão 3D": Layers3,
  Robótica: Cpu,
  "Tecnologia e Inovação": Rocket,
  Sistemas: Wrench,
  "Outros cursos": GraduationCap,
};

const modalityIcons: Record<CourseModality, LucideIcon> = {
  Todos: Search,
  Online: Wifi,
  Presencial: MapPin,
};

const featuredCourses = [
  {
    id: "23",
    image: "/assets/images/cursos/banner-programador-sistemas.png",
    title: "PROGRAMADOR DE SISTEMAS",
    description:
      "Desenvolva lógica de programação, fundamentos de sistemas e práticas essenciais para iniciar uma trajetória na área de tecnologia.",
    partners: "SMCTI e SENAI",
    link: "https://forms.gle/dyxhKeEdaWz7ZpFU8",
    date: "16/06/2026 a 12/11/2026",
    enrollmentDate: "Matrículas abertas",
    startDate: "16/06/2026",
    category: "Sistemas" as CourseCategory,
    modality: "Presencial" as CourseModality,
    highlight: "Formação profissional",
  },
  {
    id: "24",
    image: "/assets/images/cursos/card-curso-logica-de-programacao.png",
    title: "LÓGICA DE PROGRAMAÇÃO",
    description: "Desenvolva o raciocínio lógico e aprenda a construir algoritmos eficientes para resolver problemas reais.",
    link: "",
    date: "14/07/2026 a 17/09/2026",
    enrollmentDate: "Matrículas abertas",
    startDate: "14/07/2026",
    category: "Sistemas" as CourseCategory,
    modality: "Presencial" as CourseModality,
    highlight: "Formação profissional",
  },
    {
    id: "20",
    image: "/assets/images/cursos/banner-html-css.png",
    title: "HTML E CSS - CRIAÇÃO DE WEBSITES",
    description:
      "Aprenda a estruturar páginas com HTML, criar estilos com CSS e entender como sites modernos ganham forma. Indicado para quem quer dar os primeiros passos no desenvolvimento front-end.",
    partners: "SMCTI e SENAC",
    link: "https://www.pr.senac.br/cursos/?uep=9&tc=202600084",
    date: "22/09/2026 a 29/10/2026",
    enrollmentDate: "Matrículas abertas",
    startDate: "22/09/2026",
    category: "Desenvolvimento Web" as CourseCategory,
    modality: "Presencial" as CourseModality,
    highlight: "Criação de websites",
    passphrase: "PARCERIAPATOBRANCO",
  },
];

type FeaturedCourse = (typeof featuredCourses)[number];

const getCourseCategory = (course: Pick<CourseBase, "title" | "image">): CourseCategory => {
  const content = `${course.title} ${course.image}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (content.includes("html") || content.includes("javascript") || content.includes("web")) {
    return "Desenvolvimento Web";
  }

  if (content.includes("3d") || content.includes("fusion") || content.includes("modelagem")) {
    return "Impressão 3D";
  }

  if (content.includes("robot") || content.includes("arduino")) {
    return "Robótica";
  }

  if (content.includes("sistema")) {
    return "Sistemas";
  }

  if (content.includes("python") || content.includes("programador")) {
    return "Programação";
  }

  if (
    content.includes("ia") ||
    content.includes("iot") ||
    content.includes("dados") ||
    content.includes("ciber") ||
    content.includes("hardware") ||
    content.includes("eletronica") ||
    content.includes("empreendedorismo")
  ) {
    return "Tecnologia e Inovação";
  }

  return "Outros cursos";
};

const getCourseModality = (
  course: Pick<CourseBase, "title" | "description">
): Exclude<CourseModality, "Todos"> => {
  const content = `${course.title} ${course.description}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (content.includes("online") || content.includes("self-paced")) {
    return "Online";
  }

  return "Presencial";
};

const sectionHeadingStyles = "max-w-3xl space-y-3";

const socialLinks: {
  name: string;
  href: string;
  icon: IconType;
  hoverStyles: string;
}[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/parquetecpatobranco/",
    icon: FaInstagram,
    hoverStyles: "hover:border-[#C13584] hover:bg-[radial-gradient(circle_at_30%_110%,#FEDA75_0%,#FA7E1E_25%,#D62976_50%,#962FBF_75%,#4F5BD5_100%)] hover:text-white",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/smctipb/",
    icon: FaFacebookF,
    hoverStyles: "hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@parquetecpatobranco",
    icon: FaYoutube,
    hoverStyles: "hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/smcti-pb/",
    icon: FaLinkedinIn,
    hoverStyles: "hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
  },
];

const EmptyState = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
    {children}
  </div>
);

const FeaturedCourseCard = ({ course }: { course: FeaturedCourse }) => {
  const ModalityIcon = course.modality === "Online" ? Wifi : MapPin;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={`Imagem do curso ${course.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Matrículas abertas
          </span>
          <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-cello-900 shadow-sm">
            {course.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-cello-950/90 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
            <ModalityIcon className="h-3.5 w-3.5" />
            {course.modality}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cello-700">
          {course.highlight}
        </p>
        <h3 className="text-2xl font-black leading-tight text-slate-950">{course.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{course.description}</p>

        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
    <span className="flex items-center gap-2 font-bold text-slate-900">
      <CalendarDays className="h-4 w-4 text-cello-700" />
      Matrículas
    </span>
    <p className="mt-1 text-slate-600">{course.enrollmentDate}</p>
  </div>

  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
    <span className="flex items-center gap-2 font-bold text-slate-900">
      <CalendarDays className="h-4 w-4 text-cello-700" />
      Início do curso
    </span>
    <p className="mt-1 text-slate-600">{course.startDate}</p>
  </div>
</div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-2 text-xs font-bold text-cello-800">
            <CalendarDays className="h-4 w-4" />
            Período: {course.date}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
            <UsersRound className="h-4 w-4" />
            Parceiros: {course.partners}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
            <ModalityIcon className="h-4 w-4" />
            Modalidade: {course.modality}
          </span>
          {course.passphrase && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
              <KeyRound className="h-4 w-4" />
              Palavra passe: {course.passphrase}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.open(course.link, "_blank", "noopener,noreferrer")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cello-800 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cello-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
          >
            Inscrever-se
            <ExternalLink className="h-4 w-4" />
          </button>
          <a
            href={`/patotech/${course.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-cello-600 hover:text-cello-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

const Page = () => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("Todos");
  const [activeModality, setActiveModality] = useState<CourseModality>("Todos");
  const [notifyCourse, setNotifyCourse] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const [isSubmittingNotification, setIsSubmittingNotification] = useState(false);

  const ongoingCourses = useMemo(
    () =>
      (courseOpen as CourseBase[]).map((course) => ({
        ...course,
        category: getCourseCategory(course),
        modality: getCourseModality(course),
      })),
    []
  );

  const unavailableCourses = useMemo(
    () =>
      (courseClosed as CourseBase[]).map((course) => ({
        ...course,
        category: getCourseCategory(course),
        modality: getCourseModality(course),
      })),
    []
  );

  const matchesCategory = (category: CourseCategory) =>
    activeCategory === "Todos" || category === activeCategory;

  const matchesModality = (modality: CourseModality) =>
    activeModality === "Todos" || modality === activeModality;

  const visibleFeatured = featuredCourses.filter(
    (course) => matchesCategory(course.category) && matchesModality(course.modality)
  );
  const visibleOngoing = ongoingCourses.filter(
    (course) => matchesCategory(course.category) && matchesModality(course.modality)
  );
  const visibleUnavailable = unavailableCourses.filter(
    (course) => matchesCategory(course.category) && matchesModality(course.modality)
  );

  const openNotifyModal = (courseTitle: string) => {
    setNotifyCourse(courseTitle);
    setNotificationSent(false);
    setNotificationError(null);
    setIsSubmittingNotification(false);
  };

  const handleNotificationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!notifyCourse) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nome = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!nome || !email) {
      setNotificationError("Informe nome e e-mail para continuar.");
      return;
    }

    setNotificationError(null);
    setIsSubmittingNotification(true);

    try {
      const response = await fetch("/api/patotech/interessados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          interesse: notifyCourse,
        }),
      });

      const responseBody = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(responseBody?.message ?? "Nao foi possivel registrar o interesse.");
      }

      form.reset();
      setNotificationSent(true);
    } catch (error) {
      setNotificationError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel registrar o interesse agora."
      );
    } finally {
      setIsSubmittingNotification(false);
    }
  };

  return (
    <div className="-mt-8 bg-zircon-50 text-slate-900">
      <section className="relative overflow-hidden bg-cello-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/assets/images/coverHeroScti.jpg')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-cello-950/80" />

        <div className="section-default relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <img
              src="/assets/images/logos/patotech.png"
              alt="Logo PatoTech Escola de Inovação"
              className="h-auto w-full max-w-[280px] object-contain sm:max-w-[420px]"
            />
            {/*<div className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-white/10 px-3 py-2 text-sm font-semibold text-cyan-100">
              <SparkIcon />
              Cursos gratuitos e institucionais
            </div>*/}
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                PatoTech: cursos de tecnologia para conectar você ao futuro
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zircon-100 sm:text-lg">
                Encontre oportunidades de capacitação em tecnologia, inovação e desenvolvimento profissional com informações sobre inscrições, datas e status de cada turma.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#cursos-disponiveis"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-cello-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
              >
                <BookOpenCheck className="h-4 w-4" />
                Ver cursos disponíveis
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="section-default py-8">
          <div className="mb-5 flex flex-col gap-2">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cello-700">
                <Filter className="h-4 w-4" />
                Filtros por tema
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Escolha a área que combina com seu objetivo</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 sm:grid-cols-3 lg:grid-cols-4" role="tablist" aria-label="Filtrar cursos por tema">
            {courseCategories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-center text-sm font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive
                      ? "border-cello-800 bg-cello-800 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-cello-300 hover:text-cello-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cello-700">
              Modalidade
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar cursos por modalidade">
              {courseModalities.map((modality) => {
                const Icon = modalityIcons[modality];
                const isActive = activeModality === modality;

                return (
                  <button
                    key={modality}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveModality(modality)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      isActive
                        ? "border-cyan-300 bg-cyan-300 text-cello-950 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-cello-300 hover:text-cello-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {modality}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="cursos-disponiveis" className="section-default scroll-mt-24 py-14 sm:py-20">
        <div className={sectionHeadingStyles}>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Cursos disponíveis</h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visibleFeatured.length > 0 ? (
            visibleFeatured.map((course) => <FeaturedCourseCard key={course.id} course={course} />)
          ) : (
            <EmptyState>Nenhum curso disponível com esses filtros no momento.</EmptyState>
          )}
        </div>
      </section>

      <section className="bg-cello-950 text-white">
        <div className="section-default py-14 sm:py-20">
          <div className={sectionHeadingStyles}>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-200">Cursos em andamento</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">Turmas já iniciadas</h2>
          </div>

          <div className="mt-8 grid gap-4">
            {visibleOngoing.length > 0 ? (
              visibleOngoing.map((item) => (
                <CourseCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  partner={item.partner}
                  duration={item.duration}
                  isNotOpen={item.isNotOpen}
                  redirectUrl={item.link}
                  category={item.category}
                  modality={item.modality}
                  status="ongoing"
                  statusLabel="Em andamento"
                />
              ))
            ) : (
              <EmptyState>Nenhum curso em andamento com esses filtros.</EmptyState>
            )}
          </div>
        </div>
      </section>

      <section className="section-default py-14 sm:py-20">
        <div className={sectionHeadingStyles}>
          <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Cursos indisponíveis no momento</p>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Acompanhe as próximas oportunidades</h2>
        </div>

        <div className="mt-8 grid gap-4">
          {visibleUnavailable.length > 0 ? (
            visibleUnavailable.map((item) => (
              <CourseCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                partner={item.partner}
                duration={item.duration}
                isNotOpen={item.isNotOpen}
                redirectUrl={item.link}
                category={item.category}
                modality={item.modality}
                status="unavailable"
                statusLabel="Indisponível no momento"
                onNotify={openNotifyModal}
              />
            ))
          ) : (
            <EmptyState>Nenhum curso indisponível com esses filtros.</EmptyState>
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="section-default py-14 sm:py-20">
          <PartnerFooter />
        </div>
      </section>

      <section className="bg-cello-900 text-white">
        <div className="section-default flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-200">Novas turmas</p>
            <h2 className="text-3xl font-black">Quer acompanhar as próximas oportunidades?</h2>
            <p className="leading-7 text-zircon-100">
              Informe seus dados para receber avisos quando novos cursos, inscrições ou turmas forem divulgados.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openNotifyModal("Novas oportunidades do PatoTech")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-cello-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
          >
            <Bell className="h-4 w-4" />
            Quero ser notificado
          </button>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="section-default flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cello-700">
              Acompanhe a SMCTI
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Siga as redes sociais e fique por dentro das novas oportunidades.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${social.name} da SMCTI Pato Branco`}
                  title={social.name}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-cello-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500 ${social.hoverStyles}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {notifyCourse && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 px-4 py-6">
          <div
            className="w-full max-w-lg rounded-lg bg-white p-6 text-slate-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notify-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Notificação</p>
                <h2 id="notify-title" className="mt-2 text-2xl font-black">
                  Receber aviso sobre cursos
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setNotifyCourse(null)}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
                aria-label="Fechar formulário de notificação"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Interesse selecionado: <strong>{notifyCourse}</strong>
            </p>

            {notificationSent ? (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                  Interesse registrado com sucesso.
                </div>
                <p className="mt-2 leading-6">
                  Seus dados foram salvos na lista de interessados do PatoTech.
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleNotificationSubmit}>
                <div>
                  <label htmlFor="notify-name" className="text-sm font-bold text-slate-800">
                    Nome
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:border-cello-500 focus-within:ring-2 focus-within:ring-cello-100">
                    <User className="h-4 w-4 text-slate-400" />
                    <input
                      id="notify-name"
                      name="name"
                      type="text"
                      required
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="notify-email" className="text-sm font-bold text-slate-800">
                    E-mail
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:border-cello-500 focus-within:ring-2 focus-within:ring-cello-100">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input
                      id="notify-email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="voce@email.com"
                    />
                  </div>
                </div>
                {notificationError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                    {notificationError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingNotification}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cello-800 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-cello-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
                  aria-busy={isSubmittingNotification}
                >
                  <Bell className="h-4 w-4" />
                  {isSubmittingNotification ? "Salvando..." : "Confirmar interesse"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SparkIcon = () => (
  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-300 text-cello-950" aria-hidden="true">
    <Rocket className="h-3.5 w-3.5" />
  </span>
);

export default Page;
