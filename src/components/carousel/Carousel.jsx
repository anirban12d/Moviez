"use client";

import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Image from "next/image";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "/public/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import CarouselSKL from "../../components/skeletonLoaders/carouselSkeleton";

export default function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useRouter();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-[50px]">
      <ContentWrapper style={"relative"}>
        {title && (
          <div className="text-[24px] text-white mb-[20px] font-normal">
            {title}
          </div>
        )}
        {!loading ? (
          <>
            <BsFillArrowLeftCircleFill
              className="left-[30px] text-[30px] text-white absolute top-[30%] translate-y-[50%] cursor-pointer opacity-70 z-10 md:block hover:opacity-90"
              onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
              className="right-[30px] text-[30px] text-white absolute top-[30%] translate-y-[50%] cursor-pointer opacity-70 z-10 md:block hover:opacity-90"
              onClick={() => navigation("right")}
            />
          </>
        ) : null}

        {!loading ? (
          <div
            className="flex gap-[30px] overflow-y-hidden mr-[-20px] ml-[-20px] py-0 px-[20px] md:gap-[40px] md:overflow-hidden md:m-0 md:p-0"
            ref={carouselContainer}
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer flex-shrink-0 md:w-[calc(25%_-_15px)] lg:w-[calc(20%_-_16px)]"
                  onClick={() =>
                    navigate.push(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-start p-[10px] hover:opacity-[0.6] transition-all ease-in duration-200">
                    {item.poster_path ? (
                      <Image
                        src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : PosterFallback}
                        alt="lol"
                        fill={true}
                        unoptimized={true}
                        className={
                          "absolute top-0 left-0 w-full h-full rounded-[12px] overflow-hidden object-cover object-center"
                        }
                      />
                    ) : (
                      <Image
                        src={PosterFallback}
                        alt="lol"
                        fill={true}
                        className={
                          "absolute top-0 left-0 w-full h-full rounded-[12px] overflow-hidden object-cover object-center"
                        }
                      />
                    )}
                    <div className="flex justify-between w-full flex-grow-0">
                      <CircleRating
                        rating={item.vote_average.toFixed(1)}
                        style={
                          "w-[40px] h-[40px] relative rounded-[50%] top-[20px] z-30 left-[5px] bg-white flex-shrink-0 md:w-[50px] md:h-[50px]"
                        }
                      />
                      <Genres
                        data={item.genre_ids.slice(0, 2)}
                        styles={
                          "hidden gap-[5px] self-end relative z-10 md:flex md:jusfity-end"
                        }
                      />
                    </div>
                  </div>
                  <div className="text-white flex flex-col">
                    <span className="text-[16px] mb-[10px] leading-[24px] overflow-hidden truncate md:text-[20px]">
                      {item.title || item.name}
                    </span>
                    <span className="text-[14px] opacity-50">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-[10px] overflow-y-hidden mx-[-20px] px-[20px] py-0 md:m-0 md:p-0 md:overflow-hidden md:gap-[20px]">
            <CarouselSKL />
            <CarouselSKL />
            <CarouselSKL />
            <CarouselSKL />
            <CarouselSKL />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}
