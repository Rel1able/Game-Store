import {createContext, useContext, useState} from "react";
import type { ReactNode } from "react";
import type { CartGame } from "../types/cart";



type CartContextType = {
    cart: CartGame[];
    addToCart: (game: CartGame) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({children} : {children: ReactNode}){
    const stored = localStorage.getItem("cart");
    const [cart, setCart] = useState<CartGame[]>(() => stored ? JSON.parse(stored) : []);


    function addToCart(game: CartGame){
        setCart(prev => {
            const updated = [...prev, game];
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        })
    }

    function removeFromCart(id: number){
        setCart(prev => {
            const updated = prev.filter(g => g.id !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        })
    }

    function clearCart(){
        setCart([]);
        localStorage.removeItem("cart");
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used withing CartProvider");
    return context;
}