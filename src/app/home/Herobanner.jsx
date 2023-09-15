/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useFetch from "../../hooks/useFetch";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  
  useEffect(() => {
    const bg =
    url?.backdrop +
    data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  const searchQueryHandler2 = () => {
    if (query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="w-full h-[450px] bg-black flex items-center relative md:h-[700px]">
      {!loading && (
        <div className="w-full h-full absolute top-0 left-0 bg-opacity-50 overflow-hidden">
           <img src={background} alt="" className="w-full h-full object-cover object-center"/>
        </div>
      )}

      <div className="w-full h-[250px] absolute bottom-0 left-0 bg-gradient-to-b from-black/0 to-[#04152d]"></div>
      <ContentWrapper>
        <div className="flex flex-col items-center text-white text-center relative max-w-800 my-0 mx-auto">
          <span className="text-[50px] font-bold mb-10 outline-1 outline-black md:mb-0 md:text-[90px]">
            Welcome
          </span>
          <span className="text-[18px] font-medium mb-[40px] md:text-[24px]">
          Countless movies, TV shows waiting to be explored. Dive in today!
          </span>
          <div className="flex items-center w-full">
            <input
              className="w-[calc(100%_-_100px)] h-[50px] text-black bg-[white] text-sm px-[15px] py-0 rounded-l-[30px] border-0 outline-none md:w-[calc(100%_-_150px)] md:h-[60px] md:text-[20px] md:py-0 md:px-[30px]"
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button className="w-[100px] h-[50px] rounded-r-[30px] bg-gradient-to-r from-orange to-pink cursor-pointer md:w-[150px] md:h-[60px] md:text-[18px]" onClick={searchQueryHandler2}>
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
