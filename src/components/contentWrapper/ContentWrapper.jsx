import React from "react";

export default function ContentWrapper ({ children, style })  {
    return <div className={`max-w-1200 mx-auto my-0 px-[20px] py-0 ${style}`}>{children}</div>;
};
