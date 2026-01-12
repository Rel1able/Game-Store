import { NavLink, Link } from "react-router"
import { CiShop, CiStar } from "react-icons/ci"
import { GiGamepad } from "react-icons/gi";
import ThemeToggleBar from "./ThemeToggleBar";
import { AiOutlineMenu } from "react-icons/ai";

export default function Dashboard() {

    const navItemClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-blue-500  flex items-center gap-2 font-medium"
            : "text-black hover:text-blue-500 flex items-center gap-2 dark:text-gray-300";

    const listItems = [
        { name: "Store", link: "/", icon: <CiShop size={32} /> },
        { name: "Favorite", link: "/favorite", icon: <CiStar size={32} /> },
        { name: "Your Games", link: "/games", icon: <AiOutlineMenu size={30} /> }
    ]

    const genresList = ["Action", "Strategy", "RPG", "Shooter", "Adventure", "Puzzle", "Racing", "Sports"];
    return (
        <div className="w-52 h-full dark:text-gray-300">

            <h1 className="text-2xl m-4 font-bold w-full flex items-center justify-center gap-2"><GiGamepad size={32} /><Link to="/">Game Store</Link></h1>
            <nav>
                <ul>
                    {listItems.map((item) => (
                        <li className="m-4"><NavLink to={item.link} className={({ isActive }) =>
                            `${navItemClass({ isActive })}`
                        }><span>{item.icon}</span>{item.name}</NavLink></li>
                    ))}
                </ul>
                <div>
                    <h1>Top</h1>
                    <ul>
                        <li>Popular in 2025</li>
                    </ul>
                </div>
                <div>
                    <h1>Genres</h1>
                    <ul>
                        {genresList.map((genre) => (
                            <li>{genre}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center mt-auto justify-center">
                    <ThemeToggleBar />
                </div>
            </nav>


        </div>
    )
}