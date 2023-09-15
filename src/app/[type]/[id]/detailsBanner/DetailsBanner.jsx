"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../hooks/useFetch";
import Genres from "../../../../components/genres/Genres";
import CircleRating from "../../../../components/circleRating/CircleRating";
import PosterFallback from "public/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../../components/videoPopup/VideoPopup";

export default function DetailsBanner({ video, crew }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const urlSrc = useParams();
  const mediaType = urlSrc.type;
  const id = urlSrc.id;
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="w-full bg-black pt-[10px] mb-[50px] md:mb-0 md:pt-[120px] min-h-[700px]">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="w-full h-full absolute top-0 left-0 opacity-[0.1] overflow-hidden">
                <img
                  src={url.backdrop + data.backdrop_path}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="w-full h-[250px] bg-gradient-to-b from-black/0 to-[#04152d] absolute bottom-0 left-0"></div>
              <ContentWrapper>
                <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                  <div className="shrink-0">
                    {data.poster_path ? (
                      <img
                        className="w-full block rounded-[12px] md:max-w-[350px]"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <img
                        className="w-full block rounded-[12px] md:max-w-[350px]"
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  <div className="text-white">
                    <div className="text-[28px] leading-[40px] font-semibold md:text-[34px] md:leading-[44px]">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="text-[16px] leading-[24px] mb-[10px] italic opacity-[0.5] md:text-[20px] md:leading-[28px]">
                      {data.tagline}
                    </div>

                    <Genres
                      data={_genres}
                      styles={
                        "flex gap-[5px] self-end relative mb-[10px] z-10 md:flex md:mb-[20px] md:jusfity-end"
                      }
                    />

                    <div className="flex items-center gap-[25px] mb-[25px]">
                      <CircleRating
                        rating={data.vote_average?.toFixed(1)}
                        style={
                          "max-w-[60px] bg-black2 rounded-[50%] md:max-w-[60px]"
                        }
                        textStyle={"white"}
                      />
                      <div
                        className="flex items-center gap-[20px] cursor-pointer svg [&>svg]:w-[60px]"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text-[20px] transition-all duration-[0.7s] ease-in-out hover:text-pink">
                          Watch Trailer
                        </span>
                      </div>
                    </div>

                    <div className="mb-[25px]">
                      <div className="text-[24px] mb-[5px] font-semibold">
                        Overview
                      </div>
                      <div className="leading-[24px] font-medium md:pr-[100px]">
                        {data.overview}
                      </div>
                    </div>

                    <div className="border-b-[1px] border-solid border-[#ffffff31] py-[15px] px-0 flex">
                      {data.status && (
                        <div className="mr-[10px] flex flex-row flex-wrap">
                          <span className="mr-[10px] leading-[24px] font-semibold">
                            Status:{" "}
                          </span>
                          <span className="mr-[10px] opacity-70 leading-[24px]">
                            {data.status}
                          </span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="mr-[10px] flex flex-row flex-wrap">
                          <span className="mr-[10px] leading-[24px] font-semibold">
                            Release Date:{" "}
                          </span>
                          <span className="mr-[10px] opacity-70 leading-[24px]">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="mr-[10px] flex flex-row flex-wrap">
                          <span className="mr-[10px] leading-[24px] font-semibold">
                            Runtime:{" "}
                          </span>
                          <span className="mr-[10px] opacity-70 leading-[24px]">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="border-b-[1px] border-solid border-[#ffffff31] py-[15px] px-0 flex">
                        <span className="mr-[10px] text-white leading-[24px] font-semibold">
                          Director:{" "}
                        </span>
                        <span className="mr-[10px] opacity-70 leading-[24px]">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="border-b-[1px] border-solid border-[#ffffff31] py-[15px] px-0 flex">
                        <span className="mr-[10px] text-white leading-[24px] font-semibold">
                          Writer:{" "}
                        </span>
                        <span className="mr-[10px] opacity-70 leading-[24px]">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="border-b-[1px] border-solid border-[#ffffff31]">
                        <span className="mr-[10px] leading-[24px] font-semibold">
                          Creator:{" "}
                        </span>
                        <span className="mr-[10px] opacity-70 leading-[24px]">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
          <ContentWrapper
            style={"flex  flex-col gap-[50px] min-w-[80%] md:flex-row"}
          >
            <div className="shrink-0 w-full block rounded-[12px] aspect-[1/1.5] md:max-w-[350px] skeleton"></div>
            <div className="w-full flex flex-col gap-8">
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px] [&>*:nth-child(2)]:w-[75%] [&>*:nth-child(3)]:mb-[50px] [&>*:nth-child(5)]:w-[50%] [&>*:nth-child(5)]:mb-[50px] skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}
