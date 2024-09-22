import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden p-3 mb-2">
      {data.map((data, index) => (
        <Link to={`/${data.media_type}/details/${data.id}`} key={index} className="min-w-[180px] bg-zinc-900 mr-5 mb-5">
          <img
            className=" h-[45%] object-cover rounded"
            src={`https://image.tmdb.org/t/p/original/${
              data.backdrop_path || data.profile_path
            }`}
            alt=""
          />
          <div className="text-white p-3 h-[55%]">
            <h1 className="text-lg font-semibold">
              {data.name && data.name.slice(0, 30) ||
                data.title ||
                data.original_name ||
                data.original_title}
            </h1>
            <p className="text-sm mb-3 text-white mt-3">
              {data.overview.slice(0, 50)} ...
              <span className="text-zinc-500">more</span>{" "}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
