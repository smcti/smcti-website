const partners = [
  {
    src: "/assets/images/logos/smcti.png",
    alt: "Secretaria Municipal de Ciência, Tecnologia e Inovação",
    className: "h-12",
  },
  {
    src: "/assets/images/logos/parque.png",
    alt: "Parque Tecnológico de Pato Branco",
    className: "h-20",
  },
  {
    src: "/assets/images/logos/brasil digital.png",
    alt: "Brasil Digital e Inclusivo",
    className: "h-20",
  },
  {
    src: "/assets/images/logos/cisco.png",
    alt: "Cisco Networking Academy",
    className: "h-20",
  },
  {
    src: "/assets/images/logos/cyberseguranca.png",
    alt: "Programa CiberEducação Cisco Brasil",
    className: "h-20",
  },
  {
    src: "/assets/images/logos/dainf.png",
    alt: "Departamento Acadêmico de Informática da UTFPR",
    className: "h-12",
  },
  {
    src: "/assets/images/logos/utfpr.png",
    alt: "Universidade Tecnológica Federal do Paraná",
    className: "h-16",
  },
  {
    src: "/assets/images/logos/senac.png",
    alt: "Senac",
    className: "h-16",
  },
  {
    src: "/assets/images/logos/senai.png",
    alt: "Sistema Fiep SENAI",
    className: "h-20",
  },
];

const PartnerFooter = () => {
  return (
    <div className="w-full">
      <div className="mb-8 h-px w-full bg-slate-200" />
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-sm font-bold uppercase tracking-wider text-cello-700">Instituições e parceiros</p>
        <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
          Uma rede de apoio para ampliar a formação tecnológica
        </h2>
        <p className="leading-7 text-slate-600">
          A PatoTech reúne parceiros públicos, educacionais e institucionais para oferecer oportunidades de capacitação à população.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
        {partners.map((partner) => (
          <div
            key={partner.src}
            className="flex h-28 items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
          >
            <img
              src={partner.src}
              className={`${partner.className} max-w-full object-contain transition-all duration-300 hover:scale-105 hover:brightness-105`}
              alt={partner.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerFooter;
