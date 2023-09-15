/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../../../hooks/useFetch";
import fetchDataFromApi from "../../../utils/api";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../../components/movieCard/MovieCard";
import Spinner from "../../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

export default function Explore() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const urlSrc = useParams();
  const mediaType = urlSrc.query;

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="min-h-[700px] pt-[100px]">
      <ContentWrapper>
        <div className="flex justify-between mb=[25px] flex-col md:flex-row">
          <div className="text-[24px] leading-[34px] text-white mb-[20px] md:mb-[30px]">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="flex gap-[10px] flex-col md:flex-row z-30">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="w-full md:max-w-[500px] md:min-w-[250px]"
              classNamePrefix="react-select"
              styles={{
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                  marginLeft: "10px",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: "0",
                  outline: "0",
                  color: "white",
                  backgroundColor: "#173d77",
                  borderRadius: "20px",
                }),
                inputContainer: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                  margin: "0 10px",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                }),
                multiValue: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#020c1b",
                  borderRadius: "10px",
                }),
                multiValueLabel: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                }),
                multiValueRemove: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "transparent",
                  color: "white",
                  cursor: "pointer",
                }),
              }}
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="w-full flex-shrink-0 md:w-[250px] mb-[30px]"
              styles={{
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                  marginLeft: "10px",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: "0",
                  outline: "0",
                  color: "white",
                  backgroundColor: "#173d77",
                  borderRadius: "20px",
                }),
                inputContainer: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                  margin: "0 10px",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                }),
                multiValue: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#020c1b",
                  borderRadius: "10px",
                }),
                multiValueLabel: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                }),
                multiValueRemove: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "transparent",
                  color: "white",
                  cursor: "pointer",
                }),
              }}
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="flex flex-row flex-wrap gap-[37px] md:gap-[calc(7%_-_5px)]"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      mediaType={mediaType}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="text-[24px] text-black-light">
                Sorry, Results not found!
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
}
