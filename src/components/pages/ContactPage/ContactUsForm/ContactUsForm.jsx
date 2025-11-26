import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";

export default function ContactUsForm() {
  return (
    <div
      style={{
        backgroundImage:
          "url(/images/purepng.com-white-cloudnaturestylenaturalbeautifulgreen-5415211264555x7ih.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // optional
      }}
      className="bg-[#F5F6FA] py-10"
    >
      <div className="grid container items-center grid-cols-1 md:grid-cols-2 gap-10">
        <div data-aos="fade-down-right" className="flex flex-col gap-3">
          <CustomHeading first_title={"LEAVE US"} second_title={"A MESSAGE"} />
          <div className="flex flex-col">
            <p className="font-bold my-0 py-0 !text-base 2xl:text-lg">
              Uno Travel Sweden AB
            </p>
            <p className="font-normal mt-1 max-w-[430px] my-0 py-0 leading-relaxed !text-base 2xl:text-lg">
              Please do not hesitate to contact us if you have any doubts,
              please use the contact form below and describe your case as
              comprehensively as possible so that we can provide you with the
              best possible service.
            </p>
          </div>
        </div>
        <div data-aos="fade-down-left" className="flex flex-col">
          <form className="flex flex-col gap-[10px]">
            <input
              placeholder="Your Name*"
              className="rounded-[6px] h-[40px] px-3 bg-white focus:outline-none backdrop-blur-[2px] border !border-[#16294F]"
            />
            <input
              placeholder="Your Email*"
              className="rounded-[6px] h-[40px] px-3 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
            />
            <input
              placeholder="Message Title*"
              className="rounded-[6px] h-[40px] px-3 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
            />
            <textarea
              className="rounded-[6px] h-[184px] p-4 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
              placeholder="Message"
            ></textarea>

            <div className="flex gap-2 items-center">
              <input type="checkbox" className="w-5 h-5 accent-[#16294F]" />
              <label className="text-black text-md 2xl:text-lg">
                I agreed and I have read and understand Samtycke
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
