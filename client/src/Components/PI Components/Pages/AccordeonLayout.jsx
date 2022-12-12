import React from 'react';

import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

const AccordionLayout = ({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const handleSetIndex = (index) =>
    activeIndex !== index && setActiveIndex(index);

  return (
    <>
      <div
        onClick={() => handleSetIndex(index)}
        className="flex w-3/4 justify-between p-2 mt-2   bg-white border-b-2 border-slate-400"
      >
        <div className="flex">
          <div className="text-slate-800 font-bold">{title}</div>
        </div>
        <div className="flex items-center justify-center">
          {activeIndex === index ? (
            <BsFillArrowDownCircleFill className="w-8 h-8 fill-main  " />
          ) : (
            <BsFillArrowUpCircleFill className="w-8 h-8 text-main fill-slate-500" />
          )}
        </div>
      </div>

      {activeIndex === index && (
        <div className="shadow-3xl rounded-lg shadow-cyan-500/50 p-4  w-3/4 font-mono text-base">
          {children}
        </div>
      )}
    </>
  );
};

export default AccordionLayout;
