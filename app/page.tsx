import ParqTec from '@components/home/ParqTec';
import Results from '@components/home/Results';
import Labs from '@components/home/Labs';
import Itecpb from '@components/home/Itecpb';

export const metadata = {
    title: 'Home',
    description: 'Página inicial do website da Secretaria Municipal de Ciência, Tecnologia e Inovação',
}

const Home = () => {
  return (
    <>
        <ParqTec />
        <Results />
        <Labs />
        <Itecpb />
    </>
  )
}

export default Home