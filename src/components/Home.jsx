import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Header from "./partials/Header";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
    document.title = "Wikiwatch || Homepage";

    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState("all")
    const [menuTrue, setMenuTrue] = useState(false)

    const getHeaderWallpapers = async() => {
        try {
            const { data } = await axios.get(`/trending/all/day`)
            let randomData = data.results[(Math.random() * data.results.length).toFixed()]
            setWallpaper(randomData)
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const getTrending = async() => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`)
            setTrending(data.results)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleMenu = () => {
        setMenuTrue(!menuTrue);
    }

    

    useEffect(() => {
        getTrending();
        !wallpaper && getHeaderWallpapers();
    }, [category])

    return wallpaper && trending ? (
        <>
            <Sidenav menuTrue={menuTrue}/>
            <div className="w-full md:w-[90%] lg:w-[80%] h-full overflow-x-hidden">
                <div className="flex items-center">
                    <i onClick={() => handleMenu()} className={`${menuTrue ? "ri-close-fill absolute right-14 top-4 z-20" : "ri-menu-line"} md:hidden mr-10 ml-2 text-zinc-400 text-2xl`}></i>
                    <Topnav />
                </div>
                <Header data={wallpaper}/>
                <div className="mb-5 flex flex-col md:flex-row justify-between p-3 md:p-5">
                    <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400 mb-3 md:mb-0">Trending</h1>
                    <Dropdown title="FILTER" options={["tv", "movie", "all"]} handleDropdown={(e) => setCategory(e.target.value)}/>
                </div>
                <HorizontalCards data={trending}/>
            </div>
        </>
    ) : <Loading />
}

export default Home;