import React, { FC } from 'react';
import { IoPersonCircleOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { useAuth } from './Auth';

interface LogoutProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Logout: FC<LogoutProps> = ({ className }) => {
  const {user} = useAuth()



  return (
    <>
      <div className={className}>
        <div className="relative flex align-middle w-full">
          <button
            className="flex flex-row hover:bg-background-200 rounded-full p-2 items-center w-full justify-start"
          >
            {/* {data?.me.profile && data?.me.profile.avatar ? ( */}
            {/*   <img */}
            {/*     src={data.me.profile.avatar} */}
            {/*     className="max-h-10 rounded-full" */}
            {/*     alt="avatar" */}
            {/*   /> */}
            {/* ) : ( */}
            <div>

              <IoPersonCircleOutline className="inline w-14 h-14" />
            {/* )} */}
            <h3 className="font-bold hidden lg:inline">{user.name}</h3>
            </div>
              <div className="mr-auto">

            <IoEllipsisHorizontalOutline className="hidden text-2xl lg:inline" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
