'use client'

import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div
      className={`flex justify-center items-center w-full h-full fixed top-0 left-0 z-40 ${
        show ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-xl transition-all duration-[400ms] ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={hidePopup}
      ></div>
      <div className={`relative w-[800px] aspect-video bg-white transition-transform duration-[250ms] ${show ? "scale-[1]" : "scale-[0.2]"}`}>
        <span
          className="absolute top-[-40px] right-0 text-white cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoPopup;
