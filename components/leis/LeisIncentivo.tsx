import timeline from '@public/data/leisIncentivo.json';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';

const LeisIncentivo = () => {
  return (
    <div>
        <div className='flex flex-col gap-8'>
            {Object.values(timeline).map((item, index) => {
                const itemDate: any = String(item.date);
                const date = new Date(Number((itemDate).slice(0, 4)), 
                    Number((itemDate).slice(5, 7) - 1), 
                    Number((itemDate).slice(8, 10))
                );

                const options: Intl.DateTimeFormatOptions = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  };
                  

                return (
                    <div key={index}>
                        <div className='flex flex-col gap-4 border p-4 rounded-lg bg-white'>
                            <span>{date.toLocaleDateString('pt-BR', options)}</span>
                            <h3 className='font-black text-lg'>{item.title}</h3>
                            <p className='text-justify hyphens-auto'>{item.body}</p>
                            <hr />
                            <a className='flex flex-row items-center gap-4 text-cyan-600' href={item.doc}
                                target={'_blank'}
                                download={item.doc ? true : false }>
                                {item.doc ? <AiOutlineFilePdf /> : <BiLinkExternal /> }
                                {item.doc ? 'Baixe o doc' : 'Acesse a página' }</a>
                                {
                                    item.atualizada && (
                                        <div className='text-red-500'>Alterações em vigor: {item.atualizada}</div>
                                    )
                                }
                                {
                                    item.regulamentada && (
                                        <div className='text-blue-500'>Regulamentação: {item.regulamentada}</div>
                                    )
                                }
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default LeisIncentivo