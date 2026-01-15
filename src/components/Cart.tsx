import { getGamePrice } from "../utils/pricing";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import type { Game } from "../types/game";
import CartItem from "./CartItem";

export default function Cart() {
    const {cart, clearCart, removeFromCart} = useCart();
    const games = JSON.parse(localStorage.getItem("cart") || "[]");


    const gamesWithPrices = games.map((game: Game) => ({
        ...game,
        price: getGamePrice(game.rating)
    }))
    let prices = gamesWithPrices.map((game: Game) => game.price);
    const totalPrice = prices.reduce((acc: number, curr: number) => acc + curr, 0)
    console.log("Games", gamesWithPrices)

    useEffect(() => {
        console.log("rerendering")
    }, [cart])

    return (
        <div className="fixed right-0 top-0 h-screen p-4 w-92 bg-gray-800 text-white text-center overflow-scroll hide-scrollbar ">
            <div>
                <div>{games.length} Games</div>
                <button onClick={clearCart}>Clear</button>
            </div>
            <ul className="flex flex-col gap-2">
                {gamesWithPrices.map((game: Game) => (
                    <CartItem background_image={game.background_image} name={game.name} price={game.price} onClick={() => removeFromCart(game.id)}/>
                ))}
            </ul>
            <div>Total: {totalPrice.toFixed(2)}&euro;</div>
            <button>Checkout</button>
        </div>
    )
}