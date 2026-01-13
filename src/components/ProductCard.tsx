import { useState, useEffect } from "react";
import { getGamePrice } from "../utils/pricing";
import { Link } from "react-router"

type Game = {
    name: string
    bgImage: string 
    rating: number 
    id:  number
}

export default function ProductCard({ id, name, bgImage, rating }: Game) {

    const [price, setPrice] = useState<number>();

    useEffect(() => {
        const price = getGamePrice(rating);
        setPrice(price);
    }, [])
    return (
        <li className="flex flex-col bg-gray-100 rounded-xl pb-2 hover:scale-105 transition-transform dark:bg-gray-800 dark:text-white">
            <Link to={`/games/${id}`}><img className="rounded-xl w-full h-64 object-cover" src={bgImage} /></Link>

            <div className="p-2">
                <div className="flex justify-between text-gray-800 px-3 dark:text-gray-300">
                    <button className="cursor-pointer">Add to cart +</button>
                    <div>{price} &euro;</div>
                </div>
                <Link to={`/games/${id}`}><div className="text-xl font-bold pl-3">{name}</div></Link>

            </div>

        </li>
    )
}