import { useEffect } from "react";
export default function AddedGames() {


    useEffect(() => {
        const storedLibrary = localStorage.getItem("library");
        const library = storedLibrary ? JSON.parse(storedLibrary) : [];
        console.log(library);
    }, []);

    return (
        <>
            <h1>Lirary of your games</h1>
        </>
    )
}