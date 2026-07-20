'use client'

import { useEffect } from "react";
import Script from "next/script";
import Reveal from "@components/common/reveal";
import HeadingText from "@components/common/HeadingText";
import {
  ShieldCheck,
  Camera,
  ScanFace,
  CarFront,
  AudioLines,
  Building2,
  Landmark,
  Siren,
  Layers,
  MapPinned,
  Lock,
  PlayCircle,
  EyeIcon,
  Waves,
  School,
  FenceIcon,
  Fence,
  Eye,
  Users,
  TrafficCone,
  ServerCog,
  Cctv,
  Watch,
  Aperture,
  MonitorPlay,
  RadioIcon,
  Server,
} from "lucide-react";
import { RadioGroup } from "@node_modules/@headlessui/react/dist";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const fases = [
  {
    numero: "01",
    titulo: "Reconhecimento facial e de placas",
    texto:
      "Implantação dos sistemas de reconhecimento facial e de leitura automática de placas (LPR), além da central de monitoramento na Delegacia da Mulher.",
    icon: ScanFace,
  },
  {
    numero: "02",
    titulo: "Expansão urbana e novos pontos",
    texto:
      "Ampliação da cobertura de câmeras pela cidade — incluindo terminais e pontos estratégicos — com tecnologias de análise de áudio, capazes de identificar sons como gritos, vidros quebrando ou tumultos.",
    icon: Camera,
  },
  {
    numero: "03",
    titulo: "Segurança da zona rural",
    texto:
      "Expansão do monitoramento voltado às comunidades e produtores da zona rural do município, levando o cercamento eletrônico também para fora do perímetro urbano.",
    icon: MapPinned,
  },
];

const pilares = [
  {
    titulo: "Leitura de placas (LPR)",
    texto:
      "Câmeras com leitura automática de placas identificam veículos com restrição, como furto, roubo ou alertas judiciais, gerando avisos em tempo real para as equipes em campo.",
    icon: CarFront,
  },
  {
    titulo: "Reconhecimento facial",
    texto:
      "Tecnologia de identificação biométrica utilizada para localizar pessoas com mandado de prisão em aberto em locais de grande circulação.",
    icon: ScanFace,
  },
  {
    titulo: "Contagem de pessoas",
    texto:
      "Identificação e contagem do fluxo de pedestres em áreas de grande circulação, permitindo detectar aglomerações e apoiar ações preventivas das forças de segurança.",
    icon: Users,
  },
  {
    titulo: "Contagem de veículos",
    texto:
      "Detecção e contagem automática do fluxo de veículos motorizados e não motorizados, gerando dados de densidade de tráfego em tempo real para apoiar o planejamento e a fiscalização urbana.",
    icon: TrafficCone,
  },
  {
    titulo: "Análise de áudio",
    texto:
      "Câmeras com inteligência embarcada capazes de reconhecer sons como gritos, vidros quebrando ou tumultos, disparando alertas automáticos para a central.",
    icon: AudioLines,
  },
  {
    titulo: "Controle de Enchente",
    texto:
      "As câmeras são capazes de identificar o nível padrão de água da região. Caso o nível da água exceda o limite, é disparado um alarme para alerta de enchente.",
    icon: Waves,
  },
  {
    titulo: "Proteção Perimetral",
    texto:
      "Etapa em desenvolvimento que filtra automaticamente alarmes falsos disparados por animais, movimentos de folhas ou outros eventos. Conta com reconhecimento secundário para aumentar a precisão dos alarmes",
    icon: Fence,
  },
  {
    titulo: "Alunos + Seguros",
    texto:
    "As escolas municipais e CMEIs possuem duas câmeras de monitoramento na área externa. Além de um botão de pânico, disponível por meio de um aplicativo para celular, que envia um alerta diretamente à Polícia Militar",
    icon: School,
  },
];

