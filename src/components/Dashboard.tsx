import { NavLink } from "react-router"
import { CiHome, CiShoppingCart, CiHeart, CiStar } from "react-icons/ci"
import { GiGamepad } from "react-icons/gi";
import ThemeToggleBar from "./ThemeToggleBar";

export default function Dashboard() {

    const navItemClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-blue-500  flex items-center gap-2 font-medium"
            : "text-black hover:text-blue-500 flex items-center gap-2 dark:text-gray-600";

    const listItems = [
        { name: "Store", link: "/", icon: <CiShoppingCart size={32} /> },
        { name: "Favorite", link: "/favorite", icon: <CiStar size={32} /> },
        { name: "Wishlist", link: "/wishlist", icon: <CiHeart size={32} /> },]
    return (
        <div className="w-52 h-full dark:text-gray-300">

            <h1 className="text-2xl m-4 font-bold w-full flex items-center justify-center gap-2 w-full"><GiGamepad size={32} />Game Store</h1>
            <nav>
                <ul>
                    {listItems.map((item) => (
                        <li className="m-4"><NavLink to={item.link} className={({ isActive }) =>
                            `${navItemClass({ isActive })}`
                        }><span>{item.icon}</span>{item.name}</NavLink></li>
                    ))}
                </ul>
                <div className="flex items-center m-2">
                    <ThemeToggleBar />
                </div>
            </nav>


        </div>
    )
}