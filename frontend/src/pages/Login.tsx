import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Login() {
    const { setToken } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e: React.ChangeEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const req = await fetch("http://localhost:3000/auth/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password })
            });
            const res = await req.json();
            if (!res.ok) {
                setError(res.error);
            }
            setToken(res.token)
            localStorage.setItem("token", res.token);
            navigate("/");

        } catch (err) {
            console.error(err);
        }

    }


    return (
        <div className="flex h-screen justify-center items-center w-full flex-col">
            <form onSubmit={handleLogin} className="flex flex-col justify-center gap-4 items-center w-64 h-96">
                <h1 className="text-2xl font-bold">Sign in</h1>
                <div className="flex flex-col">
                    <label className="p-2 w-full" htmlFor="email">Email address</label>
                    <input className="outline-0 bg-gray-100 p-2  w-full rounded-xl" value={email} type="email" required placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2 w-full">Password</label>
                    <input className="outline-0 bg-gray-100 p-2 rounded-xl w-full" value={password} type="password" required placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="bg-blue-500 w-52 px-4 py-2 rounded-2xl text-white cursor-pointer hover:bg-blue-600 transition-all">Login</button>
                {error && <p>{error}</p>}
            </form>
            <p>Don't have an account yet? <Link className="font-medium text-blue-500" to="/register">Sign up</Link></p>
        </div>

    )
}