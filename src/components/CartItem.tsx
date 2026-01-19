import { IoIosCloseCircle } from "react-icons/io";

type CartItemProps = {
    name: string;
    background_image: string;
    price: number;
    onClick: () => void;
};

export default function CartItem({ background_image, name, price, onClick}: CartItemProps) {
    return (
        <li className="flex justify-between items-center gap-4  bg-gray-200 text-black dark:bg-gray-900 dark:text-white p-4 rounded-xl relative">
            <img className="w-[50%] rounded-xl" src={background_image} alt="Game image" />
            <div className="flex flex-col m-auto">
                <h1>{name}</h1>
                <h4>{price} &euro;</h4>
            </div>
            <button className="absolute top-0 right-0 rounded-full cursor-pointer text-gray-00 dark:text-gray-400 hover:text-gray-900 hover:dark:text-gray-600 transition-all" onClick={onClick}><IoIosCloseCircle size={30}/></button>
        </li>
    )
}