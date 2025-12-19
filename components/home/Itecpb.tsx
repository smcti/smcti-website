import HeadingText from "@components/common/HeadingText";
import Button from "@components/common/Button";

const Itecpb = () => {
  return (
    <section className="bg-cello-800 ">
      <div
        className="section-default flex flex-col items-center justify-between gap-16 py-32
        lg:flex-row"
      >
        <div className="flex flex-col text-zircon gap-16 text-justify">
          <HeadingText
            super="Incubadora Tecnológica de Pato Branco"
            title="ITECPB"
            dark
          />
          <p>
            A Incubadora Tecnológica de Pato Branco (ITECPB) é um espaço onde a
            inovação, tecnologia, conhecimento e network se inter-relacionam
            fomentando o empreendedorismo. Ambiente que visa oferecer suporte
            técnico e gerencial às empresas de base tecnológica, durante todas
            as etapas de desenvolvimento de negócios. Localizada dentro do
            parque tecnológico, a estrutura conta com 36 salas de 25m² cada, com
            mobília básica. A ITECPB é uma dos departamentos administrados pela
            Secretaria Municipal de Ciência, Tecnologia e Inovação (SMCTI)
          </p>
          <Button title="Saiba mais" goesTo="/itecpb" />
        </div>
        <img
          className="p-4 max-w-full hidden
          lg:flex
          sm:p-0
          lg:w-[40%]"
          src="/assets/images/itecpb-logo.png"
          alt="Logo da ITECPB, o contorno de uma lampada com uma planta dentro dela, alegorizando a ideia de que estamos encubando ideias"
        />
      </div>
    </section>
  );
};

export default Itecpb;
