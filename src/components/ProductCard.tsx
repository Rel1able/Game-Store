import {useState, useEffect} from "react";
import { getGamePrice } from "../utils/pricing";
export default function ProductCard({ name, bgImage, rating}) {

    const [price, setPrice] = useState<number>();

    useEffect(() => {
        const price = getGamePrice(rating);
        setPrice(price);
    }, [])
    return (
        <li className="relative h-64 w-full bg-cover bg-center rounded-lg flex flex-col justify-end items-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute bottom-0 w-full h-15 backdrop-blur-md bg-black/40" />
            <div className="text-white p-2 w-full text-center absolute  z-10">
                <p className="">{name}</p>
                <p className="text-sm dark:text-white">{price} &euro;</p>

            </div>
        </li>
    )
}