import appointments from '@public/data/appointments.json'
import { log } from 'console'

const page = ({ params, searchParams }: { params: any, searchParams: any }) => {
    return (
      <div>{
        Object.values(appointments).map((item, index) => {
          if ((item.title.toLowerCase().replace(/ /g,'-') == params.agendaId) && params.agendaId != 'visitas') {
            return (
              <section className='bg-white pt-32 pb-8'>
                <div className='section-default max-[678px]:px-0'>
                  <div className='h-[215svh] min-[420px]:h-[170svh] min-[615px]:h-[100svh]' key={index} dangerouslySetInnerHTML={{__html: item.iframe || ''}}></div>
                </div>
              </section>
            )
          } else if (item.title.toLowerCase().replace(/ /g,'-') == params.agendaId) {
            return (
              <>{params.agendaId}</>
            )
          }
        })
      }</div>
    )
  }
  
  export default page