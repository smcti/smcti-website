import HeadingText from "@components/common/HeadingText";
import Button from "@components/common/Button";

const ParqTec = () => {
  return (
    <section
      className="section-default flex flex-col items-center justify-between gap-16 py-32
      lg:flex-row"
    >
      <img
        className="p-4 max-w-full 
        sm:p-0
        lg:w-[40%]"
        src="/assets/images/Logo-Parque-1.svg"
        alt="Imagem com logo de um pato técnologico, escrito: parque tecnologico, Pato Branco, Brasil"
      />
      <div className="flex flex-col text-gray-700 gap-16 text-justify">
        <HeadingText
          super="Parque Tecnológico e SMCTI"
          title="Parque Tecnológico"
          reverse
        />
        <p>
          O Parque Tecnológico de Pato Branco, liderado pela SMCTI, é um local
          de destaque para pesquisa, extensão e incubação de empresas de base
          tecnológica. Consolidando o ambiente tecnológico da cidade, Pato
          Branco é reconhecida como uma Cidade Inteligente, conectada com o
          futuro. O Parque possui instalações modernas, incluindo módulos
          industriais para empresas âncoras e salas para empresas incubadas. É o
          lugar ideal para criar e desenvolver projetos inovadores.
        </p>
        <Button title="Saiba mais" reverse goesTo="/parque" />
      </div>
    </section>
  );
};

export default ParqTec;
