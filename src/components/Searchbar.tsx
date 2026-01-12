import {useState} from "react";

export default function Searchbar({onSearch}){

    const [value, setValue] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        onSearch(value);
    }
    return (
        <form className="bg-gray-200 p-2 rounded-2xl dark:bg-gray-800 dark:text-white" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" onChange={(e) => setValue(e.target.value)}/>
        </form>
    )
}