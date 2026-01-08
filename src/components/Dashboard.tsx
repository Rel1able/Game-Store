import { NavLink} from "react-router"
import { CiHome, CiShoppingCart, CiHeart, CiSearch, CiStar, CiSettings} from "react-icons/ci"

export default function Dashboard() {

    const navItemClass = ({isActive}: {isActive: boolean}) => 
        isActive ? "text-blue-500  flex items-center gap-2 font-medium" 
        : "text-gray-600 hover:text-blue-500 flex items-center gap-2";

    const listItems = [
        {name: "Home", link: "/", icon: <CiHome size={32}/>},
        {name: "Store", link: "/store", icon: <CiShoppingCart size={32}/>},
        {name: "Favorite", link: "/favorite", icon: <CiStar size={32}/>},
        {name: "Discover", link: "/discover", icon: <CiSearch size={32}/>},
        {name: "Wishlist", link: "/wishlist", icon: <CiHeart size={32}/>},
        {name: "Settings", link: "/settings", icon: <CiSettings size={32}/>, styles: "mt-16"}]
    return (
        <div className="text-gray-300 h-full">

                <h1 className="text-2xl m-4 font-bold">Book Store</h1>
                <ul>
                    {listItems.map((item) => (
                        <li className="m-4"><NavLink to={item.link}  className={`${navItemClass} ${item.styles}`}><span>{item.icon}</span>{item.name}</NavLink></li>
                    ))}
                </ul>
        </div>
    )
}