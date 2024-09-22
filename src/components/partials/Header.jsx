import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Header = ({ data }) => {
  return (
<div
  style={{
    background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
      data.backdrop_path || data.profile_path
    })`,
    backgroundPosition: "center 5%",
    backgroundSize: "cover",
  }}
  className="w-full h-[40vh] md:h-[40vh] lg:h-[50vh] flex flex-col justify-end items-start p-[5%]"
>
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
    {data.name || data.title || data.original_name || data.original_title}
  </h1>
  <p className="w-full md:w-[80%] lg:w-[70%] text-white mt-2 md:mt-3 text-sm md:text-base">
    {data.overview.slice(0, 150)} ...{" "}
    <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">
      more
    </Link>
  </p>
  <p className="text-white text-sm md:text-base mt-2">
    <i className="ri-megaphone-fill text-yellow-500"></i> {data.release_date || "No Information"}{" "}
    <i className="ri-album-fill text-yellow-500 ml-3 md:ml-5"></i> {data.media_type.toUpperCase()}
  </p>
  <Link
    to={`/${data.media_type}/details/${data.id}/trailer`}
    className="mt-3 md:mt-5 p-2 md:p-4 bg-[#6556CD] rounded text-white text-sm md:text-base"
  >
    Watch Trailer
  </Link>
</div>

  );
};

export default Header;
