import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import { CiShoppingCart } from "react-icons/ci"
import { useState, useEffect, useRef } from "react";
import Cart from "./components/Cart";
import { useCart } from "./contexts/CartContext";
import { BsList } from "react-icons/bs";
import { Link } from "react-router";

function App() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    }
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible])

  useEffect(() => {
    console.log("rend");
  }, [cart])


  return (

    <div className="flex items-start min-h-screen" >
      <span className="hidden lg:block"><Navbar /></span>




      <div className={`w-full h-full transition-all ${visible ? "blur-sm pointer-events-none" : ""}`}>
        <Outlet />
      </div>

      <div className="absolute top-8 right-8 dark:text-gray-300 flex items-center">
        <button className="relative cursor-pointer" onClick={() => setVisible(true)}>
          <CiShoppingCart size={32} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 w-2 h-2 rounded-full"></span>
          )}
        </button>
      </div>
      <div className="fixed bottom-16 right-8 dark:text-white bg-gray-200  dark:bg-gray-700 rounded-full p-2 flex items-center lg:hidden z-10" onClick={() => setOpened(!opened)}>
        <button className="relative cursor-pointer ">
          <BsList size={32} />
        </button>
      </div>

      {opened &&
        <div className="h-screen flex justify-center items-center absolute bg-gray-900 w-full">
          <Navbar />
        </div>}
      {visible &&
        <div ref={cartRef}><Cart setVisible={setVisible} /></div>
      }
    </div>


  )
}

export default App
