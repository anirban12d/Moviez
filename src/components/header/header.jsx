"use client";

import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../../public/moviez-logo.svg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const [show, setShow] = useState("bg-black/[.25] backdrop-blur-[3.5px]");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useRouter();
  const location = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("translate-y-[-60px]");
      } else {
        setShow("bg-black3");
      }
    } else {
      setShow("bg-black/[.25] backdrop-blur-[3.5px]");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate.push(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const searchQueryHandler2 = () => {
    if (query.length > 0) {
      navigate.push(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate.push("/explore/movie");
    } else {
      navigate.push("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header
      className={`fixed translate-y-0 w-full h-[60px] z-50 flex items-center transition-all ease-in  ${
        mobileMenu ? "bg-black3" : "bg-black/[.25]"
      } ${show}`}
    >
      <ContentWrapper style={"flex items-center justify-between w-full"}>
        <div className="cursor-pointer" onClick={() => navigate.push("/")}>
          <Image
            src={logo}
            alt=""
            className="w-[150px]"
            width={"auto"}
            height={"auto"}
          />
        </div>
        <ul
          className={` ${
            mobileMenu
              ? "flex absolute top-[60px] left-0 bg-black3 flex-col w-full py-[20px] px-0 border-t-[1px] to-white/[.1] animate-mobileView"
              : "hidden items-center list-none md:flex"
          } `}
        >
          <li
            className={`h-[60px] flex items-center my-0 mx-[15px] text-white font-medium relative cursor-pointer hover:text-pink ${
              mobileMenu
                ? "text-[20px] w-full h-auto py-[15px] px-[20px] m-0 flex flex-col items-start last:hidden"
                : ""
            }`}
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li
            className={`h-[60px] flex items-center my-0 mx-[15px] text-white font-medium relative cursor-pointer hover:text-pink ${
              mobileMenu
                ? "text-[20px] w-full h-auto py-[15px] px-[20px] m-0 flex flex-col items-start last:hidden"
                : ""
            }`}
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li
            className={`h-[60px] flex items-center my-0 mx-[15px] text-[18px] text-white font-medium relative cursor-pointer hover:text-pink ${
              mobileMenu ? "hidden" : ""
            }`}
          >
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="flex items-center gap-[20px] text-white font-[18px] md:hidden">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="w-full h-[60px] absolute top-[60px] animate-mobileView">
          <ContentWrapper style={"mx-auto"}>
            <div className="flex items-center h-[50px] bg-white mt-[10px] w-full md:rounded-[30px] md:h-[60px]">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                className="w-full h-[50px] bg-white outline-none border-none rounded-l-[30px] py-0 px-[15px] text-[14px] md:h-[60px] md:text-[20px] md:py-0 md:px-[30px]"
              />
              <BsSearch
                className="text-[20px] shrink-0 ml-[10px] mr-[20px] cursor-pointer"
                onClick={searchQueryHandler2}
              />
              <VscChromeClose
                className="text-[20px] shrink-0 ml-[10px] mr-[20px] cursor-pointer"
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}