const especificacoesCameras = [
  {
    titulo: "Câmeras Fixas de Alta Resolução",
    texto:
      "Distribuídas em áreas críticas, distinguem humanos, veículos e animais, permitindo criar cercas virtuais com horários programados. Reconhecem atributos de veículos (tipo, cor, logotipo), de pessoas (gênero, vestimenta, acessórios) e de rosto (idade, expressão, uso de máscara), além de captar som para disparo de alertas.",
    icon: Camera,
  },
  {
    titulo: "Câmeras Speed Dome",
    texto:
      "Tecnologia Starlight para cenas nítidas em baixa luminosidade, rastreamento automático de alvos por Pan/Tilt/Zoom, proteção perimetral com filtro de alarmes falsos e certificação IP67 / TVS 6000V contra raios e surtos elétricos.",
    icon: Aperture,
  },
  {
    titulo: "Câmeras Corporais",
    texto:
      "Modelo DH-MPT220 com gravação em 1080p, lente ultra-angular de 124°, visão noturna infravermelha, GPS integrado e armazenamento expansível até 256 GB, gerenciadas por estação de coleta com carregamento automático.",
    icon: Cctv,
  },
  {
    titulo: "Câmera de Visão Panorâmica",
    texto:
      "Combina visão panorâmica de 360° com uma câmera PTZ de 56x de zoom em imagem 2K, reunindo 8 câmeras Full HD para reconhecimento facial, densidade de veículos e aglomeração de pessoas em uma única estrutura.",
    icon: Eye,
  },
  {
    titulo: "Totem da Praça Central",
    texto:
      "Idealizado para situações de emergência, o Terminal Telefônico de Emergência contata diretamente o centro de recebimento de alarmes com um botão. Oferece funções como áudio bidirecional e transmissão de voz, e possui um módulo PSTN que se conecta diretamente à linha telefônica e ao centro de recebimento de alarmes.",
    icon: RadioIcon,
  },
  {
    titulo: "Infraestrutura de Servidores",
    texto:
      "Infraestrutura interna de servidores para processamento de imagens e inteligência artificial, com mais de 1,4 Petabytes de armazenamento bruto, switches de rede, firewall, racks e nobreaks, instalada em espaço da Polícia Militar. O ambiente garante retenção de vídeos por até 60 dias e dos registros de passagem de veículos por até 180 dias, assegurando a segurança, além de permitir futuras expansões.",
    icon: Server,
  },
];

const centrais = [
  {
    titulo: "Central de Monitoramento Principal",
    texto:
      "Localizada na sede da Polícia Militar, é equipada com um painel de LED de alta resolução de 5,12 m de comprimento por 1,92 m de altura, computador dedicado ao processamento de todas as imagens recebidas e mesa controladora para a operação das câmeras Speed Dome.",
    icon: ServerCog,
  },
  {
    titulo: "Subcentral da Delegacia da Mulher",
    texto:
      "Conta com duas telas LCD de 50 polegadas para apoiar o videomonitoramento, auxiliando na investigação e na prevenção da criminalidade, especialmente em casos de violência contra a mulher.",
    icon: ShieldCheck,
  },
  {
    titulo: "Subcentral da Polícia Civil",
    texto:
      "Dispõe de acesso autorizado ao sistema para visualização das câmeras, reprodução de vídeos e consulta ao histórico de imagens armazenadas, em apoio às atividades de investigação.",
    icon: Landmark,
  },
  {
    titulo: "Subcentral do Departamento de Trânsito",
    texto:
      "Possui acesso autorizado ao sistema para visualização das câmeras, reprodução de vídeos e consulta ao histórico de imagens, conforme autorização da Polícia Militar, apoiando as atividades de fiscalização e gestão do trânsito.",
    icon: MonitorPlay,
  },
];

const parceiros = [
  {
    titulo: "SMCTI",
    texto:
      "Secretaria Municipal de Ciência, Tecnologia e Inovação — coordena institucionalmente o projeto e sua gestão.",
    icon: Building2,
  },
  {
    titulo: "3º Batalhão da Polícia Militar",
    texto:
      "Responsável pela operação efetiva do sistema e pelo acesso às imagens conforme protocolos de segurança pública.",
    icon: Siren,
  },
  {
    titulo: "Polícia Civil",
    texto:
      "Atua na investigação e no uso das informações geradas pelo sistema dentro das regulamentações aplicáveis.",
    icon: Landmark,
  },
  {
    titulo: "PROC Group",
    texto:
      "Empresa parceira responsável pelo fornecimento, integração, instalação e manutenção da infraestrutura tecnológica.",
    icon: Layers,
  },
];

