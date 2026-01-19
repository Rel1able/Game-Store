import { useState, useEffect } from "react";
import AddedGameCard from "../components/AddedGameCard";
import type { LibraryGame } from "../types/library";
import { Link } from "react-router";

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


 if (library.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-16 justify-center items-center">
        <h1 className="font-bold text-4xl dark:text-white">Your library is empty</h1>
        <Link to="/" className="bg-blue-500 text-white font-bold text-2xl p-4 rounded-xl hover:bg-blue-600 transition-all">Shop now to add games!</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-16 justify-center items-center">
      <h1 className="font-bold text-4xl dark:text-white">Added Games</h1>
      <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]  gap-8">
        {library.map(game => (
          <AddedGameCard
            key={game.id}
            {...game}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
}
