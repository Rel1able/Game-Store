import { useState, useEffect } from "react";
import { getGamePrice } from "../utils/pricing";
import { Link, useLocation } from "react-router"
import { CiStar } from "react-icons/ci";
import type { LibraryGame } from "../types/library";


export default function AddedGameCard({ id, name, background_image, rating,favorite, toggleFavorite}: LibraryGame) {

    const location = useLocation();
    const [price, setPrice] = useState<number>();


    useEffect(() => {
        const price = getGamePrice(rating);
        setPrice(price);
    }, [])

    return (
        <li key={id} className="flex flex-col bg-gray-100 rounded-xl pb-2 hover:scale-105 transition-transform dark:bg-gray-800 dark:text-white">
            <Link to={`/games/${id}`} state={{ from: location.pathname + location.search }}><img className="rounded-xl w-full h-64 object-cover text-center" src={background_image} alt="Game image" /></Link>

            <div className="p-2">
                <div className="flex justify-between text-gray-800 px-3 dark:text-gray-300">
                    <button className={`cursor-pointer ${favorite ? "text-blue-500 font-medium" : ""}`} onClick={() => toggleFavorite(id)}> {favorite ? (
                        <div className="flex items-center gap-1">
                            Favorite <CiStar size={16} />
                        </div>
                    ) : (
                        "Add to Favorite +"
                    )}</button>
                    <div>{price} &euro;</div>
                </div>
                <Link to={`/games/${id}`}><div className="text-xl font-bold pl-3">{name}</div></Link>

            </div>

        </li>
    )
}