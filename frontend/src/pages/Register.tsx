import { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [errors, setErrors] = useState([]);

    async function handleSignUp(e: React.ChangeEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const req = await fetch("http://localhost:3000/auth/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password })
            });
            const res = await req.json();
            if (res.errors) {
                console.log(res.errors);
                setErrors(res.errors);
                return
            }
            navigate("/login");

        } catch (err) {
            console.error(err);
        }

    }


    return (

        <div className="flex h-screen justify-center items-center w-full flex-col">
            <form onSubmit={handleSignUp} className="flex flex-col justify-center gap-4 items-center w-64 h-120">
                <h1 className="text-2xl font-bold">Sign in</h1>
                <div className="flex flex-col">
                    <label className="p-2 w-full" htmlFor="email">Email address</label>
                    <input className="outline-0 bg-gray-100 p-2  w-full rounded-xl" value={email} type="email" required placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2 w-full">Password</label>
                    <input className="outline-0 bg-gray-100 p-2 rounded-xl w-full" value={password} type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2 w-full" htmlFor="email">Confirm password</label>
                    <input className="outline-0 bg-gray-100 p-2 rounded-xl w-full" value={confPassword} type="password" required placeholder="Confirm password" onChange={(e) => setConfPassword(e.target.value)} />
                </div>
                <button className="bg-blue-500 w-52 px-4 py-2 rounded-2xl text-white cursor-pointer hover:bg-blue-600 transition-all">Login</button>
                {errors &&
                    <ul>
                        {errors.length > 0 && errors.map((err) => (
                            <li className="text-red-600 font-bold" key={err.msg}>{err.msg}</li>
                        ))
                        }
                    </ul>}
            </form>
            <p>Already have an account? <Link className="font-medium text-blue-500" to="/Login">Login</Link></p>
        </div>
    )
}