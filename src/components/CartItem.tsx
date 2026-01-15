import type { Game } from "../types/game"

type CartItemProps = {
    name: string;
    background_image: string;
    price: number;
    onClick: () => void;
};

export default function CartItem({ background_image, name, price, onClick}: CartItemProps) {
    return (
        <li className="flex justify-center items-center gap-4 bg-gray-900 p-4 rounded-xl relative">
            <img className="w-[50%]" src={background_image} alt="Game image" />
            <div className="flex flex-col">
                <h1>{name}</h1>
                <h4>{price}</h4>
            </div>
            <button className="absolute top-2 right-2 px-2 py-1 rounded-full cursor-pointer bg-gray-700" onClick={onClick}>x</button>
        </li>
    )
}