import { getGamePrice } from "../utils/pricing";
import { useEffect} from "react";
import { useCart } from "../contexts/CartContext";
import type { Game } from "../types/game";
import CartItem from "./CartItem";



type CartProps = {
    setVisible: (value: boolean) => void
    setShowModal: (value: boolean) => void;
}

export default function Cart({ setVisible, setShowModal }: CartProps) {
    const { cart, clearCart, removeFromCart } = useCart();
    const games = JSON.parse(localStorage.getItem("cart") || "[]");


    function handleCheckout() {
        if (cart.length === 0) return;

        const existingLibrary = JSON.parse(
            localStorage.getItem("library") || "[]"
        );
        const newGames = cart.filter(cartGame =>
            !existingLibrary.some((libGame: { id: number }) => libGame.id === cartGame.id)
        );
        if (newGames.length === 0) {
            alert("You already own all these games");
            return;
        }
        clearCart();
        setVisible(false);
        setShowModal(true);
        const updatedLibrary = [...existingLibrary, ...newGames]
        localStorage.setItem("library", JSON.stringify(updatedLibrary));

    }

    const gamesWithPrices = games.map((game: Game) => ({
        ...game,
        price: getGamePrice(game.rating)
    }))
    let prices = gamesWithPrices.map((game: Game) => game.price);
    const totalPrice = prices.reduce((acc: number, curr: number) => acc + curr, 0)


    useEffect(() => {
    }, [cart])

    return (
        <>
            <div className="fixed flex flex-col right-0 top-0 h-screen p-4 w-92 bg-white text-black dark:bg-gray-800 dark:text-white text-center overflow-scroll hide-scrollbar ">
                <div className="flex justify-between p-2">
                    <div className="font-bold text-2xl">{games.length} Games</div>
                    <button className="text-2xl text-gray-600 dark:text-gray-400" onClick={clearCart}>Clear</button>
                </div>
                <ul className="flex flex-col gap-2 flex-1 overflow-y-auto hide-scrollbar p-2 m-2">
                    {gamesWithPrices.map((game: Game) => (
                        <CartItem background_image={game.background_image} name={game.name} price={game.price} onClick={() => removeFromCart(game.id)} />
                    ))}
                </ul>
                <div className="relative bottom-0">
                    <div className="sticky bottom-0 bg-gray-200 dark:bg-gray-900 w-84 p-4 mr-2 rounded-2xl">
                        <div className="black dark:text-gray-300 text-2xl">Total: {totalPrice.toFixed(2)}&euro;</div>
                        <button onClick={handleCheckout} className="px-2 py-1 bg-gray-700 text-white rounded-xl m-2 hover:bg-gray-800 transition-all cursor-pointer text-2xl" disabled={cart.length === 0}>Checkout</button>
                    </div>

                </div>
            </div>
        </>

    )
}