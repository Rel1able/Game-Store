import { CiDark, CiBrightnessDown } from "react-icons/ci";
import { useTheme } from "../contexts/ThemeContext";


export default function ThemeToggleBar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <button onClick={toggleTheme} className="bg-gray-200  rounded-full text-black cursor-pointer hover:text-blue-500 flex items-center dark:text-gray-300 p-1.5 dark:bg-gray-800">
                {theme === "light" ? <CiDark size="32" /> : <CiBrightnessDown  size="32" />}
            </button>

        </>
    )
}

