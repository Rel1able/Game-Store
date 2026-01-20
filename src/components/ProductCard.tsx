import { useState, useEffect } from "react";
import { getGamePrice } from "../utils/pricing";
import { Link, useLocation } from "react-router"
import { useCart } from "../contexts/CartContext";
import { MdDone } from "react-icons/md";
type Game = {
    name: string
    bgImage: string
    rating: number
    id: number
}

export default function ProductCard({ id, name, bgImage, rating }: Game) {

    const location = useLocation();
    const { addToCart, cart } = useCart();
    const [price, setPrice] = useState<number>();

    useEffect(() => {
        const price = getGamePrice(rating);
        setPrice(price);
    }, [rating])

    const isInCart = cart.some((item) => item.id === id);

    return (
        <li key={id} className="flex flex-col bg-gray-100 rounded-xl pb-2 hover:scale-105 transition-transform dark:bg-gray-800 dark:text-white">
            <Link to={`/games/${id}`} state={{ from: location.pathname + location.search }}><img className="rounded-xl w-full h-48 md:h-56 object-cover text-center" src={bgImage} alt="Game image" /></Link>

            <div className="p-2">
                <div className="flex justify-between text-gray-800 px-3 dark:text-gray-300">
                    <button className={`cursor-pointer ${isInCart ? "text-green-600 font-medium" : ""}`} onClick={() => addToCart({ id, name, background_image: bgImage, rating, price: getGamePrice(rating) })}> {isInCart ? (
                        <div className="flex items-center gap-1">
                            Added to cart <MdDone size={16} />
                        </div>
                    ) : (
                        "Add to cart +"
                    )}</button>
                    <div>{price} &euro;</div>
                </div>
                <Link to={`/games/${id}`}><div className="text-xl font-bold pl-3">{name}</div></Link>

            </div>

        </li>
    )
}