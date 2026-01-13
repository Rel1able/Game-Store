import { useParams } from "react-router";
import { formatGenreName } from "../utils/gamenameFormatting";
import Store from "../components/Store";

export default function GenreGames() {
    const {gameGenre} = useParams();
    const queryString = `&genres=${gameGenre}`;
    return (
        <Store queryString={queryString} title={gameGenre ? formatGenreName(gameGenre) : ""} homepage={false}/>
    )

}