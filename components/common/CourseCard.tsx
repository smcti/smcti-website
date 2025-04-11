import { useState } from "@node_modules/@types/react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  isNotOpen: boolean;
  redirectUrl: string;
}

const CourseCard = (props: CourseCardProps) => {
  const handleClick = () => {
    window.location.href = props.redirectUrl;
  };

  return (
    <div className="m-2 h-full flex flex-col justify-between p-2 rounded-xl">
      <div>
        <img
          src={props.image}
          alt="imagemCurso"
          className="w-full rounded-xl"
        />
        <p className="h-12 my-2 font-bold text-center">{props.title}</p>
        <p className="my-2 font-bold">Objetivos de aprendizado</p>
        <p className="text-justify min-h-[9rem]">{props.description}</p>
      </div>
      <div className="mt-auto">
        <p className="mt-2 font-bold">Duração: {props.duration}</p>
        <div className="flex w-full">
          <button
            disabled={props.isNotOpen}
            className={`flex mt-4 rounded-lg ${
              props.isNotOpen
                ? "bg-cello text-white"
                : "border-white text-white hover:bg-white hover:text-black hover:translate-y-[-1px]"
            } border border-white justify-center w-full p-2`}
            onClick={handleClick}
          >
            {props.isNotOpen ? "Indisponível" : "Inscrever-se"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
