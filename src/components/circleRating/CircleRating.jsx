import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircleRating({ rating, style, textStyle })  {
    return (
        <div className={style}>
            <CircularProgressbar
            className={`text-[34px] font-bold fill-black + " " + ${textStyle}`}
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                        textSize: "34px",
                        textColor: `${textStyle}`,
                        trailColor: 'transparent'
                })}
            />
        </div>
    );
};

;
