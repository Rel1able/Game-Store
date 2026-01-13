import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";

type Game = {
    name: string
    background_image: string 
    rating: number 
    id:  number
} 

type StoreProps = {
    baseUrl: string;
    title: string
}
export default function Store({baseUrl, title}: StoreProps) {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getGames() {
            const url = `${baseUrl}&search=${search}`
            const res = await fetch(url);
            const data = await res.json();
            setGames(data.results);
            console.log(data.results);
        }
        getGames();
    }, [search, baseUrl])

    return (
        <div className="flex flex-col gap-8 p-8 justify-center items-center">
            <Searchbar setSearch={setSearch}/>
            <h1 className="text-center font-bold text-2xl dark:text-white">{title}</h1>
            <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
                {games.map((game:Game) => (
                    <ProductCard name={game.name} bgImage={game.background_image} rating={game.rating} id={game.id}/>
                ))}
            </ul>
        </div>
    )
}