/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "next/navigation";

import fetchDataFromApi from "../../../utils/api";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCard from '../../../components/movieCard/MovieCard'
import Spinner from '../../../components/spinner/Spinner'

export default function SearchResult() {

    const router = useParams()
    const url = router.query;
    const urlStr = url.toString().replace("%20", " ")

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${url}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${url}&page=${pageNum}`).then(
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
    setPageNum(1);
    fetchInitialData();
  }, [url]);

  return (
    <div className="min-h-[700px] pt-[100px]">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="text-[24px] leading-[34px] text-white mb-[25px]">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${urlStr}'`}
              </div>
              <InfiniteScroll
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
                style={{display: "flex", gap: '40px', flexFlow: 'row wrap'}}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="text-[24px] text-black-light">
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}
