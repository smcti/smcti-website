"use client";

import HeadingText from "@components/common/HeadingText";
import agenda from "@public/data/appointments.json";

import { FaUsers } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";
import { FaBus } from "react-icons/fa";
import { MdOutlinePeople } from "react-icons/md";


const Booking = () => {
  const iconList = [FaUsers, FaUserFriends, GiTheater, MdOutlinePeople];

  const renderIcon = (icon: any) => {
    const Icon = icon;
    return <Icon size={48} />;
  };

  return (
    <section className="my-32">
      <div className="section-default flex flex-col gap-16">
        <HeadingText
          title="Reserva de espaços e visitas"
          super="Agendamentos"
          reverse
        />
        <div className="flex flex-col md:flex-col gap-4">
          <div className="flex flex-wrap ">
            {Object.values(agenda).map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full bg-white h-48 rounded-lg p-4  border flex flex-col justify-between border-t-4
                                hover:cursor-pointer hover:shadow-lg md:hover:-translate-y-2 md:transition-all  md:max-w-[48%]  md:mr-auto
                                ${index == 0 ? "border-t-red-500" : ""}
                                ${index == 1 ? "border-t-green-500" : ""}
                                ${index == 2 ? "border-t-blue-500" : ""}
                                ${index == 3 ? "border-t-yellow-500" : ""}`}
                  onClick={() => {
                    window.location.assign(item.href);
                  }}
                >
                  <h3 className="text-gray-800 font-black">{item.title}</h3>
                  <div
                    className={`flex flex-row justify-end
                                    ${index == 0 ? "text-red-500" : ""}
                                    ${index == 1 ? "text-green-500" : ""}
                                    ${index == 2 ? "text-blue-500" : ""}
                                    ${index == 3 ? "text-yellow-500" : ""}
                                    `}
                  >
                    {renderIcon(iconList[index])}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full pt-10">
            <iframe
              className="w-full h-96 "
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1789.9757121923926!2d-52.69454084336758!3d-26.19825839775754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e553462ee8270b%3A0x722927d4bea230ed!2sParque%20Tecnol%C3%B3gico%20de%20Pato%20Branco!5e0!3m2!1spt-BR!2sbr!4v1715082773165!5m2!1spt-BR!2sbr"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
