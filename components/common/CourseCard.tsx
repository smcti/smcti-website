"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Info,
  LockKeyhole,
  MapPin,
  UsersRound,
  Wifi,
} from "lucide-react";

interface CourseCardProps {
  id: string;
  partner: string;
  title: string;
  description: string;
  duration: string;
  durationLabel?: string;
  image: string;
  isNotOpen: boolean;
  redirectUrl?: string;
  category?: string;
  modality?: string;
  status?: "ongoing" | "unavailable";
  statusLabel?: string;
  onNotify?: (courseTitle: string) => void;
}

const CourseCard = (props: CourseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();
  const status = props.status ?? (props.isNotOpen ? "unavailable" : "ongoing");
  const isUnavailable = status === "unavailable";
  const statusLabel = props.statusLabel ?? (isUnavailable ? "Indisponível no momento" : "Em andamento");
  const StatusIcon = isUnavailable ? LockKeyhole : Clock3;
  const ModalityIcon = props.modality === "Online" ? Wifi : MapPin;
  const durationLabel = props.durationLabel ?? "Duração";

  const cardStyles = isUnavailable
    ? "border-slate-200 bg-white text-slate-900 shadow-sm"
    : "border-white/15 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)]";

  const mutedText = isUnavailable ? "text-slate-600" : "text-zircon-100";
  const chipStyles = isUnavailable
    ? "border-slate-200 bg-slate-50 text-slate-700"
    : "border-white/15 bg-white/10 text-zircon-100";

  const handleExternalClick = () => {
    if (props.redirectUrl) {
      window.open(props.redirectUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className={`rounded-lg border transition-all duration-300 hover:-translate-y-0.5 ${cardStyles}`}>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span
            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              isUnavailable ? "bg-slate-100 text-slate-600" : "bg-cyan-300 text-cello-950"
            }`}
          >
            <StatusIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              {props.category && (
                <span
                  className={`rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${chipStyles}`}
                >
                  {props.category}
                </span>
              )}
              {props.modality && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${chipStyles}`}
                >
                  <ModalityIcon className="h-3.5 w-3.5" />
                  {props.modality}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                  isUnavailable
                    ? "bg-amber-50 text-amber-800"
                    : "bg-emerald-400/15 text-emerald-100"
                }`}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {statusLabel}
              </span>
            </span>
            <span className="mt-2 block text-lg font-black leading-tight">{props.title}</span>
            <span className={`mt-1 block text-sm ${mutedText}`}>
              {isUnavailable ? "Matrículas encerradas" : "Turma iniciada"}
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {isUnavailable && (
            <button
              type="button"
              onClick={() => props.onNotify?.(props.title)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cello-200 bg-white px-3 py-2 text-sm font-bold text-cello-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-cello-500 hover:bg-cello-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
            >
              <Bell className="h-4 w-4" />
              Notifique-me
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
              isUnavailable
                ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label={isExpanded ? `Recolher ${props.title}` : `Expandir ${props.title}`}
          >
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-4 px-4 pb-4 lg:grid-cols-[220px_1fr]">
            <img
              src={props.image}
              alt={`Imagem do curso ${props.title}`}
              className="h-44 w-full rounded-lg object-cover lg:h-full"
            />
            <div className="space-y-4">
              <p className={`text-sm leading-6 ${mutedText}`}>{props.description}</p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 ${chipStyles}`}>
                  <UsersRound className="h-4 w-4" />
                  Parceiros: {props.partner}
                </span>
                <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 ${chipStyles}`}>
                  <CalendarDays className="h-4 w-4" />
                  {durationLabel}: {props.duration || "A definir"}
                </span>
                {props.modality && (
                  <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 ${chipStyles}`}>
                    <ModalityIcon className="h-4 w-4" />
                    Modalidade: {props.modality}
                  </span>
                )}
                <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 ${chipStyles}`}>
                  <Info className="h-4 w-4" />
                  {isUnavailable ? "Matrículas encerradas" : "Consulte detalhes da turma"}
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {!isUnavailable && (
                  <Link
                    href={`/patotech/${props.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-bold text-cello-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    Ver detalhes
                    <ChevronDown className="-rotate-90 h-4 w-4" />
                  </Link>
                )}
                {props.redirectUrl && !isUnavailable && (
                  <button
                    type="button"
                    onClick={handleExternalClick}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    Acessar inscrição
                    <ExternalLink className="h-4 w-4" />
                  </button>
                )}
                {isUnavailable && (
                  <button
                    type="button"
                    onClick={() => props.onNotify?.(props.title)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-cello-800 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cello-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cello-500"
                  >
                    <Bell className="h-4 w-4" />
                    Notifique-me quando abrir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
