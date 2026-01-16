import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import { CiShoppingCart } from "react-icons/ci"
import { useState, useEffect, useRef } from "react";
import Cart from "./components/Cart";
import { useCart } from "./contexts/CartContext";
function App() {
  const [visible, setVisible] = useState(false);
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
  },[cart])


  return (

      <div className="flex items-center h-screen" >
        <Navbar />
        <div className={`w-full h-full transition-all ${visible ? "blur-sm pointer-events-none" : ""}`}>
          <Outlet />
        </div>

        <div className="absolute top-8 left-[95%] dark:text-gray-300">
          <button className="cursor-pointer" onClick={() => setVisible(true)}><CiShoppingCart size={32} /></button>
        </div>
        {cart.length > 0 && <div className="bg-blue-500 rounded-full w-2 h-2 absolute top-8 left-[96.6%]"></div>}

        {visible &&
          <div ref={cartRef}><Cart setVisible={setVisible}/></div>
        }
      </div>


  )
}

export default App
