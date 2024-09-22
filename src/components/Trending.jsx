import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { useEffect, useState } from "react";
import axios from "../utils/axios"
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
    document.title = "Wikiwatch || Trending";

    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`)
            if(data.results.length > 0){
                setTrending((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            }else{
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if(trending.length === 0){
            getTrending();
        }else{
            setPage(1);
            setTrending([]);
            getTrending();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category, duration])

    return trending.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="w-full flex flex-col md:flex-row items-start md:items-center  px-5 md:px-[5%] py-3 ">
                <h1 className="w-full md:w-[30%] text-xl md:text-2xl font-semibold text-zinc-400 flex items-center mb-3 md:mb-0">
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line">    
                    </i>{" "}
                    Trending <small className="ml-2 text-sm text-zinc-600">( {category} )</small>
                </h1>

                <div className="w-full md:w-[90%] flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 ">
                    <Topnav trending={trending}/>
                    <Dropdown title="CATEGORY" options={["movie", "tv", "all"]} handleDropdown={(e) => setCategory(e.target.value)}/>
                    <div className="w-[2%]"></div>
                    <Dropdown title="DURATION" options={["week", "day"]} handleDropdown={(e) => setDuration(e.target.value)}/>
                </div>
            </div>

                <InfiniteScroll dataLength = {trending.length} next = {getTrending} hasMore = {hasMore} loader = {<h1>Loading...</h1>}>

                    <Cards data={trending} title={category}/>
                </InfiniteScroll>
        </div>
    ) : <Loading />
}

export default Trending;