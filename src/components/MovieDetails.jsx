import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const MovieDetails = () => {
    document.title = "Wikiwatch | Movie Details";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { info } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(asyncLoadMovie(id));
        return () => {
            dispatch(removeMovie());
        };
    }, [id])

    return info ? (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.9), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="relative w-screen h-auto min-h-[160vh] px-5 md:px-[10%] py-5"
        >
            {/* Part 1 navigation */}
            <nav className="h-[8vh] md:h-[10vh] w-full text-zinc-100 flex items-center gap-5 md:gap-10 text-base md:text-xl ">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
                <a target="_blank" href={info.detail.homepage}>
                    <i className="ri-external-link-fill"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
                >
                    <i className="ri-earth-fill"></i>
                </a>

                <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
                >
                    imdb
                </a>
            </nav>

            {/* Part 2 Poster and details */}
            <div className="w-full flex flex-col md:flex-row">
                <img
                    className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] md:h-[50vh] object-cover rounded"
                    src={`https://image.tmdb.org/t/p/original/${
                        info.detail.poster_path || info.detail.backdrop_path
                    }`}
                    alt=""
                />

                <div className="content mt-5 md:mt-0 md:ml-[5%] text-white w-full md:w-[100%]">
                    <h1 className="text-3xl md:text-5xl font-black ">
                        {info.detail.name ||
                            info.detail.title ||
                            info.detail.original_name ||
                            info.detail.original_title}

                        <small className="text-2xl font-bold text-zinc-200">
                            ({info.detail.release_date.split("-")[0]})
                        </small>
                    </h1>

                    <div className="mt-3 mb-5 flex flex-col md:flex-row items-start md:items-center gap-y-3 md:gap-x-3">
                        <span className="rounded-full text-lg md:text-xl font-semibold bg-yellow-600 text-white w-[4vh] md:w-[5vh] h-[4vh] md:h-[5vh] flex justify-center items-center">
                            {(info.detail.vote_average * 10).toFixed()}{" "}
                            <sup>%</sup>
                        </span>
                        <h1 className="w-[60px] text-lg md:text-2xl font-semibold leading-6">
                            User Score
                        </h1>
                        <h1>{info.detail.release_date}</h1>
                        <h1>
                            {info.detail.genres.map((g) => g.name).join(",")}
                        </h1>
                        <h1>{info.detail.runtime}min</h1>
                    </div>

                    <h1 className="text-lg md:text-xl font-semibold italic text-zinc-200">
                        {info.detail.tagline}
                    </h1>

                    <h1 className="text-xl md:text-2xl mb-3 mt-5">Overview</h1>
                    <p>{info.detail.overview}</p>

                    <h1 className="text-xl md:text-2xl mb-3 mt-5">Movie Translated</h1>
                    <p className="mb-10">{info.translations.join(", ")}</p>

                    <Link
                        className="p-3 md:p-5 bg-[#6556CD] rounded-lg"
                        to={`${pathname}/trailer`}
                    >
                        <i className="text-lg md:text-xl ri-play-fill mr-2 md:mr-3 "></i>
                        Play Trailer
                    </Link>
                </div>
            </div>

            {/* Part 3 Available on Platform */}
            <div className="w-full md:w-[80%] flex flex-col gap-y-5 mt-10">
                {info.watchProviders && info.watchProviders.flatrate && (
                    <div className="flex flex-wrap gap-x-5 md:gap-x-10 items-center text-white">
                        <h1>Available on Platfotms</h1>
                        {info.watchProviders.flatrate.map((w, i) => (
                            <img
                                key={i}
                                title={w.provider_name}
                                className="w-[4vh] md:w-[5vh] h-[4vh] md:h-[5vh] object-cover rounded-md"
                                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                alt=""
                            />
                        ))}
                    </div>
                )}

                {info.watchProviders && info.watchProviders.rent && (
                    <div className="flex flex-wrap gap-x-5 md:gap-x-10 items-center text-white">
                        <h1>Available on Rent</h1>
                        {info.watchProviders.rent.map((w, i) => (
                            <img
                                key={i}
                                title={w.provider_name}
                                className="w-[4vh] md:w-[5vh] h-[4vh] md:h-[5vh] object-cover rounded-md"
                                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                alt=""
                            />
                        ))}
                    </div>
                )}

                {info.watchProviders && info.watchProviders.buy && (
                    <div className="flex flex-wrap gap-x-5 md:gap-x-10 items-center text-white">
                        <h1>Available to Buy</h1>
                        {info.watchProviders.buy.map((w, i) => (
                            <img
                                key={i}
                                title={w.provider_name}
                                className="w-[4vh] md:w-[5vh] h-[4vh] md:h-[5vh] object-cover rounded-md"
                                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                alt=""
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Part 4 Recommendations and Similar Stuff */}
            <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
            <h1 className=" text-2xl md:text-3xl font-bold text-white">
                Recommendations & Similar stuff
            </h1>
            <HorizontalCards
                title="movie"
                data={
                    info.recommendations.length > 0
                        ? info.recommendations
                        : info.similar
                }
            />
            <Outlet />
        </div>
    ) : <Loading />
}

export default MovieDetails;