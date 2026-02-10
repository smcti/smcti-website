import usefulLinks from "@public/data/usefulLinks.json";
import contacts from "@public/data/contact.json";
import navItems from "@public/data/navItems.json";

const Footer = () => {
  const footerData = {
    Sobre: usefulLinks,
    "Links úteis": navItems,
    "Parque Tecnológico": contacts,
  };

  return (
    <footer className="mt-auto bg-cello-800 text-zircon">
      <div
        className="mt-8 section-default flex flex-col gap-16
        md:flex-row"
      >
        <div
          className="order-2
            md:order-1"
        >
          <img
            className="h-12"
            src="/assets/icons/logo-secretaria-white.svg"
            alt="Logo secretaria de CTI"
          />
        </div>
        <div
          className="order-1 flex flex-col gap-8
            md:order-2 md:flex-row w-full justify-between"
        >
          {Object.values(footerData).map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-2xl font-black">
                  {Object.keys(footerData)[index]}
                </h3>
                {Object.values(item).map((subItem, subIndex) => {
                  return (
                    <a href={subItem.path} key={subIndex}>
                      {subItem.name}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col text-center section-default mb-8 gap-16 mt-8">
        <hr />
        <p>
          Todos os direitos reservados, &copy; 2026 Secretaria de Ciência,
          Tecnologia e Inovação de Pato Branco - PR
        </p>
      </div>
    </footer>
  );
};

export default Footer;
