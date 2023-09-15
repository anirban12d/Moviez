/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import avatar from "/public/avatar.png";
import CastLoader from '../../../../components/skeletonLoaders/castLoader'

export default function Cast({ data, loading }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);

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
    <div className="relative mb-[50px]">
      <ContentWrapper style={"relative"}>
        {!loading ? (
          <>
            <BsFillArrowLeftCircleFill
              className="left-[30px] text-[30px] text-white absolute top-[40%] translate-y-[50%] cursor-pointer opacity-70 z-10 md:block hover:opacity-90"
              onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
              className="right-[30px] text-[30px] text-white absolute top-[40%] translate-y-[50%] cursor-pointer opacity-70 z-10 md:block hover:opacity-90"
              onClick={() => navigation("right")}
            />
          </>
        ) : null}

        <div className="text-[24px] text-white mb-[25px]">Top Cast</div>
        {!loading ? (
          <div
            className="flex gap-[20px] overflow-y-hidden mr-[-20px] ml-[-20px] px-[20px] py-0 md:m-0 md:p-0"
            ref={carouselContainer}
          >
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={item.id} className="text-center text-white">
                  <div className="w-[125px] h-[125px] rounded-[50%] overflow-hidden mb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px]">
                    <img
                      src={imgUrl}
                      className="w-full h-full object-cover object-center block"
                      alt=""
                    />
                  </div>
                  <div className="text-[14px] leading-[20px] font-semibold md:text-[18px] md:leading-[24px]">
                    {item.name}
                  </div>
                  <div className="text-[14px] leading-[20px] opacity-50 md:text-[16px] md:leading-[24px]">
                    {item.character}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-[20px] overflow-y-hidden mx-[-20px] md:m-0 md:p-0">
            <CastLoader/>
            <CastLoader/>
            <CastLoader/>
            <CastLoader/>
            <CastLoader/>
            <CastLoader/>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}
