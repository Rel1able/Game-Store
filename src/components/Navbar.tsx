import { NavLink, Link } from "react-router"
import { CiShop, CiStar, CiMountain1, CiFootball} from "react-icons/ci"
import { GiGamepad, GiPistolGun } from "react-icons/gi";
import ThemeToggleBar from "./ThemeToggleBar";
import { AiOutlineMenu } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiBoxingGlove, PiFlagCheckeredFill } from "react-icons/pi";
import { SiLichess } from "react-icons/si";
import { RiSwordLine } from "react-icons/ri";
import { SlPuzzle } from "react-icons/sl";

export default function Navbar() {

    const iconSize = 32;

    const navItemClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-blue-500  flex items-center gap-2 font-medium"
            : "text-black hover:text-blue-500 flex items-center gap-2 dark:text-gray-300";

    const listItems = [
        { name: "Store", link: "/", icon: <CiShop size={iconSize} /> },
        { name: "Favorite", link: "/favorite", icon: <CiStar size={iconSize} /> },
        { name: "Your Games", link: "/library", icon: <AiOutlineMenu size={iconSize} /> }
    ]

    const genresList = [
        { name: "Action", link: "/games/genre/action", icon: <PiBoxingGlove size={iconSize}/> },
        { name: "Strategy", link: "/games/genre/strategy", icon: <SiLichess size={iconSize}/> },
        { name: "RPG", link: "/games/genre/role-playing-games-rpg", icon: <RiSwordLine size={iconSize}/> },
        { name: "Shooter", link: "/games/genre/shooter", icon: <GiPistolGun size={iconSize}/> },
        { name: "Adventure", link: "games/genre/adventure", icon: <CiMountain1 size={iconSize}/> },
        { name: "Puzzle", link: "games/genre/puzzle", icon: <SlPuzzle size={iconSize}/> },
        { name: "Racing", link: "/games/genre/racing", icon: <PiFlagCheckeredFill size={iconSize}/> },
        { name: "Sports", link: "/games/genre/sports", icon: <CiFootball size={iconSize}/> },
    ];

    return (
        <div className="w-64 h-full dark:text-gray-300">

            <h1 className="text-2xl m-4 font-bold w-full flex items-center justify-center gap-2"><GiGamepad size={32} /><Link to="/">Game Store</Link></h1>
            <nav>
                <ul>
                    {listItems.map((item) => (
                        <li className="m-4 text-xl"><NavLink to={item.link} className={({ isActive }) =>
                            `${navItemClass({ isActive })}`
                        }><span>{item.icon}</span>{item.name}</NavLink></li>
                    ))}
                </ul>
                <div className="ml-5 flex gap-3 text-xl"><NavLink to="/games/popular-in-year" className={({isActive}) => `${navItemClass({ isActive })}`}><BsGraphUpArrow size={24} />Popular in 2026</NavLink></div>
                <div className="mt-6">
                    <h1 className="ml-4 font-bold text-2xl mb-4">Genres</h1>
                    <ul className="flex flex-col gap-2">
                        {genresList.map((genre) => (
                            <li className="ml-4 flex gap-2 text-xl"><NavLink to={genre.link} className={({isActive}) => `${navItemClass({ isActive })}`}><span>{genre.icon}</span>{genre.name}</NavLink></li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center mt-2 justify-center">
                    <ThemeToggleBar />
                </div>
            </nav>


        </div>
    )
}