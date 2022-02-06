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
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
];
interface TrendsItemProps {
  className?: string;
  chidlren?: React.ReactNode;
  trendItem: TrendElement;
}
const TrendsItem: FC<TrendsItemProps> = ({ trendItem }) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="text-gray-400 text-sm">
          {trendItem.category} Trending
        </div>
        <div className="font-bold">{trendItem.name}</div>
        <div className="text-gray-300 text-sm">
          {trendItem.tweetNumber} Tweets
        </div>
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
    <div className="bg-background-600 rounded-2xl text-main-50 px-4 py-2 flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-xl font-bold"> {elements.title}</div>
        <IoSettingsOutline className="w-5 h-5 mr-auto ml-2" />
      </div>
      {trendsItem.map((item: TrendElement, index) => (
        <TrendsItem key={index} trendItem={item} />
      ))}
    </div>
  );
};

export default Trends;
