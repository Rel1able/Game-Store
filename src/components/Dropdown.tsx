import { useState } from "react";
import { FaCheck } from "react-icons/fa";

type Option = {
    name: string;
    value: string;
}
type DropdownProps = {
    options: Option[];
    orderingValue: string;
    setOrderingValue: (value: string) => void
}


export default function Dropdown({ options, orderingValue, setOrderingValue }: DropdownProps) {
    const [open, setOpen] = useState(false);

    const selected = options.find(o => o.value === orderingValue)
    return (
        <div className="absolute top-0 w-52 bg-gray-200 rounded-xl px-4 py-2  dark:bg-gray-800 dark:text-white list-none pl-3 cursor-pointer">
            {!open && (
                <li className="flex items-center justify-between" onClick={() => setOpen(!open)}>Order by: {selected?.name || "Popularity"}<FaCheck size={12} /></li>
            )}
            {open && (
                options.map((option, id) => (
                    <li key={id} className="p-1.5 rounded-xl hover:bg-gray-300 flex items-center justify-between dark:hover:bg-gray-900 " onClick={() => {
                        setOrderingValue(option.value)
                        setOpen(false);
                    }} value={option.value}>{option.name} {orderingValue === option.value ? <FaCheck size={12} /> : ""}</li>
                ))
            )}
        </div>
    )
}