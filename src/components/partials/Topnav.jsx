/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import { Link } from "react-router-dom"
import noimage from "/noimage.webp"

const Topnav = ({trending, popular, movie, tvShows}) => {

    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const getSearches = async() => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setSearches(data.results)
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    useEffect(() => {
        getSearches();
    }, [query])

    return(
        <div className="w-[100%] md:w-[80%] h-[10vh] relative flex items-center md:mx-auto">
            
            <i className="ri-search-line text-zinc-400 text-2xl md:text-3xl"></i>
            <input onChange={(e) => setQuery(e.target.value)} value = {query} className="w-[60%] md:w-[50%] text-zinc-200 mx-5 md:mx-10 p-3 md:p-5 text-lg md:text-xl outline-none border-none bg-transparent" type="text" placeholder="Search Movie"/>
            {query.length > 0 && <i onClick={() => setQuery("")}   className={`ri-close-fill text-zinc-400 text-2xl md:text-3xl cursor-pointer ml-10 ${
    trending?.length > 0 || popular?.length > 0 || movie?.length > 0 || tvShows?.length > 0 ? 'md:ml-20' : 'md:ml-4'
  }`}></i>}
            

            <div className={`absolute w-[80%] ${
    trending?.length > 0 || popular?.length > 0 || movie?.length > 0 || tvShows?.length > 0 ? 'md:w-[70%]' : 'md:w-[52%]'
  } max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] md:left-[8%] overflow-auto z-[100] shadow-lg`}>
                {searches.map((search, index) => (
                    <Link to={`/${search.media_type}/details/${search.id}`} key={index} className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-5 md:p-10 flex justify-start items-center border-b-2 border-zinc-100">
                        <img className="w-[7vh] md:w-[10vh] h-[7vh] md:h-[10vh] object-cover mr-3 md:mr-5 rounded shadow-lg" src={search.backdrop_path || search.profile_path ? `https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path}` : noimage} alt="" />
                        <span>{search.name || search.title || search.original_name || search.original_title}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Topnav