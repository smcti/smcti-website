'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  TrendingUp, 
  Handshake,  
  Settings,   
  X,
  UserCircle2,
  ChevronRight,
  CalendarCheck,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Mentor {
  _id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  category: string;
  email: string;
  totalSlots: number;
  availableSlots: number;
}

// Mapeamento de ícones e cores por categoria
const categoryConfig: Record<string, { icon: any; colorTheme: string; gradient: string; iconColor: string }> = {
  mercado: {
    icon: TrendingUp,
    colorTheme: "purple",
    gradient: "from-purple-600 to-fuchsia-500",
    iconColor: "text-purple-600 bg-purple-100",
  },
  comercial: {
    icon: Handshake,
    colorTheme: "blue",
    gradient: "from-blue-600 to-cyan-500",
    iconColor: "text-blue-600 bg-blue-100",
  },
  gestao: {
    icon: Settings,
    colorTheme: "emerald",
    gradient: "from-emerald-600 to-teal-500",
    iconColor: "text-emerald-600 bg-emerald-100",
  },
};

const categoryLabels: Record<string, { title: string; description: string }> = {
  mercado: {
    title: "Mercado",
    description: "Especialistas em branding, growth hacking e validação de mercado.",
  },
  comercial: {
    title: "Comercial",
    description: "Mentores focados em vendas B2B, negociação e Customer Success.",
  },
  gestao: {
    title: "Gestão",
    description: "Liderança, financeiro e processos ágeis para escalar com segurança.",
  },
};

