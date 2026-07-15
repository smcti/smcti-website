"use client";

import { useRouter } from "next/navigation";

interface newCardProps {
    id: string;
    partner: string;
    title: string;
    description: string;
    datePosted: string;
    image: string;
    isNotOpen: boolean;
}

const NewsCard = (props: newCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (!props.isNotOpen) {
            router.push(`/noticias/${props.id}`);
        }
    };

    return (
        <div className="m-2 flex h-full flex-col rounded-xl bg-white p-4 shadow-lg shadow-gray-500/50">
            <div className="aspect-video w-full overflow-hidden rounded-xl">
                <img
                    src={props.image}
                    alt={props.title}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="mt-4 flex flex-1 flex-col">
                <h3 className="text-center text-lg font-bold text-gray-900">
                    {props.title}
                </h3>

                <p className="mt-3 flex-1 text-center text-sm text-gray-600">
                    {props.description}
                </p>

                <div className="mt-6">
                    {props.partner && (
                        <p className="text-center font-bold text-gray-800">
                            {props.partner}
                        </p>
                    )}

                    <p className="mt-2 text-center font-bold text-gray-800">
                        Publicado em: {props.datePosted}
                    </p>

                    <button
                        disabled={props.isNotOpen}
                        onClick={handleClick}
                        className={`mt-4 w-full rounded-lg shadow-lg shadow-cello/50 border-2 p-2 transition duration-200 ${props.isNotOpen
                            ? "cursor-not-allowed border-cello bg-cello text-white"
                            : "border-cello bg-cello text-white hover:-translate-y-0.5 hover:bg-white hover:text-cello"
                            }`}
                    >
                        {props.isNotOpen ? "Indisponível" : "Saiba mais"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;