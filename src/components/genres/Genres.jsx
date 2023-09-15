import React from "react";
import { useSelector } from "react-redux";


export default function Genres ({ data, styles }) {
    const { genres } = useSelector((state) => state.home);

    return (
        <div className={styles}>
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="bg-pink py-[3px] px-[5px] text-[12px] rounded-[4px] text-white whitespace-nowrap">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};


