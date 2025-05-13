"use client";

import CourseCard from "@components/common/CourseCard";
import CourseHeader from "@components/common/CourseHeader";
import PartnerFooter from "@components/common/PartnerFooter";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="my-32 flex flex-col h-full bg-zircon-50 gap-8 text-gray-700">
        <CourseHeader
          id="8"
          image="/assets/images/cursos/robotica.jpg"
          title="Introdução à Robótica Móvel com Arduino - Presencial"
          description="O curso oferece uma introdução à robótica móvel, abordando teoria
              e prática da locomoção autônoma em robôs seguidores de linha e
              lutadores de sumô. Os alunos aprenderão eletrônica básica,
              microcontroladores e programação, desenvolvendo projetos com
              Arduino até a construção e programação desses robôs."
          partners="SMCTI e do DAINF/UTFPR-PB"
          link="https://forms.gle/VhQH1S7BLX1GYu879"
        />
        <CourseHeader
          id="12"
          image="/assets/images/cursos/ia_negocios.jpg"
          title="Curso de Aplicação de Inteligência Artificial para Negócios - Presencial"
          description="Oportunizar aos participantes conhecimentos relacionados a
           aplicação da inteligência artificial em empresas."
          partners="SMCTI e SENAC"
          link="https://forms.gle/v8pahb87izBui9V17"
        />
        <CourseHeader
          id="11"
          image="/assets/images/cursos/eletronica.png"
          title="Aperfeiçoamento em Eletrônica Básica - Presencial"
          description="O aperfeiçoamento em eletrônica básica envolve o domínio de
              conceitos fundamentais como resistores, capacitores, transistores
              e circuitos integrados, além da prática com instrumentos como
              multímetros, soldadores e placas de circuito."
          partners="SMCTI e SENAI"
          link="https://forms.gle/FGJ7fv8v4bQiZNqVA"
        />
      </div>
      <div className="mt-32 flex flex-col h-full bg-cello gap-8 text-white">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Disponíveis:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 ">
            <CourseCard
              id="1"
              image="/assets/images/cursos/defesa_rede.png"
              title="DEFESA DE REDE - ANALISTA DE CIBERSEGURANÇA JÚNIOR - Online"
              description="Nesse curso você irá obter o conhecimento básico que você usará no
              local de trabalho como Analista de Cibersegurança Júnior. Este
              curso aborda maneiras de monitorar sua rede e como avaliar alertas
              de segurança."
              partner="SMCTI, UTFPR e CISCO"
              duration="27 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/MiGhD86S1zYai6gJ8"
            />
            <CourseCard
              id="2"
              image="/assets/images/cursos/iot.png"
              title="INTRODUÇÃO À IOT E À TRANSFORMAÇÃO DIGITAL - Online"
              description="Aprender como a Internet das Coisas (IoT) e a transformação digital
              criam valor ao conectar objetos físicos cotidianos ao mundo digital,
              baseando-se em sua programação, dados massivos e análise, automação e
              segurança."
              partner="SMCTI, UTFPR e CISCO"
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/9qyVDuSUVzPy95n59"
            />
            <CourseCard
              id="3"
              image="/assets/images/cursos/data_science.png"
              title="INTRODUÇÃO À CIÊNCIA DE DADOS - Online"
              description="Explorar conceitos fundamentais de dados e compreender o valor da alfabetização 
              em dados, das visualizações e dos projetos de dados exploratórios."
              partner="SMCTI, UTFPR e CISCO"
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/GaSQdX1s11Hvk9Xs9"
            />
            <CourseCard
              id="4"
              image="/assets/images/cursos/cybersecurity.png"
              title="INTRODUÇÃO À CIBERSEGURANÇA - Online"
              description="Introduzir a segurança cibernética, explorando formas de se manter seguro online, 
              os diferentes tipos de malware e ataques, as medidas usadas pelas organizações para mitigar os 
              ataques e investigando oportunidades profissionais."
              partner="SMCTI, UTFPR e CISCO"
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/fS869P4zJxFwfWUq5"
            />
            <CourseCard
              id="5"
              image="/assets/images/cursos/hardware.png"
              title="FUNDAMENTOS DO HARDWARE DE COMPUTADOR - Online"
              description="Fundamentos do Hardware do Computador explora os fundamentos de computadores e 
              dispositivos móveis, os componentes que os compõem, como eles funcionam e ferramentas e técnicas 
              básicas de solução de problemas."
              partner="SMCTI, UTFPR e CISCO"
              duration="6 horas"
              isNotOpen={false}
              redirectUrl="https://forms.gle/ZVqLZdkUB9sEWbwp8"
            />
            <CourseCard
              id="6"
              image="/assets/images/cursos/ai.png"
              title="FUNDAMENTOS DE IA COM IBM SKILLSBUILD - Online"
              description="A inteligência artificial está transformando o futuro do trabalho e oferece a chance 
              de aprender sobre seu impacto e explorar carreiras na área. O conteúdo aborda a história da IA, 
              suas aplicações, como ela entende linguagem e imagens, e como aprende com redes neurais. Também 
              inclui práticas com o IBM Watson Studio, ética em IA e orientações para atuar no mercado em expansão."
              duration="10 horas"
              partner="SMCTI, UTFPR e CISCO"
              isNotOpen={false}
              redirectUrl="https://forms.gle/StcnBZTqieoVLccM9"
            />
            <CourseCard
              id="7"
              image="/assets/images/cursos/empreendedorismo.png"
              title="DESCOBRINDO O EMPREENDEDORISMO - Online"
              description="Você já sonhou em abrir seu próprio negócio? Embarcar nessa jornada pode parecer desafiador,
               mas com o suporte certo pode se transformar em uma aventura gratificante. Descobrir o empreendedorismo é
                o primeiro passo nesta emocionante jornada."
              duration="30 horas"
              partner="SMCTI, UTFPR e CISCO"
              isNotOpen={false}
              redirectUrl="https://forms.gle/pt4ZuVUEHjfB6qqz7"
            />
          </div>
        </div>
      </div>
      <div className="mt-32 flex flex-col h-full bg-zirco-50 gap-8 text-black">
        <div className="section-default flex-col text-start justify-start gap-8">
          <p className="m-2 w-full text-2xl font-bold">Indisponíveis:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              id="9"
              image="/assets/images/cursos/python.png"
              title="FUNDAMENTOS DE PYTHON I - Presencial"
              description="Desenvolver habilidades para realizar tarefas de codificação
              relacionadas com os elementos essenciais da programação na
              linguagem Python. Conhecer os conceitos universais da programação
              de computadores, a sintaxe e a semântica da linguagem."
              duration="30 horas"
              partner="SMCTI e do DAINF/UTFPR-PB"
              isNotOpen={true}
              redirectUrl=""
            />
            <CourseCard
              id="10"
              image="/assets/images/cursos/python.png"
              title="FUNDAMENTOS DE PYTHON II - Online"
              description="Desenvolver habilidades para realizar tarefas de codificação
              relacionadas com os elementos essenciais da programação na
              linguagem Python. Conhecer os conceitos universais da programação
              de computadores, a sintaxe e a semântica da linguagem."
              duration="40 horas"
              partner="SMCTI, UTFPR e CISCO"
              isNotOpen={true}
              redirectUrl=""
            />
            <CourseCard
              id="12"
              image="/assets/images/cursos/htmlcss.png"
              title="HTML E CSS - Presencial"
              description="Desenvolver habilidades fundamentais, entender como a web é construída e visualizar-se
               em uma carreira na área de desenvolvimento front-end. Compreender como as páginas ganham estrutura 
               com HTML, estilo com CSS e como essas linguagens dão vida a sites modernos e acessíveis."
              duration="60 horas"
              partner="SMCTI e SENAC"
              isNotOpen={true}
              redirectUrl=""
            />
            <CourseCard
              id="12"
              image="/assets/images/cursos/javascript.png"
              title="JAVASCRIPT - Presencial"
              description="Aprender a dar interatividade às páginas da web, entender como os sites respondem a 
              ações dos usuários e imaginar-se criando experiências dinâmicas no navegador. Compreender como o 
              JavaScript manipula elementos, processa dados e torna a web mais inteligente, fluida e conectada."
              duration="60 horas"
              partner="SMCTI e SENAC"
              isNotOpen={true}
              redirectUrl=""
            />
          </div>
        </div>
        <PartnerFooter />
      </div>
    </>
  );
};

export default page;
