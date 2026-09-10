"use client";

import { useState, useMemo, useEffect } from "react";
import HeadingText from "@components/common/HeadingText";
import news from "@/public/data/news.json";
import NewsCard from "@components/common/NewsCard";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

type Category = "Todos" | "Inovação" | "Evento" | "Visita" | "Edital";

const CATEGORIES: Category[] = [
  "Todos",
  "Inovação",
  "Evento",
  "Visita",
  "Edital",
];

const filterStyles: Record<
  Category,
  { active: string; inactive: string }
> = {
  Todos: {
    active: "bg-cello text-white border-cello",
    inactive: "border-cello text-cello hover:bg-cello/10",
  },
  Inovação: {
    active: "bg-cyan-600 text-white border-cyan-600",
    inactive: "border-cyan-600 text-cyan-700 hover:bg-cyan-50",
  },
  Evento: {
    active: "bg-violet-600 text-white border-violet-600",
    inactive: "border-violet-600 text-violet-700 hover:bg-violet-50",
  },
  Visita: {
    active: "bg-emerald-600 text-white border-emerald-600",
    inactive: "border-emerald-600 text-emerald-700 hover:bg-emerald-50",
  },
  Edital: {
    active: "bg-amber-600 text-white border-amber-600",
    inactive: "border-amber-600 text-amber-700 hover:bg-amber-50",
  },
};

const ITEMS_PER_PAGE = 18;

const Page = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<Category>("Todos");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant"});
  }, [currentPage]);

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
        (item.partner &&
          item.partner.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleCategory = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const paginationItems = useMemo(() => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <>
      <div className="my-12 section-default flex flex-col gap-8 text-gray-700">
        <HeadingText title="ÚLTIMAS NOTÍCIAS" super="noticias" />

        {/* Barra de pesquisa */}
        <div className="relative w-full max-w-xl mx-auto">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"
          />

          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Pesquisar notícias..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cello focus:border-transparent transition"
          />

          {query && (
            <button
              onClick={() => handleSearch("")}
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
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? s.active
                    : `bg-white ${s.inactive}`
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Lista */}
        <div className="mt-2 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">
          <div className="section-default flex-col text-start justify-start gap-8">
            {paginatedNews.length > 0 ? (
              <>
                <div className="m-2 gap-4 grid sm:grid-cols-1 lg:grid-cols-3 justify-between">
                  {paginatedNews.map((item) => (
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

                {/* PAGINAÇÃO */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-16">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="min-w-9 h-9 px-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="Primeira página"
                    >
                      &lt;&lt;
                    </button>

                    <button
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.max(1, page - 1)
                        )
                      }
                      disabled={currentPage === 1}
                      className="min-w-9 h-9 px-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="Página anterior"
                    >
                      &lt;
                    </button>

                    {paginationItems.map((item, index) =>
                      item === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="min-w-9 h-9 flex items-center justify-center text-gray-400"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={item}
                          onClick={() => setCurrentPage(item)}
                          className={`min-w-9 h-9 px-2 rounded-md border text-sm font-medium transition ${
                            currentPage === item
                              ? "bg-cello text-white border-cello"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}
                          aria-current={
                            currentPage === item
                              ? "page"
                              : undefined
                          }
                        >
                          {item}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="min-w-9 h-9 px-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="Próxima página"
                    >
                      &gt;
                    </button>

                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="min-w-9 h-9 px-2 border border-gray-200 rounded-md bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="Última página"
                    >
                      &gt;&gt;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                <HiOutlineSearch className="text-5xl" />

                <p className="text-lg font-medium">
                  Nenhuma notícia encontrada
                </p>

                <p className="text-sm">
                  Tente pesquisar por outro termo ou{" "}
                  <button
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("Todos");
                      setCurrentPage(1);
                    }}
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

export default Page;