import React from 'react';

export default function CustomHeading({ first_title, second_title , first_title_class , second_title_class , font_size=50 }) {
  return (
    <div className="">
      <h2 className={`!text-[${font_size}px] flex gap-2 !font-bold`}>
        <span className={`text-[color:var(--main-dark-color)] ${first_title_class}`}>{first_title}</span>
        <span className={`text-[color:var(--main-light-color)] relative inline-block ${second_title_class}`}>
          {second_title}
          <span className="absolute left-0 bottom-[-6px] w-full h-[10px] pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0,15 Q50,0 100,15"
                stroke="#EB1C24"
                strokeWidth="4"
                fill="transparent"
              />
            </svg>
          </span>
        </span>
      </h2>
    </div>
  );
}
