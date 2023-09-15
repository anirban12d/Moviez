"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../../components/videoPopup/VideoPopup";
import { PlayIcon } from "../Playbtn";
import DetailsSkeleton from "../../../../components/skeletonLoaders/detailsSkeleton";
import Image from "next/image";

export default function VideosSection({ data, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const carouselContainer = useRef();
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

  const LoadingSkeleton = () => {
    return (
      <div className="w-[150px] shrink-0 md:w-[25%]">
        <div className="w-full aspect-video rounded-[12px] mb-[10px] skeleton"></div>
        <div className="h-[20px] w-full rounded-[10px] mb-[10px] skeleton"></div>
        <div className="h-[20px] w-[75%] rounded-[10px] skeleton"></div>
      </div>
    );
  };

  return (
    <div className="relative mb-[50px]">
      <ContentWrapper style={"relative"}>
        {!loading ? (
          <>
            <BsFillArrowLeftCircleFill
              className="left-[30px] text-[30px] text-white absolute top-[45%] translate-y-[50%] cursor-pointer opacity-70 z-10 md:block hover:opacity-90"
              onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
              className="right-[30px] text-[30px] text-white absolute top-[45%] translate-y-[50%] cursor-pointer opacity-70 z-10 md:block hover:opacity-90"
              onClick={() => navigation("right")}
            />
          </>
        ) : <></>}
        <div className="text-[24px] text-white mb-[25px]">Official Videos</div>
        {!loading ? (
          <div
            className="flex gap-[10px] overflow-x-auto mr-[-20px] ml-[-20px] px-[20px] py-0 md:gap-[20px] md:m-0 md:p-0"
            ref={carouselContainer}
          >
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="w-[150px] cursor-pointer shrink-0 md:w-[25%]"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="mb-[15px] relative svg1">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    className="w-full block rounded-[12px] transition-all duration-[0.7s] ease-in-out"
                    alt=""
                  />
                  <PlayIcon />
                </div>
                <div className="text-white text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">
                  {video.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
            {/* <DetailsSkeleton />
            <DetailsSkeleton />
            <DetailsSkeleton />
            <DetailsSkeleton /> */}
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}
