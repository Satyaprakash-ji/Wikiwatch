/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
    return(
        <div className="flex flex-wrap gap-x-8 md:gap-x-16 lg:gap-x-24 w-full h-full px-5 md:px-[5%] bg-[#1F1E24]">
            {data.map((card, index) => (
                <Link to={`/${card.media_type || title}/details/${card.id}`} className="lg:w-[25vh] md:w-[25vh] w-[18vh] h-[50vh] sm:mb-[-10%] mb-[-30%] md:mb-[6%]" key={index}>

                <div className="min-w-[16vw] relative">
                    <img className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-full h-[75%] object-cover" src={`https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path || card.profile_path}`} alt="" />
                    <h1 className="text-lg md:text-xl lg:text-2xl text-zinc-300 mt-3 font-semibold">
                        {card.name || card.title || card.original_name || card.original_title}
                    </h1>

                    {card.vote_average && (<div className="absolute right-[-10%] bottom-[35%] w-[5vh] h-[5vh] md:w-[6vh] md:h-[6vh] text-sm md:text-xl bg-yellow-600 text-white flex justify-center items-center rounded-full font-semibold">
                        {(card.vote_average * 10).toFixed()} <sup>%</sup>
                    </div>)}
                </div>
                
                </Link>
            ))}
        </div>
    )
}

export default Cards;