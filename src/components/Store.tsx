import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import Dropdown from "./Dropdown";

type Game = {
    name: string
    background_image: string
    rating: number
    id: number
}

type StoreProps = {
    queryString: string;
    title: string;
    homepage: boolean;
}
export default function Store({ queryString, title}: StoreProps) {

    const [orderingValue, setOrderingValue] = useState("-added");
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const baseUrl = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}${queryString}&ordering=${orderingValue}`

    const options = [
        { name: "Popularity", value: "-added" },
        { name: "Release date", value: "-released" },
        { name: "Rating", value: "-rating" }]

    useEffect(() => {
        async function getGames() {
            const url = `${baseUrl}&search=${search}`
            const res = await fetch(url);
            const data = await res.json();
            setGames(data.results);
            console.log(data.results);
        }
        getGames();
    }, [search, baseUrl, orderingValue])

    return (
        <div className="flex flex-col gap-8 p-8 justify-center items-center">
            <Searchbar setSearch={setSearch} />
            <h1 className="text-center font-bold text-2xl dark:text-white">{title}</h1>
            <div className="relative w-full mb-2 bottom-6">
                <Dropdown options={options} orderingValue={orderingValue} setOrderingValue={setOrderingValue} />
            </div>
            < ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
                {games.map((game: Game) => (
                    <ProductCard name={game.name} bgImage={game.background_image} rating={game.rating} id={game.id} />
                ))}
            </ul>
        </div>
    )
}