import React from "react";

export default function ToursContentDescription({list_data}) {
  return (
    <div data-aos="fade-up-right" className="flex flex-col gap-2">
      <h2
        data-aos="fade-up"
        data-aos-delay={100}
        className="italic lg:!text-base !text-[#264787] 2xl:!text-[23px]"
      >
        Overview
      </h2>
      <div className="">
        <p
          data-aos="fade-up"
          data-aos-delay={200}
          className="!text-[#505050] font-normal p-0 m-0 !text-base 2xl:text-xl"
        >
          Taif Is Located Less Than 100 Kilometers From Makkah But At 1800
          Meters Of Altitude, In A Valley On The Eastern Side Of The Hejaz
          Mountains. The Millennia-Old City Lays At The Crossroads Of Two Of The
          Most Important Historical Roads Of The Arabian Peninsula:{" "}
        </p>
        <ul className="flex p-0 m-0 flex-col">
          {list_data?.map((item, i) => (
            <li
              data-aos="fade-up"
              data-aos-delay={`${300 + i * 100}`}
              key={item?.id}
              className="!text-[#505050] font-normal !text-base 2xl:text-xl flex gap-[2px]"
            >
              <span>➢</span>
              <span>{item?.title}</span>
            </li>
          ))}
        </ul>

        <p
          data-aos="fade-up"
          data-aos-delay="1000"
          className="!text-[#505050] font-normal !text-base 2xl:text-xl flex gap-[2px] mt-4"
        >
          Read More About Taif City Tour From Makkah
        </p>

        <button
          data-aos="fade-up"
          data-aos-delay="1200"
          className="bg-[#3B85C1] !rounded-[25px] text-white w-[180px] h-[50px] flex justify-center items-center"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
