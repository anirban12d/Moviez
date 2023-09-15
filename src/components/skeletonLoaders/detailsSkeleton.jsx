'use client';

export default function DetailsSkeleton() {
    return(
        <div className="w-[150px] shrink-0 md:w-[25%]">
        <div className="w-full aspect-video rounded-[12px] mb-[10px] skeleton"></div>
        <div className="h-[20px] w-full rounded-[10px] mb-[10px] skeleton"></div>
        <div className="h-[20px] w-[75%] rounded-[10px] skeleton"></div>
      </div>
    )
}