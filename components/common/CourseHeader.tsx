import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  MapPin,
  UsersRound,
  Wifi,
} from "lucide-react";

interface CourseHeaderProps {
  id: string;
  image: string;
  title: string;
  description: string;
  partners: string;
  link: string;
  date?: string;
  enrollmentDate?: string;
  startDate?: string;
  category?: string;
  modality?: string;
  highlight?: string;
  passphrase?: string;
}

const CourseHeader = (props: CourseHeaderProps) => {
  const ModalityIcon = props.modality === "Online" ? Wifi : MapPin;

  const handlePrimaryClick = () => {
    window.open(props.link, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
      <img
        src="/assets/images/logos/patotech.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -right-8 z-0 w-56 opacity-[0.04] mix-blend-multiply sm:w-64"
      />
      <div className="relative z-10 h-56 overflow-hidden bg-slate-100">
        <img
          src={props.image}
          alt={`Imagem do curso ${props.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Matrículas abertas
          </span>
          {props.category && (
            <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-cello-900 shadow-sm">
              {props.category}
            </span>
          )}
          {props.modality && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-cello-950/90 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
              <ModalityIcon className="h-3.5 w-3.5" />
              {props.modality}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        {props.highlight && (
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cello-700">
            {props.highlight}
          </p>
        )}
        <h3 className="text-2xl font-black leading-tight text-slate-950">{props.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{props.description}</p>

        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="flex items-center gap-2 font-bold text-slate-900">
              <CalendarDays className="h-4 w-4 text-cello-700" />
              Matrículas
            </span>
            <p className="mt-1 text-slate-600">{props.enrollmentDate ?? "Consulte disponibilidade"}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="flex items-center gap-2 font-bold text-slate-900">
              <CalendarDays className="h-4 w-4 text-cello-700" />
              Início do curso
            </span>
            <p className="mt-1 text-slate-600">{props.startDate ?? props.date ?? "A definir"}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {props.date && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-2 text-xs font-bold text-cello-800">
              <CalendarDays className="h-4 w-4" />
              Período: {props.date}
            </span>
          )}
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
            <UsersRound className="h-4 w-4" />
            Parceiros: {props.partners}
          </span>
          {props.modality && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
              <ModalityIcon className="h-4 w-4" />
              Modalidade: {props.modality}
            </span>
          )}
          {props.passphrase && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
              <KeyRound className="h-4 w-4" />
              Palavra passe: {props.passphrase}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handlePrimaryClick}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cello-800 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cello-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
          >
            Inscrever-se
            <ExternalLink className="h-4 w-4" />
          </button>
          <Link
            href={`/patotech/${props.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-cello-600 hover:text-cello-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseHeader;
