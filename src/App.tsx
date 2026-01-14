import { Outlet, Link } from "react-router"
import Navbar from "./components/Navbar"
import { CiShoppingCart } from "react-icons/ci"
import { useState } from "react";
import Cart from "./components/Cart";
function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center h-screen">
      <Navbar />
      <div className="w-full h-screen">
        <Outlet />
      </div>

      <div className="absolute top-8 left-[95%] dark:text-gray-300">
        <button className="cursor-pointer" onClick={() => setVisible(true)}><CiShoppingCart size={32} /></button>
      </div>
    {visible && 
    <Cart/>}

    </div>
  )
}

export default App
