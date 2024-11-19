/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";
import HorizontalCards from "./partials/HorizontalCards";
import { asyncLoadPerson } from "../store/actions/personActios";
import { removePerson } from "../store/reducers/personSlice";

const PersonDetails = () => {

    document.title = "Wikiwatch | Person Details";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [category, setcategory] = useState("movie");

    useEffect(() => {
        dispatch(asyncLoadPerson(id));
        return () => {
            dispatch(removePerson());
        };
    }, [id]);

    return info ? (
        <div className="px-[5%] md:px-[10%] w-full md:w-screen h-auto md:h-[150vh] bg-[#1F1E24]">
            {/* Part 1 navigation */}
            <nav className="h-[8vh] md:h-[10vh] w-full text-zinc-100 flex items-center gap-5 md:gap-10 text-lg md:text-xl ">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
            </nav>

            <div className="w-full flex flex-col md:flex-row mt-5 ">
                {/* Part 2 left Poster and Details */}
                <div className="w-full md:w-[25%] lg:w-[20%] ">
                    <img
                        className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[25vh] md:h-[35vh] object-cover mx-auto"
                        src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                        alt=""
                    />
                    <hr className="mt-5 md:mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
                    {/* Sosial Media Links */}
                    <div className="text-xl md:text-2xl text-white flex gap-x-5 justify-center">
                        <a
                            target="_blank"
                            href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
                        >
                            <i className="ri-earth-fill"></i>
                        </a>

                        <a
                            target="_blank"
                            href={`https://www.facebook.com/${info.externalId.facebook_id}`}
                        >
                            <i className="ri-facebook-circle-fill"></i>
                        </a>

                        <a
                            target="_blank"
                            href={`https://www.instagram.com/${info.externalId.instagram_id}`}
                        >
                            <i className="ri-instagram-fill"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${info.externalId.twitter_id}`}
                        >
                            <i className="ri-twitter-x-fill"></i>
                        </a>
                    </div>
                    {/* Personal Information */}
                    <div className="mt-5 text-center md:text-left">
                        <h1 className="text-2xl text-zinc-400 font-semibold my-5">
                            Person Info
                        </h1>
                        <div className="text-lg text-zinc-400">
                            <h1 className="text-lg text-zinc-400 font-semibold ">
                                Known For
                            </h1>
                            <h1 className=" text-zinc-400 ">
                                {info.detail.known_for_department}
                            </h1>

                            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                                Gender
                            </h1>
                            <h1 className=" text-zinc-400 ">
                                {info.detail.gender === 2 ? "Male" : "Female"}
                            </h1>

                            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                                Birthday
                            </h1>
                            <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

                            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                                Deathday
                            </h1>
                            <h1 className=" text-zinc-400 ">
                                {info.detail.deathday
                                    ? info.detail.deathday
                                    : "Still Alive"}
                            </h1>

                            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                                Place Of Birth
                            </h1>
                            <h1 className=" text-zinc-400 ">
                                {info.detail.place_of_birth}
                            </h1>

                            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                                Also Known As
                            </h1>
                            <h1 className=" text-zinc-400 ">
                                {info.detail.also_known_as.join(", ")}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Part 3 right Details and information  */}
                <div className="w-full md:w-[70%] lg:w-[75%] ml-0 md:ml-[5%] mt-5 md:mt-0">
                    <h1 className="text-4xl md:text-6xl text-zinc-400 font-black my-5 text-center md:text-left">
                        {info.detail.name}
                    </h1>

                    <h1 className="text-lg md:text-xl text-zinc-400 font-semibold ">
                        Biography
                    </h1>
                    <p className="text-zinc-400 mt-3 ">
                        {info.detail.biography}
                    </p>

                    <h1 className="mt-5 text-lg md:text-xl text-zinc-400 font-semibold ">
                        Known For
                    </h1>
                    <HorizontalCards data={info.combinedCredits.cast} />

                    <div className="w-full flex justify-between items-center mt-5">
                        <h1 className="text-lg md:text-xl text-zinc-400 font-semibold ">
                            Acting
                        </h1>

                        <Dropdown
                            title="Catgory"
                            options={["tv", "movie"]}
                            handleDropdown={(e) => setcategory(e.target.value)}
                        />
                    </div>

                    <div className="list-disc text-zinc-400 w-full h-[30vh] md:h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 mb-10">
                        {info[category + "Credits"].cast.map((c, i) => (
                            <li
                                key={i}
                                className="hover:text-white p-5 rounded hover:bg-[#19191d]  duration-300 cursor-pointer"
                            >
                                <Link
                                    to={`/${category}/details/${c.id}`}
                                    className=""
                                >
                                    <span>
                                        {" "}
                                        {c.name ||
                                            c.title ||
                                            c.original_name ||
                                            c.original_title}
                                    </span>

                                    <span className="block ml-5 mt-2">
                                        {c.character &&
                                            `Character Name:  ${c.character}`}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : <Loading />
}

export default PersonDetails;