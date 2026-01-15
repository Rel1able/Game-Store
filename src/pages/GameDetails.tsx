import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { RAWG_BASE_URL, RAWG_API_KEY } from "../config/api";
import { getGamePrice } from "../utils/pricing";
import { formatDate } from "../utils/dateFormatting";
import { Loadingbar } from "../components/Loadingbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import ImageCarousel from "../components/ImageCarousel";
import { MdStar } from "react-icons/md";

type Screenshot = {
    id: number;
    image: string;
}
type Genre = {
    name: string;
}

type Game = {
    rating: number;
    name: string;
    background_image: string;
    description_raw: string;
    website: string;
    genres: Genre[];
    released: string;
}

export default function GameDetails() {
    const [game, setGame] = useState<Game | null>();
    const [price, setPrice] = useState(0);
    const [gameScreenshots, setGameScreenshots] = useState<Screenshot[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = game ? [game.background_image, ...gameScreenshots.map((s) => s?.image)] : [];
    const { gameId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    console.log(gameId);

    useEffect(() => {

        async function getGameDetails() {
            try {
                const req = await fetch(`${RAWG_BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`);
                const res = await req.json();
                setGame(res);
                console.log(res);

                const calculatedPrice = getGamePrice(res.rating);
                setPrice(calculatedPrice);

            } catch (err) {
                console.error(err);
            }
        }

        async function getGameScreenshots() {
            try {
                const req = await fetch(`${RAWG_BASE_URL}/games/${gameId}/screenshots?key=${RAWG_API_KEY}`);
                const res = await req.json();
                setGameScreenshots(res.results);
                console.log(res);

            } catch (err) {
                console.error(err);
            }
        }
        getGameDetails();
        getGameScreenshots();

    }, [gameId])

    function handleNavigateBack(){
        if (location.state?.from){
            navigate(location.state.from);
        }else{
            navigate(-1);
        }
    }


    function nextImage() {
        setCurrentIndex(i => (i + 1) % images.length);
    }

    function prevImage() {
        setCurrentIndex(i => (i - 1 + images.length) % images.length);
    }

    return game ? (
        <div>
            <div className="flex items-center">
                <button className="cursor-pointer dark:text-white" onClick={() => handleNavigateBack()}>
                    <IoIosArrowRoundBack size={64} />
                </button>

                <h1 className="font-bold text-4xl text-center m-auto dark:text-white p-2">{game.name}</h1>
            </div>

            <div className="flex justify-between items-center">
                <ImageCarousel currentIndex={currentIndex} prevImage={prevImage} nextImage={nextImage} images={images} setIndex={setCurrentIndex} />

                <div className="p-4 flex h-192 flex-col  gap-2 w-[40%]">
                    
                        <div className="p-2 rounded-2xl">
                            <h2 className="text-2xl font-bold dark:text-white">Description</h2>
                            <p className="dark:text-white overflow-scroll h-72 hide-scrollbar">
                                {game.description_raw || "N/A"}
                            </p>
                        </div>

                        <div>
                            <ul className="bg-gray-100 rounded-xl flex-col flex gap-4 p-2 dark:bg-gray-600 dark:text-white flex-w">
                                <li>
                                    Website <a href={game.website}>{game.website}</a>
                                </li>
                                <li className="flex gap-2 flex-wr">
                                    Genres:
                                    <ul className="flex gap-2">
                                        {game.genres.map((genre) => (
                                            <li key={genre.name}>{genre.name}</li>
                                        ))}
                                    </ul>
                                </li>
                                <li>Release: {game.released ? formatDate(game.released) : "N/A"}</li>
                                <li className="flex items-center gap-0.5">Rating: {game.rating}<div className="text-blue-400 relative bottom-[0.2]"><MdStar size={24}/></div></li>
                            </ul>
                        </div>
                        <div className="mt-2 flex text-2xl justify-between p-2 font-bold bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white">
                            <div>{price} &euro;</div>
                            <button className="cursor-pointer">Add to cart +</button>
                        </div>
                    



                </div>
            </div>
        </div>
    ) : (
        <div className="w-full h-full flex justify-center items-center">
            <Loadingbar />
        </div>

    );


}