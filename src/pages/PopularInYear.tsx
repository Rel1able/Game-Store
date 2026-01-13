import Store from "../components/Store";

export default function PopularInYear() {
    const queryString = "&dates=2025-01-01,2025-12-31";
    return (
        <Store queryString={queryString} title={"Popular in 2025"} homepage={false}/>
    )

}