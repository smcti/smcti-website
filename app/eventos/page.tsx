"use client";

import HeadingText from "@components/common/HeadingText";
import EventCard from "@components/common/EventCard";
import eventOpen from "@/public/data/eventOpen.json";

const page = () => {
  return (
    
    <>
      <div className="my-32 section-default flex flex-col gap-8 text-gray-700">
        <HeadingText title="ÚLTIMOS EVENTOS" super="Eventos" />
        <div className="mt-2 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">
          <div className="section-default flex-col text-start justify-start gap-8">
            <div className="m-2 grid sm:grid-cols-2 lg:grid-cols-3 justify-between">
              {Object.values(eventOpen).map((item, index) => (
                <EventCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  partner={item.partner}
                  duration={item.duration}
                  isNotOpen={item.isNotOpen}
                  redirectUrl={item.link}
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
