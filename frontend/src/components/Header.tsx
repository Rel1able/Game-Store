import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router";

export default function Header(){

    const {token} = useContext(AuthContext);


    return (
        
            token ? <header className="w-full flex justify-center items-center font-bold text-2xl">Welcome Back</header> 
            : <header className="w-full flex justify-center items-center font-bold text-2xl gap-2 dark:text-white">Please<Link className="text-blue-500" to="/login">Log in</Link></header>
       
        
    )
}