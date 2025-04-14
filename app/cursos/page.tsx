"use client";

import CourseCard from "@components/common/CourseCard";
import Link from "@node_modules/next/link";

const page = () => {
  const handleClick = () => {
    window.location.href = "https://forms.gle/MiGhD86S1zYai6gJ8";
  };

  return (
    <>
      <div className="my-32 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">
        <div className="section-default flex lg:flex-row flex-col gap-8">
          <img
            src="/assets/images/defesa_rede.png"
            alt="curso"
            className="lg:w-1/2 rounded-xl"
          />
          <div className="grid grid-cols-1 text-black gap-4 lg:w-1/2 text-center">
            <p className="text-3xl">
              DEFESA DE REDE - ANALISTA DE CIBERSEGURANÇA JÚNIOR
            </p>
            <p className="text-justify">
              Nesse curso você irá obter o conhecimento básico que você usará no
              local de trabalho como Analista de Cibersegurança Júnior. Este
              curso aborda maneiras de monitorar sua rede e como avaliar alertas
              de segurança.
            </p>
            <Link href={"cursos/1"} className="justify-self-end underline">
              Saiba mais
            </Link>
            <button
              onClick={handleClick}
              className="mt-auto flex bg-cello rounded-lg text-white justify-center w-full hover:border-black border-2 hover:bg-white hover:text-black hover:shadow-sm hover:shadow-white p-2 h-fit"
            >
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
      <div className="mt-32 flex flex-col h-full bg-cello gap-8 text-white">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Disponíveis:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              image="/assets/images/iot.png"
              title="INTRODUÇÃO À IOT E À TRANSFORMAÇÃO DIGITAL"
              description="Aprender como a Internet das Coisas (IoT) e a transformação digital
              criam valor ao conectar objetos físicos cotidianos ao mundo digital,
              baseando-se em sua programação, dados massivos e análise, automação e
              segurança."
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/9qyVDuSUVzPy95n59"
            />
            <CourseCard
              image="/assets/images/data_science.png"
              title="INTRODUÇÃO À CIÊNCIA DE DADOS"
              description="Explorar conceitos fundamentais de dados e compreender o valor da alfabetização 
              em dados, das visualizações e dos projetos de dados exploratórios."
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/GaSQdX1s11Hvk9Xs9"
            />
            <CourseCard
              image="/assets/images/cybersecurity.png"
              title="INTRODUÇÃO À CIBERSEGURANÇA"
              description="Introduzir a segurança cibernética, explorando formas de se manter seguro online, 
              os diferentes tipos de malware e ataques, as medidas usadas pelas organizações para mitigar os 
              ataques e investigando oportunidades profissionais."
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/fS869P4zJxFwfWUq5"
            />
            <CourseCard
              image="/assets/images/hardware.png"
              title="FUNDAMENTOS DO HARDWARE DE COMPUTADOR"
              description="Fundamentos do Hardware do Computador explora os fundamentos de computadores e 
              dispositivos móveis, os componentes que os compõem, como eles funcionam e ferramentas e técnicas 
              básicas de solução de problemas."
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/ZVqLZdkUB9sEWbwp8"
            />
            <CourseCard
              image="/assets/images/skillbuild.png"
              title="FUNDAMENTOS DE IA COM IBM SKILLSBUILD"
              description="A inteligência artificial está transformando o futuro do trabalho e oferece a chance 
              de aprender sobre seu impacto e explorar carreiras na área. O conteúdo aborda a história da IA, 
              suas aplicações, como ela entende linguagem e imagens, e como aprende com redes neurais. Também 
              inclui práticas com o IBM Watson Studio, ética em IA e orientações para atuar no mercado em expansão"
              duration="10 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/StcnBZTqieoVLccM9"
            />
            <CourseCard
              image="/assets/images/empreendedorismo.png"
              title="DESCOBRINDO O EMPREENDEDORISMO"
              description="A inteligência artificial está transformando o futuro do trabalho e oferece a chance 
              de aprender sobre seu impacto e explorar carreiras na área. O conteúdo aborda a história da IA, 
              suas aplicações, como ela entende linguagem e imagens, e como aprende com redes neurais. Também 
              inclui práticas com o IBM Watson Studio, ética em IA e orientações para atuar no mercado em expansão"
              duration="30 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/pt4ZuVUEHjfB6qqz7"
            />
            <CourseCard
              image="/assets/images/python.png"
              title="FUNDAMENTOS DE PYTHON I"
              description="Desenvolver habilidades para realizar tarefas de codificação relacionadas com 
              os elementos essenciais da programação na linguagem Python.Conhecer os conceitos universais 
              da programação de computadores, a sintaxe e a semântica da linguagem."
              duration="30 horas"
              isNotOpen={false}
              redirectUrl="https://docs.google.com/forms/d/e/1FAIpQLSenls6R2LXZGcnzsed_PeBaATM9ikwi27RFX9bdeZ7AnYBtXQ/viewform?usp=sharing"
            />
            <CourseCard
              image="/assets/images/python.png"
              title="FUNDAMENTOS DE PYTHON II"
              description="Desenvolver habilidades para realizar tarefas de codificação relacionadas com 
              os elementos essenciais da programação na linguagem Python.Conhecer os conceitos universais 
              da programação de computadores, a sintaxe e a semântica da linguagem."
              duration="40 horas"
              isNotOpen={false}
              redirectUrl="https://docs.google.com/forms/d/e/1FAIpQLSeYcAHROHBZqhEP95y2oESPXOCMaLgjKCv7eIdEGBKj8mDu5Q/viewform?usp=sharing"
            />
          </div>
        </div>
      </div>
      <div className="mt-32 flex flex-col h-full bg-zirco-50 gap-8 text-black">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Indisponíveis:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              image="/assets/images/ai.png"
              title="FUNDAMENTOS DE INTELIGENCIA  ARTIFICIAL"
              description="Desenvolver o conhecimento, compreender o que a IA pode significar para seu futuro
               e visualizar-se em uma carreira impulsionada pela IA. Compreender como a IA entende a linguagem, 
               interpreta imagens e aprende utilizando redes neurais modeladas a partir do cérebro humano."
              duration="10 horas"
              isNotOpen={true}
              redirectUrl=""
            />
            <CourseCard
              image="/assets/images/htmlcss.png"
              title="HTML E CSS"
              description="Desenvolver habilidades fundamentais, entender como a web é construída e visualizar-se
               em uma carreira na área de desenvolvimento front-end. Compreender como as páginas ganham estrutura 
               com HTML, estilo com CSS e como essas linguagens dão vida a sites modernos e acessíveis."
              duration="60 horas"
              isNotOpen={true}
              redirectUrl=""
            />
            <CourseCard
              image="/assets/images/javascript.png"
              title="JAVASCRIPT"
              description="Aprender a dar interatividade às páginas da web, entender como os sites respondem a 
              ações dos usuários e imaginar-se criando experiências dinâmicas no navegador. Compreender como o 
              JavaScript manipula elementos, processa dados e torna a web mais inteligente, fluida e conectada."
              duration="60 horas"
              isNotOpen={true}
              redirectUrl=""
            />
          </div>
        </div>
        <div className="bg-gray-400 mx-16 h-[1px] "></div>
        <div className="grid lg:grid-cols-7 grid-cols-2 w-full p-2 justify-items-center justify-center items-center ">
          <img
            src="./assets/images/logos/smcti.png"
            className="h-12"
            alt="logo parceiro"
          />
          <img
            src="./assets/images/logos/parque.png"
            className="h-24"
            alt="logo parceiro"
          />
          <img
            src="./assets/images/logos/brasil digital.png"
            className="h-24"
            alt="logo parceiro"
          />
          <img
            src="./assets/images/logos/cisco.png"
            className="h-24"
            alt="logo parceiro"
          />
          <img
            src="./assets/images/logos/cyberseguranca.png"
            className="h-24"
            alt="logo parceiro"
          />
          <img
            src="./assets/images/logos/dainf.png"
            className="h-12"
            alt="logo parceiro"
          />
          <img
            src="./assets/images/logos/utfpr.png"
            className="h-20"
            alt="logo parceiro"
          />
        </div>
      </div>
    </>
  );
};

export default page;
