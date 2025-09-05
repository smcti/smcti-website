import projects from '@public/data/projects.json'
import HeadingText from "@components/common/HeadingText"
import { BsCloudDownload } from "react-icons/bs";

export const metadata = {
    title: 'Home',
    description: 'Página inicial do website da Secretaria Municipal de Ciência, Tecnologia e Inovação'
}

const Projetos = () => {
    return (
        <div className="section-default">
            {Object.values(projects).map((item, index) => (
                <div key={index} className='text-justify flex text-gray-700 flex-col my-32 gap-8'>
                    <HeadingText title={item.title} />
                    <div className='flex flex-col gap-4 mb-8'>
                        <div>
                            <h2 className='text-xl text-gray-800'>Objetivos</h2>
                            <p>{item.objetivos}</p>
                        </div>
                        <div>
                            <h2 className='text-xl text-gray-800'>Benefícios</h2>
                            <p>{item.beneficios}</p>
                        </div>
                        <div>
                            <h2 className='text-xl text-gray-800'>Público alvo</h2>
                            <p>{item.publico}</p>
                        </div>

                        {item.file ?  
                            <p className='flex flex-row gap-2 items-center' >
                                O Projeto: <BsCloudDownload className='text-cyan-700'/>  <a target='_blank' href={item.file} className='text-cyan-700 underline'> {item.title}</a> 
                            </p>
                        :""}

                        {item.file2 ?  
                            <p className='flex flex-row gap-2 items-center' >
                                O Projeto: <BsCloudDownload className='text-cyan-700'/>  <a target='_blank' href={item.file2} className='text-cyan-700 underline'>Anprotec</a>
                            </p>
                        :""}

                        {item.link ?  
                        <p>
                           Acesso em: <a href={item.link} target='_blank' className='text-cyan-700 underline'>{item.link}</a>
                        </p>
                        :""} 
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Projetos;