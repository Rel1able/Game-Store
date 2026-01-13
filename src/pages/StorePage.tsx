import Store from "../components/Store";
import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";

export default function StorePage() {

    const baseUrl = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}`
    return (
        <Store title={"Featured games"} baseUrl={baseUrl}/>
    )
}