import React, { FC, useRef, FocusEvent } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { translation } from '../lib/translation';

interface SearchBoxProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const SearchBox: FC<SearchBoxProps> = () => {
  // TODO: use context for the language
  const lang = 'ir'
  const box = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLDivElement>(null);

  const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    box.current?.classList.replace('border-transparent', 'border-primary-600');
    box.current?.classList.replace('bg-gray-200', 'bg-background-400');
    icon.current?.classList.add('text-primary-800');
  };
  const handleBlurEvent = (e: FocusEvent<HTMLInputElement>) => {
    // box.current?.classList.remove('border-primary');
    // box.current?.classList.add('border-accent');
    box.current?.classList.replace('border-primary-600', 'border-transparent');
    box.current?.classList.replace('bg-background-400', 'bg-gray-200');
    icon.current?.classList.remove('text-primary-800');
  };
  return (
    <div
      ref={box}
      className="bg-gray-200 border-2  border-transparent-100 rounded-3xl flex items-center "
    >
      <div ref={icon}>
        <IoSearchOutline className="w-6 h-6 mx-4 my-3" />
      </div>
      <input
        className="bg-transparent placeholder-gray-700 text-right border-0 flex-grow rounded-none"
        type="text"
        name="search"
        id="search"
        placeholder={translation[lang].searchBox.search}
        onFocus={handleFocusEvent}
        onBlur={handleBlurEvent}
      />
    </div>
  );
};

export default SearchBox;
