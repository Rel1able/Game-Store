import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import Dropdown from "./Dropdown";
import { Loadingbar } from "./Loadingbar";
import { useSearchParams } from "react-router";


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
export default function Store({ queryString, title }: StoreProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const orderingValue = searchParams.get("ordering") ?? "-added";
    const currentPage = Number(searchParams.get("page") ?? 1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(10);

    const [games, setGames] = useState([]);

    function updateParams(params: { search?: string, ordering?: string, page?: number }) {
        setSearchParams(prev => {
            if (params.search !== undefined) prev.set("search", params.search);
            if (params.ordering !== undefined) prev.set("ordering", params.ordering);
            if (params.page !== undefined) prev.set("page", String(params.page));
            return prev;
        })

    }



    const options = [
        { name: "Popularity", value: "-added" },
        { name: "Release date", value: "-released" },
        { name: "Rating", value: "-rating" }]

    useEffect(() => {
        async function getGames() {
            setLoading(true);
            setGames([])
            const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}${queryString}&ordering=${orderingValue}&page=${currentPage}&search=${search}`
            const res = await fetch(url);
            const data = await res.json();
            setGames(data.results);
            const perPage = 20;
            const pages = Math.ceil(data.count / perPage);
            setTotalPages(Math.min(pages, 10));
            setLoading(false);
        }
        getGames();

    }, [search, queryString, orderingValue, currentPage])

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center">
            <Loadingbar />
        </div>
    }
    if (games.length === 0) {
        return <div className="flex flex-col items-center justify-center h-full p-8">
            <Searchbar search={search} setSearch={(value) => updateParams({ search: value, page: 1 })} />
            <div className="font-bold text-4xl dark:text-white m-auto">No games found</div>
        </div>
    }

    return (
        <div className="flex flex-col gap-8 p-8 justify-center items-center">
            <Searchbar search={search} setSearch={(value) => updateParams({ search: value, page: 1 })} />
            <h1 className="text-center w-full font-bold text-4xl dark:text-white">{title}</h1>
            <div className="relative w-full mb-2 bottom-6">
                <Dropdown options={options} orderingValue={orderingValue} setOrderingValue={(value) => updateParams({ ordering: value, page: 1 })} />
            </div>
            <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                {games.map((game: Game) => (
                    <ProductCard name={game.name} bgImage={game.background_image} rating={game.rating} id={game.id} />
                ))}
            </ul>
            <ul className="flex gap-2 justify-center mt-8">
                {pageNumbers.map((number, id) => (

                    <li key={id}>
                        <button className={`px-3 w-full py-1 rounded-full cursor-pointer font-bold hover:bg-blue-500 dark:text-white  ${currentPage === number ? `bg-blue-500` : `bg-gray-200 dark:bg-gray-800`}`} onClick={() => updateParams({ page: number })}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}