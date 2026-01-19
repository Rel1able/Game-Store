import { useState, useEffect } from "react";
import AddedGameCard from "../components/AddedGameCard";
import type { LibraryGame } from "../types/library";

export default function AddedGames() {
    const [library, setLibrary] = useState<LibraryGame[]>([]);

    useEffect(() => {
        const storedLibrary = localStorage.getItem("library");
        setLibrary(storedLibrary ? JSON.parse(storedLibrary) : []);
    }, []);

    function toggleFavorite(id: number) {
        setLibrary(prev => {
            const updated = prev.map(game =>
                game.id === id
                    ? { ...game, favorite: !game.favorite }
                    : game

            )
            localStorage.setItem("library", JSON.stringify(updated));
            return updated;
        })
    }


    return (
        <div className="flex flex-col gap-8 p-16 justify-center items-center">
            <h1 className="font-bold text-4xl">Added Games</h1>
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
