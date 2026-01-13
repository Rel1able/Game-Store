import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import Store from "../components/Store";

export default function PopularInYear() {
    const baseUrl = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&dates=2025-01-01,2025-12-31`;
    return (
        <Store baseUrl={baseUrl} title={"Popular in 2025"}/>
    )

}