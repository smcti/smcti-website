"use client";

import HeadingText from "@components/common/HeadingText";
import news from "@/public/data/news.json";
import NewsCard from "@components/common/NewsCard";

const page = () => {
  return (
    <>
      <div className="my-12 section-default flex flex-col gap-8 text-gray-700">
        <HeadingText title="ÚLTIMAS NOTÍCIAS" super="noticias" />
        <div className="mt-2 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">
          <div className="section-default flex-col text-start justify-start gap-8">
            <div className="m-2 gap-4 grid sm:grid-cols-1 lg:grid-cols-3 justify-between">
              {Object.values(news).map((item, index) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
