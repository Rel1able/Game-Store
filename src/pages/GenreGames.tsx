import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import { useParams } from "react-router";
import { formatGenreName } from "../utils/gamenameFormatting";
import Store from "../components/Store";

export default function GenreGames() {
    const {gameGenre} = useParams();
    const baseUrl = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&genres=${gameGenre}`;
    return (
        <Store baseUrl={baseUrl} title={gameGenre ? formatGenreName(gameGenre) : ""}/>
    )

}