import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import { getGamePrice } from "../utils/pricing";
import { CiStar } from "react-icons/ci";

export default function GameDetails() {
    const [game, setGame] = useState([]);
    const [price, setPrice] = useState();
    const { gameId } = useParams();

    console.log(gameId);

    useEffect(() => {

        async function getGameDetails() {
            try {
                const req = await fetch(`${RAWG_BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`);
                const res = await req.json();
                setGame(res);
                console.log(res);

            } catch (err) {
                console.error(err);
            }
        }
        getGameDetails();
        const calculatedPrice = getGamePrice(game.rating);
        setPrice(calculatedPrice);
    }, [])

    return (
        <>
            <h1 className="font-bold text-4xl text-center dark:text-white p-4">{game.name}</h1>
            <div className="flex justify-start ">
                <div className="h-full w-full">
                    <img className="mb-auto p-2 mt-4 rounded-3xl object-contain w-full" src={game.background_image} />
                    <ul>
                        <li>Website {game.website}</li>
                        <li><CiStar size={32} />{game.rating}</li>
                        <li>
                            Developers:
                            <ul>
                                {game.developers.map((developer) => (
                                    <li>{developer.name}</li>
                                ))}
                            </ul>
                        </li>
                            <li>
                            Platforms:
                            <ul>
                                {game.platforms.map((platform) => (
                                    <li>{platform.platform.name}</li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            Publishers:
                            <ul>
                                {game.publishers.map((publisher) => (
                                    <li>{publisher.name}</li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            Genres:
                            <ul>
                                {game.genres.map((genre) => (
                                    <li>{genre.name}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="p-4 flex flex-col gap-2 h-full w-[30%]">
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white">Description</h2>
                        <p className="dark:text-white overflow-scroll h-[50%] hide-scrollbar">{game.description_raw}</p>
                    </div>

                    <div className="mt-2 flex text-2xl text-black justify-between p-2 font-bold bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white">
                        <div>{price} &euro;</div>
                        <button className="cursor-pointer">Add to cart +</button>
                    </div>
                </div>
            </div>
        </>
    )
}