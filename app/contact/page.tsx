'use client'

import HeadingText from "@components/common/HeadingText"
import help from "@public/data/help.json"
import appointments from "@public/data/appointments.json"
import ContactForm from "@components/common/ContactForm"

const page = () => {
  const dropdowns: any = {
    "appointments": appointments
  }
  const handleCLick = (link: any, collapsable: any) => {
    if (link) {
      window.location.assign(link);
    }

    if (collapsable) {
      document.getElementById('collapse')?.classList.toggle('hidden')
    }
  }

  return (
    <section>
      <div className='section-default py-32 flex flex-col gap-8 text-gray-700 text-justify'>
        <HeadingText title="Precisa de ajuda?" super="Entre em contato"/>
        <p>Bem-vindo à nossa seção de ajuda!</p>
        <p>Estamos aqui para fornecer toda a assistência e suporte necessários para garantir que você aproveite ao máximo a sua experiência em nosso site. Nesta seção, você encontrará uma variedade de tópicos de ajuda abrangentes para responder às suas dúvidas e solucionar quaisquer problemas que possam surgir.</p>
        <p>Caso não encontre a resposta que procurava, entre em contato conosco por e-mail.</p>
        <div className="flex flex-col gap-4">
          {
            Object.values(help).map((item: any, index: Number) => {
              return (
                <div className={`border rounded-lg bg-white p-4 flex flex-col gap-4 ${item.link ? 'hover:cursor-pointer' : 'hover:cursor-pointer'}`} onClick={() => handleCLick(item.link, item.collapsable)}>
                  <h3 className="font-black text-lg">{item.title}</h3>
                  <p>{item.body}</p>
                  {item.collapsable ? (
                    <>
                    <div id="collapse" className="hidden flex-col gap-4">
                      <hr />
                      <p>Selecione a opção desejada:</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                      {Object.values(dropdowns[item.collapsable]).map((subItem: any, subIndex: Number) => {
                        return (
                          <div className="border rounded-lg px-4 py-2 w-full flex items-center text-center bg-gray-50 
                            hover:cursor-pointer hover:bg-gray-100" 
                            onClick={() => {window.location.assign(subItem.href)}}>
                            <h4 className="w-full">{subItem.title}</h4>
                          </div>
                        )
                      })}
                      </div>
                    </div>
                    </>
                  ) : ''}
                </div>
              )
            })
          }
        </div>
        {/* <ContactForm /> */}
      </div>
      <div className='w-full'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.951339354508!2d-52.69549038803221!3d-26.19826116363827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e553485ca31325%3A0x940f8c7a6ee7a30!2sR.%20L%C3%ADdio%20Oltramari%2C%201628%20-%20Fraron%2C%20Pato%20Branco%20-%20PR%2C%2085503-381!5e0!3m2!1spt-BR!2sbr!4v1686148032124!5m2!1spt-BR!2sbr" width="600" height="450" className='border-none w-full' loading="lazy"></iframe>
      </div>
    </section>
  )
}

export default page