// Componente do indicador de vagas
function SlotBadge({ available, total }: { available: number; total: number }) {
  let color = "bg-green-500";
  let textColor = "text-green-700";
  let bgColor = "bg-green-50 border-green-200";
  let label = `${available} vaga${available !== 1 ? "s" : ""}`;

  if (available === 0) {
    color = "bg-red-500";
    textColor = "text-red-700";
    bgColor = "bg-red-50 border-red-200";
    label = "Sem vagas";
  } else if (available === 1) {
    color = "bg-yellow-500";
    textColor = "text-yellow-700";
    bgColor = "bg-yellow-50 border-yellow-200";
  }

  return (
    <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${bgColor} ${textColor}`}>
      <span className={`w-2 h-2 rounded-full ${color} animate-pulse`}></span>
      {label}
    </div>
  );
}

export default function MentoresPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [requestResult, setRequestResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Busca mentores do banco via API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("/api/mentores");
        if (res.ok) {
          const data = await res.json();
          setMentors(data.mentors || []);
        }
      } catch (error) {
        console.error("Erro ao buscar mentores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Agrupa mentores por categoria
  const mentorsByCategory = mentors.reduce<Record<string, Mentor[]>>((acc, mentor) => {
    const cat = mentor.category || "gestao";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(mentor);
    return acc;
  }, {});

  // Solicitar mentoria
  const handleSolicitar = async (mentor: Mentor) => {
    setRequesting(true);
    setRequestResult(null);

    // Usa um prompt simples para os dados do incubado
    const incubadoName = window.prompt("Qual o nome da sua empresa incubada?");
    if (!incubadoName) {
      setRequesting(false);
      return;
    }
    const incubadoEmail = window.prompt("Qual o e-mail de contato?");
    if (!incubadoEmail) {
      setRequesting(false);
      return;
    }

    try {
      const res = await fetch("/api/mentores/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentorId: mentor._id,
          incubadoName,
          incubadoEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setRequestResult({ type: "success", message: data.message });
        // Atualiza as vagas localmente
        setMentors((prev) =>
          prev.map((m) =>
            m._id === mentor._id
              ? { ...m, availableSlots: Math.max(0, m.availableSlots) }
              : m
          )
        );
      } else {
        setRequestResult({ type: "error", message: data.error });
      }
    } catch (error) {
      setRequestResult({ type: "error", message: "Erro de conexão. Tente novamente." });
    } finally {
      setRequesting(false);
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "purple": return "text-purple-600 bg-purple-50 border-purple-100";
      case "emerald": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      default: return "text-blue-600 bg-blue-50 border-blue-100";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 size={40} className="animate-spin text-blue-500" />
        <p className="text-gray-400 font-medium">Carregando mentores...</p>
      </div>
    );
  }

  // Se não há mentores no banco, mostra os dados estáticos
  if (mentors.length === 0) {
    return (
      <div className="flex flex-col gap-10 pb-20">
        <section className="animate-fade-up pt-10">
          <div className="section-default text-center flex flex-col items-center gap-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-200">Nosso Time</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800">
              Rede de Mentores
            </h1>
            <p className="text-gray-500 max-w-2xl text-lg">
              Conecte-se com profissionais experientes prontos para acelerar o seu negócio.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-md mt-6">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ Nenhum mentor cadastrado no sistema ainda. Os dados serão exibidos assim que a administração cadastrar os mentores no banco de dados.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Header */}
      <section className="animate-fade-up pt-10">
        <div className="section-default text-center flex flex-col items-center gap-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-200">Nosso Time</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800">
            Rede de Mentores
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg">
            Conecte-se com profissionais experientes prontos para acelerar o seu negócio.
          </p>
        </div>
      </section>

      {/* Categorias de mentores */}
      {Object.entries(mentorsByCategory).map(([cat, catMentors]) => {
        const config = categoryConfig[cat] || categoryConfig.gestao;
        const labels = categoryLabels[cat] || { title: cat, description: "" };
        const Icon = config.icon;

        return (
          <section key={cat} className="animate-fade-up">
            <div className="section-default flex flex-col gap-10">
              {/* Category Header */}
              <div className="flex flex-col items-center text-center gap-3 border-b border-gray-100 pb-8">
                <div className={`p-3 rounded-2xl ${config.iconColor} mb-2`}>
                  <Icon size={32} />
                </div>
                <h2 className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                  {labels.title}
                </h2>
                <p className="text-gray-500 max-w-2xl">{labels.description}</p>
              </div>

              {/* Mentor Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 justify-items-center">
                {catMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="flex flex-col items-center gap-3 group w-full max-w-[180px]"
                  >
                    <div
                      className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 border-2 border-dashed border-gray-200 group-hover:border-blue-400 cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedMentor(mentor)}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-sm group-hover:shadow-md">
                        <Image
                          src={mentor.photo}
                          alt={mentor.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Indicador de Vagas */}
                    <SlotBadge available={mentor.availableSlots} total={mentor.totalSlots} />

                    <div className="text-center flex flex-col items-center gap-1 w-full">
                      <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {mentor.name}
                      </h4>
                      <button
                        onClick={() => setSelectedMentor(mentor)}
                        className="text-xs font-semibold text-gray-400 hover:text-blue-600 flex items-center gap-1 mt-1 transition-colors uppercase tracking-wide"
                      >
                        Ver Perfil <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Modal de Mentor */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setSelectedMentor(null);
              setRequestResult(null);
            }}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up animate-duration-300 flex flex-col">
            <div className="relative h-32 bg-gray-100">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Image
                  src={selectedMentor.photo}
                  alt={selectedMentor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => {
                  setSelectedMentor(null);
                  setRequestResult(null);
                }}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="pt-16 pb-8 px-8 text-center flex flex-col gap-4">
              <div>
                <h3 className="text-2xl font-black text-gray-800">{selectedMentor.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 border ${getThemeColor(categoryConfig[selectedMentor.category]?.colorTheme || "blue")}`}>
                  {selectedMentor.role}
                </span>
              </div>

              {/* Indicador de Vagas no Modal */}
              <div className="flex justify-center">
                <SlotBadge available={selectedMentor.availableSlots} total={selectedMentor.totalSlots} />
              </div>

              <hr className="border-gray-100" />

              <div className="text-left">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Sobre</h4>
                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                  {selectedMentor.description}
                </p>
              </div>

              {/* Resultado da solicitação */}
              {requestResult && (
                <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
                  requestResult.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {requestResult.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {requestResult.message}
                </div>
              )}

              {/* Botão Solicitar Mentoria */}
              <button
                onClick={() => handleSolicitar(selectedMentor)}
                disabled={selectedMentor.availableSlots === 0 || requesting}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedMentor.availableSlots === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : requesting
                    ? "bg-blue-400 text-white cursor-wait"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-xl"
                }`}
                title={selectedMentor.availableSlots === 0 ? "Este mentor não possui vagas disponíveis este mês" : ""}
              >
                {requesting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Enviando...
                  </>
                ) : selectedMentor.availableSlots === 0 ? (
                  "Sem vagas disponíveis"
                ) : (
                  <>
                    <CalendarCheck size={16} /> Solicitar Mentoria
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-1 bg-gray-50 py-2 rounded-lg">
                <UserCircle2 size={14} /> Mentor verificado ITECPB
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}