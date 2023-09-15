'use client';

import React, { useState } from "react";

export default function SwitchTabs({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="h-[34px] bg-white rounded-[30px] p-[2px]">
      <div className="flex items-center h-[33px] relative">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`h-full flex items-center justify-center w-[100px] text-black text-[14px] relative z-10 cursor-pointer ease-in ${
              selectedTab === index ? "text-white" : ""
            }`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="h-[30px] w-[100px] rounded-[15px] bg-gradient-to-r from-orange to-pink absolute left-0 transition-all"
          style={{ left }}
        />
      </div>
    </div>
  );
}
