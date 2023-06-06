import appointments from '@public/data/appointments.json'
import { log } from 'console'

const page = ({ params, searchParams }) => {
    return (
      <div>{
        Object.values(appointments).map((item, index) => {
          if ((item.title.toLowerCase().replace(/ /g,'-') == params.agendaId) && params.agendaId != 'visitas') {
            return (
              <section className='bg-white pt-32 pb-8'>
                <div className='section-default max-[678px]:px-0'>
                  <div className='h-[122vh] min-[420px]:h-[130vh] min-[615px]:h-[90vh]' key={index} dangerouslySetInnerHTML={{__html: item.iframe}}></div>
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