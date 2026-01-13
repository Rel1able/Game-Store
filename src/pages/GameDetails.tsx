import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import { getGamePrice } from "../utils/pricing";
import { formatDate } from "../utils/dateFormatting";


type Genre = {
    name: string;
}

type Publisher = {
    name: string;
}

type Developer = {
    name: string;
}
type Game = {
    rating: number;
    name: string;
    background_image: string;
    description_raw: string;
    website: string;
    genres: Genre[];
    publishers: Publisher[];
    developers: Developer[];
    released: string;
}

export default function GameDetails() {
    const [game, setGame] = useState<Game | null>();
    const [price, setPrice] = useState(0);
    const { gameId } = useParams();

    console.log(gameId);

    useEffect(() => {

        async function getGameDetails() {
            try {
                const req = await fetch(`${RAWG_BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`);
                const res = await req.json();
                setGame(res);
                console.log(res);

                const calculatedPrice = getGamePrice(res.rating);
                setPrice(calculatedPrice);

            } catch (err) {
                console.error(err);
            }
        }
        getGameDetails();

    }, [gameId])

    return (
        <>
            <h1 className="font-bold text-4xl text-center dark:text-white p-2">{game?.name}</h1>
            <div className="flex justify-center items-center">
                <div className="h-full w-full">
                    <img className="mb-auto p-4 rounded-3xl object-contain w-full" src={game?.background_image} />
                </div>

                <div className="p-4 flex flex-col gap-2  w-[40%]">
                    <div className=" p-2  rounded-2xl">
                        <h2 className="text-2xl font-bold dark:text-white">Description</h2>
                        <p className="dark:text-white overflow-scroll h-96 hide-scrollbar">{game?.description_raw}</p>
                    </div>
                    <div>
                        <ul className="bg-gray-100 rounded-xl  flex-col flex gap-4 p-2 dark:bg-gray-600 dark:text-white">
                            <li>Website <a href={game?.website}>{game?.website}</a></li>
                            <li className="flex gap-2">
                                Genres:
                                <ul className="flex gap-2">
                                    {game?.genres?.map((genre) => (
                                        <li>{genre.name}</li>
                                    ))}
                                </ul>
                            </li>
                            <li className="flex gap-2 text-">
                                Developers:
                                <ul className="flex gap-2">
                                    {game?.developers?.map((developer) => (
                                        <li>{developer.name}</li>
                                    ))}
                                </ul>
                            </li>
                            <li className="flex gap-2">
                                Publishers:
                                <ul className="flex gap-2">
                                    {game?.publishers?.map((publisher) => (
                                        <li className="block whitespace-nowrap">{publisher.name}</li>
                                    ))}
                                </ul>
                            </li>

                            <li>Release: {game?.released ? formatDate(game.released) : "N/A"}</li>
                            <li>Rating: {game?.rating}</li>
                        </ul>
                    </div>
                    <div className="mt-2 flex text-2xl justify-between p-2 font-bold bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white">
                        <div>{price} &euro;</div>
                        <button className="cursor-pointer">Add to cart +</button>
                    </div>
                </div>
            </div>
        </>
    )
}