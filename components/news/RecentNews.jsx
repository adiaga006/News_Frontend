"use client"; // This marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import Title from '../Title';
import NewsCard from './items/NewsCard';
import { base_api_url } from '../../config/config';

const RecentNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/recent/news`, {
          next: {
            revalidate: 1,
          },
        });
        const data = await res.json();
        setNews(data.news);
      } catch (error) {
        console.error('Failed to fetch recent news', error);
      }
    };

    fetchRecentNews();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
      <div className="pl-4">
        <Title title="Recent news" />
      </div>
      <div className="grid grid-cols-1 gap-y-3">
        {news && news.length > 0 ? (
          news.map((item, i) => <NewsCard key={i} item={item} />)
        ) : (
          <p>No recent news available</p>
        )}
      </div>
    </div>
  );
};

export default RecentNews;