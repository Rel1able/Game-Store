import { useState, useEffect } from "react";
import AddedGameCard from "../components/AddedGameCard";
import type { LibraryGame } from "../types/library";

export default function Favorite() {
    const [library, setLibrary] = useState<LibraryGame[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("library") || "[]");
        setLibrary(stored.filter((game: LibraryGame) => game.favorite));
    }, []);


    function toggleFavorite(id: number) {
        const stored: LibraryGame[] = JSON.parse(
            localStorage.getItem("library") || "[]"
        );

        const updatedLibrary = stored.map(game =>
            game.id === id
                ? { ...game, favorite: !game.favorite }
                : game
        );

        localStorage.setItem("library", JSON.stringify(updatedLibrary));


        setLibrary(updatedLibrary.filter(game => game.favorite));
    }


    if (library.length === 0) {
        return (
            <div className="flex flex-col gap-4 p-16 justify-center items-center">
                <h1 className="font-bold text-4xl dark:text-white">No favorite games yet</h1>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-8 p-16 justify-center items-center">
            <h1 className="font-bold text-4xl dark:text-white">Favorite Games</h1>
            <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
                {library.map(game => (
                    <AddedGameCard
                        {...game}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </ul>
        </div>
    );
}