const Pato360Page = () => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);
  

  return (
    <div className="-mt-8 bg-zircon-50 text-slate-900">
      <section className="relative overflow-hidden text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/fotos/pracacentral.jpg')" }}>
        <div aria-hidden="true" className="absolute inset-0 bg-cello-950/80" />
        <div className="relative z-10 section-default flex flex-col gap-8 py-24 sm:py-34">
      
          <Reveal>
            <img src="/assets/images/logos/pato360_white.png" alt="Logo Pato 360°" className="h-auto w-full max-w-[200px] object-contain sm:max-w-[340px] mb-10"/>
            <div className="flex flex-col gap-6 max-w-3xl">
   
              <h1 className="font-black text-4xl sm:text-6xl leading-tight">
                Pato 360°: projeto de segurança municipal
              </h1>
              <p className="text-lg text-cello-100 leading-relaxed">
                Um ecossistema de monitoramento inteligente que utiliza
                inteligência artificial para fortalecer a segurança pública e
                atender às demandas do município,
                consolidando Pato Branco como referência nacional em cidade inteligente.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { label: "Câmeras Instaladas", value: "450+" },
                { label: "Níveis de Verificação", value: "8+" },
                { label: "Tecnologia", value: "IA" },
                { label: "Cobertura", value: "Urbana e rural" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
                >
                  <span className="block font-black text-2xl sm:text-3xl text-cyan-300">
                    {stat.value}
                  </span>
                  <span className="text-xs text-cello-100 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* O QUE É */}
      <Reveal>
        <section className="section-default flex flex-col gap-8 py-16">
          <HeadingText title="O que é o Pato 360°" super="Sobre o projeto" />
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50 relative overflow-hidden">
            <div className="flex flex-col gap-4 relative z-10 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                O <strong className="text-cello-700">Pato 360°</strong> é um
                projeto da Prefeitura de Pato Branco, desenvolvido pela
                Administração Municipal por meio da{" "}
                <strong>Secretaria Municipal de Ciência, Tecnologia e
                Inovação (SMCTI)</strong>, que busca utilizar a inteligência
                artificial para atender às demandas de todos os setores do
                município e fortalecer a segurança pública, por meio de um
                sistema interligado de monitoramento por câmeras.
              </p>
              <p>
                O objetivo do projeto é proteger a sociedade, colocando a
                tecnologia a favor da segurança, facilitando o trabalho das
                equipes de segurança, como a Polícia Militar, Polícia Civil, Polícia Rodoviária Federal e a Delegacia da Mulher, 
                trazendo mais tranquilidade para a população — tanto na área urbana quanto na zona rural do município.
              </p>
              <p>
                O ecossistema Pato 360° reúne diferentes camadas de
                tecnologia de apoio à segurança pública e à gestão urbana,
                integrando videomonitoramento, recursos de análise de dados e
                mecanismos de apoio à atuação das forças de segurança,
                fortalecendo o conceito de Cidade Inteligente.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ESPECIFICAÇÕES TÉCNICAS*/}
      <Reveal>
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="section-default flex flex-col gap-10">
            <HeadingText title="Capacidades técnicas das câmeras" super="Especificações do sistema" />
            <p className="text-gray-500 leading-relaxed text-justify max-w-3xl">
              O ecossistema Pato 360° combina diferentes tipos de câmeras, cada uma projetada para uma
              função específica de segurança pública.
            </p>
            <div className="w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-cello-900 to-cello-900 p-5 shadow-xl">
              <p className="text-center text-cyan-300 font-semibold uppercase tracking-[0.25em] text-sm">
                Câmeras instaladas
              </p>
              <div className="mt-4 grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-4xl font-black text-cyan-300">350+</p>
                  <p className="mt-2 text-cello-100">Fixas</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-cyan-300">50+</p>
                  <p className="mt-2 text-cello-100">Speed Dome</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-cyan-300">30+</p>
                  <p className="mt-2 text-cello-100">LPR</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {especificacoesCameras.map((cam, idx) => {
                const Icon = cam.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-cello-800 text-cyan-300 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={22} />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800">{cam.titulo}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed text-justify">
                      {cam.texto}
                    </p>
                  </div>
                );
              })}
            </div>
            </div>
            </section>
      </Reveal>

      {/* COMO FUNCIONA */}
      <Reveal>
        <section className="py-16 border-y border-gray-100">
          <div className="section-default flex flex-col gap-10">
            <HeadingText title="Níveis de verificação" super="Tecnologia aplicada" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pilares.map((pilar, idx) => {
                const Icon = pilar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white flex items-start gap-4 p-6 rounded-2xl bg-slate-50 shadow-sm hover:shadow-lg 
                hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="p-3 bg-cello-800 text-cyan-300 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-gray-800">
                        {pilar.titulo}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed text-justify">
                        {pilar.texto}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FASES */}
      <Reveal>
        <section className="bg-white py-16">
          <div className="section-default flex flex-col gap-10">
            <HeadingText title="Etapas do projeto" super="Linha do tempo" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fases.map((fase, idx) => {
                const Icon = fase.icon;
                return (
                  <div key={idx} className="flex flex-col gap-4 p-6 rounded-2xl bg-zircon-50 border border-gray-100 shadow-sm hover:bg-white hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-3xl text-gray-600">
                        {fase.numero}
                      </span>
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Icon size={20} />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800">{fase.titulo}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed text-justify flex-1">
                      {fase.texto}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      

      {/*CENTRAIS DE MONITORAMENTO*/}
      <Reveal>
        <section className=" py-16 border-y border-gray-100">
            <div className="section-default flex flex-col gap-10">
              <HeadingText title="Centrais de monitoramento" super="Estrutura de operação" />
              <p className="text-gray-500 leading-relaxed text-justify max-w-3xl">
                O sistema é operado a partir de uma central principal e três subcentrais. <br/>
                Cada uma com um papel específico na cadeia de resposta da segurança pública municipal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {centrais.map((central, idx) => {
                  const Icon = central.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="p-2 w-fit bg-cello-800 text-cyan-300 rounded-lg">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-bold text-gray-800">{central.titulo}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed text-justify flex-1">
                        {central.texto}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
        </section>
      </Reveal>

      {/* PARCERIA INSTITUCIONAL */}
      <Reveal>
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="section-default flex flex-col gap-10">
            <HeadingText title="Parceria institucional" super="Quem faz parte" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {parceiros.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-2 w-fit bg-white rounded-lg text-cello-700 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm">
                      {p.titulo}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed text-justify">
                      {p.texto}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-yellow-800 text-sm flex items-start gap-3">
              <Lock size={18} className="shrink-0 mt-0.5" />
              <p>
                O acesso às imagens e aos dados operacionais, assim como a
                atividade de monitoramento, é de responsabilidade exclusiva
                das forças de segurança pública devidamente habilitadas,
                conforme as permissões, protocolos e regulamentações
                aplicáveis — sempre em conformidade com a Lei Geral de
                Proteção de Dados Pessoais (LGPD).
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* VÍDEOS */}
      <Reveal>
        <section className="section-default flex flex-col gap-10 py-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cello-800 text-cyan-300 rounded-lg">
              <PlayCircle size={28} />
            </div>
            <HeadingText title="Veja o Pato 360° em ação" super="Vídeos" />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
              <iframe
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1012895351161828%2F&show_text=false&width=267&t=0"
                width="267"
                height="476"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
              <iframe
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1531676738576293%2F&show_text=false&width=267&t=0"
                width="267"
                height="476"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </div>
        </section>
      </Reveal>

  
    </div>
  );
};

export default Pato360Page;