'use client';

export default function CarouselSKL () {
    return (
    <div className="w-[125px] md:w-[calc(20%_-_15px)] shrink-0">
        <div className="rounded-[12px] w-full mb-[15px] aspect-[1/1.5] skeleton after:skeleton1"></div>
        <div className="flex flex-col">
          <div className="w-full h-[20px] rounded-[12px] mb-[10px] skeleton"></div>
          <div className="w-[75%] h-[20px] rounded-[12px] skeleton"></div>
        </div>
      </div>
    )
}
