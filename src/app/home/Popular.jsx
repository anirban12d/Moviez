/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";

import Carousel from "../../components/carousel/Carousel";
import SwitchTabs from "../../components/switchTabs/SwitchTabs";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import useFetch from "../../hooks/useFetch";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper style={"flex items-center justify-between mb-[20px]"}>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
