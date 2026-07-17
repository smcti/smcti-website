"use client";

import HeadingText from "@components/common/HeadingText";
import newsDetails from "@/public/data/newsDetails.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const article = Object.values(newsDetails).find(
    (item: any) => item.id === params.id
  );

  if (!article) {
    notFound();
  }

  return (
    <div className="section-default my-12 flex flex-col gap-10 text-gray-700">
      <Link
        href="/noticias"
        className="flex items-center gap-2 text-cello hover:underline"
      >
        <HiOutlineArrowLeft />
        Voltar para notícias
      </Link>

      <HeadingText
        title={article.title}
        super="Notícias"
      />

      <div className="m-2 flex flex-wrap gap-6 text-sm text-gray-500">
        <p>
          <strong>Publicado em:</strong> {article.datePosted}
        </p>

        {article.partner && (
          <p>
            <strong>Secretaria:</strong> {article.partner}
          </p>
        )}
      </div>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className={`aspect-video w-full rounded-xl ${
            article.id === "webinar-cpsi-ril-2026"
              ? "object-contain bg-gray-100"
              : "object-cover"
          }`}
        />
      )}

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 text-justify leading-8">
        {article.content.map((paragraph: string, index: number) => (
          <div key={index}>
            <p>{paragraph}</p>

            {article.images &&
              article.images[index] && (
                <img
                  src={article.images[index]}
                  alt={`Imagem ${index + 1}`}
                  className="mt-8 w-full rounded-xl object-cover shadow-md"
                />
              )}
          </div>
        ))}

        {article.link && (
          <p className="">
            <a
              href={article.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cello font-bold text-md underline hover:text-blue-700 transition-colors"
            >
              {article.link.text}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;