import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const TvShows = () => {

    document.title = "Wikiwatch || Tv Shows";

    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvShows, setTvShows] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const getTvShows = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`)
            if(data.results.length > 0){
                setTvShows((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            }else{
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if(tvShows.length === 0){
            getTvShows();
        }else{
            setPage(1);
            setTvShows([]);
            getTvShows();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category])

    return tvShows.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-5 md:px-[5%] py-3">
                <h1 className="w-full md:w-[30%] text-xl md:text-2xl font-semibold text-zinc-400 flex items-center mb-3 md:mb-0">
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line">    
                    </i>{" "}
                    Tv Shows <small className="ml-2 text-sm text-zinc-600">( {category} )</small>
                </h1>

                <div className="w-full md:w-[70%] flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3">
                    <Topnav tvShows={tvShows}/>
                    <Dropdown title="CATEGORY" options={["on_the_air", "popular", "top_rated", "airing_today"]} handleDropdown={(e) => setCategory(e.target.value)}/>
                    <div className="w-[2%]"></div>
                </div>
            </div>

                <InfiniteScroll dataLength = {tvShows.length} next = {getTvShows} hasMore = {hasMore} loader = {<h1>Loading...</h1>}>

                    <Cards data={tvShows} title="tv"/>
                </InfiniteScroll>
        </div>
    ) : <Loading />
}

export default TvShows;