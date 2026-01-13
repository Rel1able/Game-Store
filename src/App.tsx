import { Outlet, Link } from "react-router"
import Navbar from "./components/Navbar"
import { CiShoppingCart } from "react-icons/ci"
function App() {


  return (
    <div className="flex items-center h-screen">
      <Navbar />
      <div className="w-full h-screen">
        <Outlet />
      </div>
      <Link to="/cart">
        <div className="absolute top-8 left-[95%] dark:text-gray-300"><CiShoppingCart size={32} />
        </div>
      </Link>

    </div>
  )
}

export default App
