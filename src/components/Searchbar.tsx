import {useState} from "react";
import type { FormEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchbarProps = {
    search: string;
    setSearch: (value: string) => void
}

export default function Searchbar({search, setSearch}: SearchbarProps){

    const [value, setValue] = useState(search);

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        setSearch(value);
    }
    return (
        <form className="bg-gray-200 p-2 rounded-2xl dark:bg-gray-800 dark:text-white relative" onSubmit={handleSubmit}>
            <AiOutlineSearch className="absolute right-2 top-3" size={20}/>
            <input className="focus:outline-0" type="text" value={value} placeholder="Search games..." onChange={(e) => setValue(e.target.value)}/>
        </form>
    )
}