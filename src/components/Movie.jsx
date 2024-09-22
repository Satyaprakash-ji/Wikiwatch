import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const Movie = () => {

    document.title = "Wikiwatch || Movies";

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const getMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)
            if(data.results.length > 0){
                setMovie((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            }else{
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if(movie.length === 0){
            getMovie();
        }else{
            setPage(1);
            setMovie([]);
            getMovie();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category])

    return movie.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-5 md:px-[5%] py-3">
                <h1 className="w-full md:w-[30%] text-xl md:text-2xl font-semibold text-zinc-400 flex items-center mb-3 md:mb-0">
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line">    
                    </i>{" "}
                    Movies <small className="ml-2 text-sm text-zinc-600">( {category} )</small>
                </h1>

                <div className="w-full md:w-[70%] flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3">
                    <Topnav movie={movie}/>
                    <Dropdown title="CATEGORY" options={["popular", "top_rated", "upcoming", "now_playing"]} handleDropdown={(e) => setCategory(e.target.value)}/>
                    <div className="w-[2%]"></div>
                </div>
            </div>

                <InfiniteScroll dataLength = {movie.length} next = {getMovie} hasMore = {hasMore} loader = {<h1>Loading...</h1>}>

                    <Cards data={movie} title="movie"/>
                </InfiniteScroll>
        </div>
    ) : <Loading />
}

export default Movie;