import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "/public/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const navigate = useRouter()

    const { url } = useSelector((state) => state.home);

    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="w-[calc(45%_-_12px)] mb-[25px] cursor-pointer shrink-0 md:w-[calc(30%_-_20px)]"
            onClick={() =>
                navigate.push(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] transition-all ease-in duration-200 hover:opacity-[0.6]">
                <img className="absolute top-0 left-0 w-full h-full rounded-[12px] overflow-hidden object-cover object-center" src={posterUrl} />
                {fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} style={"w-[40px] h-[40px] relative rounded-[50%] top-[20px] z-10 left-0 bg-white flex-shrink-0 md:w-[50px] md:h-[50px]"} />
                        <Genres data={data.genre_ids.slice(0, 2)} styles={'hidden gap-[5px] self-end relative z-10 md:flex md:jusfity-end'} />
                    </React.Fragment>
                )}
            </div>
            <div className="text-white flex flex-col">
                <span className="text-[16px] mb-[10px] leading-[24px] truncate md:text-[20px]">{data.title || data.name}</span>
                <span className="text-[14px] opacity-[0.5]">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
