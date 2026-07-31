"use client";

import { useState, useMemo } from "react";
import HeadingText from "@components/common/HeadingText";
import news from "@/public/data/news.json";
import NewsCard from "@components/common/NewsCard";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { SlidersHorizontal } from "lucide-react";

type Category = "Todos" | "Inovação" | "Evento" | "Visita" |  "Legislação" ;

const CATEGORIES: Category[] = ["Todos", "Inovação", "Evento", "Visita", "Legislação"];

const filterStyles: Record<Category, { active: string; inactive: string }> = {
  Todos:      { active: "bg-cello text-white border-cello",             inactive: "border-cello text-cello hover:bg-cello/10" },
  Inovação:   { active: "bg-cyan-600 text-white border-cyan-600",       inactive: "border-cyan-600 text-cyan-700 hover:bg-cyan-50" },
  Evento:     { active: "bg-violet-600 text-white border-violet-600",   inactive: "border-violet-600 text-violet-700 hover:bg-violet-50" },
  Visita:     { active: "bg-emerald-600 text-white border-emerald-600", inactive: "border-emerald-600 text-emerald-700 hover:bg-emerald-50" },
  Legislação: { active: "bg-amber-600 text-white border-amber-600",     inactive: "border-amber-600 text-amber-700 hover:bg-amber-50" },
};

const page = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.values(news).filter((item) => {
      const matchesCategory =
        activeCategory === "Todos" ||
        (item as any).category === activeCategory;

      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.partner && item.partner.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <>
      <div className="my-12 section-default flex flex-col gap-8 text-gray-700">
        <HeadingText title="ÚLTIMAS NOTÍCIAS" super="noticias" />

        {/* Barra de pesquisa */}
        <div className="relative w-full max-w-xl mx-auto">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar notícias..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cello focus:border-transparent transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              aria-label="Limpar pesquisa"
            >
              <HiOutlineX className="text-lg" />
            </button>
          )}
        </div>

        {/* Filtros por categoria */}
        <div
          className="flex flex-wrap items-center gap-2 max-w-xl mx-auto"
          role="group"
          aria-label="Filtrar notícias por categoria"
        >
          {CATEGORIES.map((cat) => {
            const s = filterStyles[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                  isActive ? s.active : `bg-white ${s.inactive}`
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">
          <div className="section-default flex-col text-start justify-start gap-8">
            {filtered.length > 0 ? (
              <div className="m-2 gap-4 grid sm:grid-cols-1 lg:grid-cols-3 justify-between">
                {filtered.map((item) => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    partner={item.partner}
                    datePosted={item.datePosted}
                    isNotOpen={item.isNotOpen}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                <HiOutlineSearch className="text-5xl" />
                <p className="text-lg font-medium">Nenhuma notícia encontrada</p>
                <p className="text-sm">
                  Tente pesquisar por outro termo ou{" "}
                  <button
                    onClick={() => { setQuery(""); setActiveCategory("Todos"); }}
                    className="text-cello underline hover:text-blue-700 transition-colors"
                  >
                    ver todas as notícias
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;