import { useState } from "react";

export default function Dropdown({options, orderingValue, setOrderingValue}){
    const [open, setOpen] = useState(false);

    const selected = options.find(o => o.value === orderingValue)
    return (
        <div className="absolute top-0 w-48 bg-gray-200 rounded-xl px-2 py-1 dark:bg-gray-800 dark:text-white">
            {!open && (
                <li onClick={() => setOpen(!open)}>Order by: {selected.name || "Popularity"}</li>
            )}
            
            {open && (
                options.map((option) => (
                    <li onClick={() => {
                        setOrderingValue(option.value)
                        setOpen(false);
                    }} value={option.value}>{option.name}</li>
                ))
            )}
        </div>
    )
}