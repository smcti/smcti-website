import ParqTec from "@components/home/ParqTec";
import Results from "@components/home/Results";
import Labs from "@components/home/Labs";
import Itecpb from "@components/home/Itecpb";
import Booking from "@components/home/Booking";
import Hero from "@components/home/Hero";
import Reveal from "@components/common/reveal"; 

export const metadata = {
  title: "Home",
  description:
    "Página inicial do website da Secretaria Municipal de Ciência, Tecnologia e Inovação",
};

const Home = () => {
  return (
    <>
      <Hero />
      <Reveal>
        <ParqTec />
      </Reveal>
      <Reveal>
        <Results />
      </Reveal>
      <Reveal>
        <Labs />
      </Reveal>
      <Reveal>
        <Itecpb />
      </Reveal>
      <Reveal>
        <Booking />
      </Reveal>
    </>
  );
};

export default Home;