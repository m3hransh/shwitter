import React, { FC } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { translation } from '../lib/translation';

interface TrendElement {
  category: string;
  name: string;
  tweetNumber: number;
}
const trendsItem: TrendElement[] = [
  {
    category: 'تجاری',
    name: 'استارت آپ',
    tweetNumber: 429,
  },
  {
    category: 'آموزشی',
    name: 'دانشگاه بوعلی سینا',
    tweetNumber: 150,
  },
  {
    category: 'تجاری',
    name: 'فروش سهام شوییتر',
    tweetNumber: 200,
  },
  {
    category: 'سیاسی',
    name: 'مذاکرات در چین',
    tweetNumber: 50,
  },
];
interface TrendsItemProps {
  className?: string;
  chidlren?: React.ReactNode;
  trendItem: TrendElement;
}
const TrendsItem: FC<TrendsItemProps> = ({ trendItem }) => {
  return (
    <div className="flex dark:hover:bg-background-500 hover:bg-background-200 p-2">
      <div className="flex flex-col">
        <div className="text-gray-400 text-sm">
          {trendItem.category}
        </div>
        <div className="font-bold">{trendItem.name}</div>
        <div className="text-gray-300 text-sm">
          {trendItem.tweetNumber} شوییت        </div>
      </div>
      <FaEllipsisH className="mr-auto" />
    </div>
  );
};

interface TrendsProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Trends: FC<TrendsProps> = () => {
  // TODO: use context for the language
  const lang = 'ir'
  const elements = translation[lang].trends
  return (
    <div className="dark:bg-background-600 bg-background-100 rounded-2xl dark:text-main-50  flex flex-col overflow-hidden gap-4">
      <div className="flex items-center">
        <div className="text-xl font-bold p-2"> {elements.title}</div>
        <IoSettingsOutline className="w-5 h-5 mr-auto ml-2" />
      </div>
      {trendsItem.map((item: TrendElement, index) => (
        <TrendsItem key={index} trendItem={item} />
      ))}
    </div>
  );
};

export default Trends;
