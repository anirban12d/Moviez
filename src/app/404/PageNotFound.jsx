import React from "react";

import ContentWrapper from '../../components/contentWrapper/ContentWrapper'

export default function PageNotFound () {
    return (
        <div className="h-[700px] pt-[200px]">
            <ContentWrapper style={"text-center text-black-light flex flex-col"}>
                <span className="text-[150px] font-bold">404</span>
                <span className="text-[44px]">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};
