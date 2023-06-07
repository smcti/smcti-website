'use client'

const formSubmit = () => {
    'use server'

    event?.preventDefault()
    const form: HTMLFormElement | any = document.getElementById('contact');
    
    const formData = new FormData(form);

    for (const pair of formData.entries()) {
        if (!pair[1]) {
            toggleError(pair[0]);
        } else {
            toggleNotError(pair[0]);
        }
    }

}

const toggleError = (id: string) => {
    document.getElementById(id)?.classList.add('border-red-400', 'bg-red-50', 'placeholder-red-400');
}

const toggleNotError = (id: string) => {
    document.getElementById(id)?.classList.remove('border-red-400', 'bg-red-50', 'placeholder-red-400');
}

const ContactForm = () => {
  return (
    <div>
        <form id="contact">
            <fieldset className="flex flex-col fieldset gap-4">
                <legend>Contato</legend>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="name">Nome: </label>
                        <input className="bg-gray-50" id="name" name="name" type="text" placeholder="Fulano(a) de tal"/>
                        <label htmlFor="mail">E-mail: </label>
                        <input className="bg-gray-50" type="email" name="mail" id="mail" placeholder="exemplo@email.com" />
                        <label htmlFor="subject">Assunto: </label>
                        <input className="bg-gray-50" type="text" name="subject" id="subject" placeholder="Agendamento coworking" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="message">Mensagem: </label>
                        <textarea className="bg-gray-50" name="message" id="message" rows={4} placeholder="Não há horários disponíveis no coworking, o que eu faço agora?" />
                        <button className="w-full border rounded-sm" onClick={formSubmit}>Enviar</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
  )
}

export default ContactForm