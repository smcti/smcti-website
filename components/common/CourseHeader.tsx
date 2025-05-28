import Link from "@node_modules/next/link";

interface CourseHeaderProps{
    id: string,
    image: string,
    title: string,
    description: string,
    partners: string,
    link: string
}

const CourseHeader = (props: CourseHeaderProps) => {

  return(
    <div className="section-default shadow rounded-lg flex lg:flex-row flex-col gap-8">
          <img
            src={props.image}
            alt="imagemCurso"
            className="w-full sm:h-[500px] h-96  rounded-xl overflow-hidden object-cover"
          />
          <div className="grid grid-cols-1 text-black gap-4 lg:w-1/2 text-center">
            <p className="sm:text-3xl text-xl">
              {props.title}
            </p>
            <p className="text-justify">
              {props.description} <br />
            </p>
            {Number(props.id) > 7 ? (
              <>
                <strong>Vagas Limitadas</strong>
              </>
              ) : (
              <>
              </>
              )}
            
            <Link href={`/patotech/${props.id}`} className="justify-self-end underline">
              Saiba mais
            </Link>
            <p className="text-start">
              <strong>Parceiros: {props.partners}</strong>
            </p>
            <button
              onClick={() => {
                window.open(props.link, "_blank");
              }}
              className="mt-auto flex bg-cello rounded-lg text-white justify-center w-full hover:border-black border-2 hover:bg-zircon-50 hover:text-black hover:shadow-sm hover:shadow-white p-2 h-fit"
            >
              Inscrever-se
            </button>
          </div>
        </div>
  )
}

export default CourseHeader;