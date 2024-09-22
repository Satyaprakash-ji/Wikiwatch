/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Sidenav = ({menuTrue}) => {
    return(
<div className={`w-full md:block lg:block ${menuTrue ? "block absolute bg-[#1F1E24] z-10 w-[55%]" : "hidden" } md:w-[40%] lg:w-[20%] h-full border-r-2 border-zinc-400 p-4 md:p-6 lg:p-10 `}>
  <h1 className="text-lg md:text-xl lg:text-2xl text-white font-bold">
    <i className="ri-movie-fill text-[#6556CD] mr-2"></i>
    <span>Wikiwatch</span>
  </h1>
  <nav className="flex flex-col text-zinc-400 text-base md:text-lg lg:text-xl gap-2 md:gap-3">
    <h1 className="text-white font-semibold text-lg md:text-xl mt-6 mb-3 md:mt-10 md:mb-5">
      New Feed
    </h1>
    <Link
      to="/trending"
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-fire-fill mr-2"></i>
      Trending
    </Link>
    <Link
      to="/popular"
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-bard-fill mr-2"></i>
      Popular
    </Link>
    <Link
      to="/movie"
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-movie-2-fill mr-2"></i>
      Movies
    </Link>
    <Link
      to="/tvShows"
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-tv-fill mr-2"></i>
      Tv Shows
    </Link>
    <Link
      to="/person"
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-team-fill mr-2"></i>
      People
    </Link>
  </nav>

  <hr className="border-none h-[1px] bg-zinc-400 mt-5" />

  <nav className="flex flex-col text-zinc-400 text-base md:text-lg lg:text-xl gap-2 md:gap-3">
    <h1 className="text-white font-semibold text-lg md:text-xl mt-6 mb-3 md:mt-10 md:mb-5">
      Website Information
    </h1>
    <Link
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-information-fill mr-2"></i>
      About Wikiwatch
    </Link>
    <Link
      className="hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg duration-300"
    >
      <i className="ri-phone-fill mr-2"></i>
      Contact us
    </Link>
  </nav>
</div>

    )
}

export default Sidenav