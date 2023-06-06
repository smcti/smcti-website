import ParqTec from '@components/home/ParqTec';
import Results from '@components/home/Results';
import Labs from '@components/home/Labs';
import Itecpb from '@components/home/Itecpb';
import Booking from '@components/home/Booking';
import Hero from '@components/home/Hero';

export const metadata = {
    title: 'Home',
    description: 'Página inicial do website da Secretaria Municipal de Ciência, Tecnologia e Inovação',
}

const Home = () => {
  return (
    <>
      <Hero />
      <ParqTec />
      <Results />
      <Labs />
      <Itecpb />
      <Booking />
    </>
  )
}

export default Home