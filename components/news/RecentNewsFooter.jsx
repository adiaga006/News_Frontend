"use client"; // This tells Next.js to treat the component as a client component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { base_api_url } from '../../config/config';

const RecentNewsFooter = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/recent/news`);
        const data = await res.json();
        setNews(data.news);
      } catch (error) {
        console.error("Error fetching recent news:", error);
      }
    };

    fetchRecentNews();
  }, []); // Empty dependency array means it runs once on component mount

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
        Recent news
      </div>
      <div className="grid grid-cols-1 gap-y-4 pt-3">
        {news && news.length > 0 && news.slice(0, 4).map((r, i) => (
          <Link key={i} href={`/news/${r.slug}`} className="flex w-full">
            <div className="group relative overflow-hidden w-[90px] h-[75px]">
              <div className="w-[90px] h-[75px] block group-hover:scale-[1.1] transition-all duration-[1s]">
                <Image
                  className=""
                  layout="fill"
                  src={r.image}
                  alt="images"
                />
                <div
                  className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"
                ></div>
              </div>
            </div>
            <div className="w-[calc(100%-90px)] pl-2">
              <div className="flex flex-col gap-y-1">
                <h2 className="text-sm font-semibold text-white hover:text-[#c80000]">
                  {r.title}
                </h2>
                <div className="flex gap-x-2 text-xs font-normal text-white">
                  <span>{r.date}</span>
                  <span>{r.writerName}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentNewsFooter;
