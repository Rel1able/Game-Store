import Store from "../components/Store";

export default function PopularInYear() {
    const queryString = "&dates=2026-01-01,2026-12-31";
    return (
        <Store queryString={queryString} title={"Popular in 2026"} homepage={false}/>
    )

}