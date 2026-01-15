import { Outlet} from "react-router"
import Navbar from "./components/Navbar"
import { CiShoppingCart } from "react-icons/ci"
import { useState, useEffect, useRef } from "react";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/Cart";
function App() {
  const [visible, setVisible] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

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


  return (
    <CartProvider>
      <div className="flex items-center h-screen" >
        <Navbar />
        <div className={`w-full h-full transition-all ${visible ? "blur-sm pointer-events-none" : ""}`}>
          <Outlet />
        </div>

        <div className="absolute top-8 left-[95%] dark:text-gray-300">
          <button className="cursor-pointer" onClick={() => setVisible(true)}><CiShoppingCart size={32} /></button>
        </div>
        {visible &&
          <div ref={cartRef}><Cart /></div>
        }
      </div>
    </CartProvider>

  )
}

export default App
