import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

type modalProps = {
setShowModal: (value: boolean) => void;
}
export default function CheckoutModal({setShowModal}: modalProps) {
    const navigate = useNavigate();

    function goToLibrary(){
        setShowModal(false);
        navigate("/library")
    }

    function goToShop(){
        setShowModal(false);
        navigate("/")
    }

    return (
        <div className="bg-gray-900 p-8 rounded-xl flex flex-col items-center justify-center gap-4">
            <div className="text-green-500">
                <FaCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">Thank you</h2>
            <h1 className="text-green-600 font-medium text-2xl">Your Order is Confirmed Successfully</h1>
            <div className="flex justify-center gap-4 w-full">
                <button className="bg-blue-500 p-2 rounded-xl text-white cursor-pointer hover:bg-blue-600 transition-all" onClick={goToLibrary}>Go to library</button>
                <button className="bg-blue-500 p-2 rounded-xl text-white cursor-pointer hover:bg-blue-600 transition-all" onClick={goToShop}>Shop again</button>
            </div>

        </div>
    )
}   