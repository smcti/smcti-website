
interface EventCardProps {
  id: string;
  partner: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  isNotOpen: boolean;
  redirectUrl: string;
}

const EventCard = (props: EventCardProps) => {
  const handleClick = () => {
    window.open(props.redirectUrl, "_blank");
  };

  return (
    <div className="m-2 h-full flex flex-col justify-between p-2 rounded-xl shadow-md">
      <div>
        <img
          src={props.image}
          alt="imagemEvento"
          className="w-full sm:h-72 h-72  rounded-xl overflow-hidden object-cover"
        />
        <p className="h-12 my-4 font-bold text-center">
          {props.title}
        </p>
        <p className="h-20 my-2 text-center">
         {props.description}
        </p>
      </div>
      <div className="mt-auto">
        <p className="mt-2 font-bold"> {props.partner} </p>
        <p className="mt-2 font-bold text-center"><br></br><br></br>Duração: {props.duration}</p>
        <div className="flex w-full">
          <button
            disabled={props.isNotOpen}
            className={`flex mt-4 rounded-lg ${
              props.isNotOpen
                ? "bg-cello text-white"
                : "border-white text-white hover:bg-zircon-50 hover:text-black hover:translate-y-[-1px]"
            } bg-cello text-white hover:border-black border-2 justify-center w-full p-2`}
            onClick={handleClick}
          >
            {props.isNotOpen ? "Indisponível" : "Saiba mais"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
