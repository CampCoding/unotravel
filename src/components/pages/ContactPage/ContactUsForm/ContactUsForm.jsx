import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";

export default function ContactUsForm({ data, langId }) {
  const translation =
    data?.translations?.find((t) => t.language_id === Number(langId)) ||
    data?.translations?.[0] ||
    {};

  const companyName = translation?.company_name;
  const description = translation?.description;
  const namePlaceholder = translation?.name_placeholder || "Your Name*";
  const emailPlaceholder = translation?.email_placeholder || "Your Email*";
  const messageTitlePlaceholder = translation?.message_title_placeholder || "Message Title*";
  const messagePlaceholder = translation?.message_placeholder || "Message";
  const checkboxLabel = translation?.checkbox_label || "I agreed and I have read and understand Samtycke";
  const submitLabel = translation?.submit_label;

  return (
    <div
      style={{
        backgroundImage:
          "url(/images/purepng.com-white-cloudnaturestylenaturalbeautifulgreen-5415211264555x7ih.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-[#F5F6FA] py-10"
    >
      <div className="grid container items-center grid-cols-1 md:grid-cols-2 gap-10">
        <div data-aos="fade-down-right" className="flex flex-col gap-3">
          <CustomHeading first_title={"LEAVE US"} first_title_class={"text-['#3b85c1']!"} second_title={"A MESSAGE"} />
          <div className="flex flex-col">
            {companyName && (
              <p className="font-bold my-0 py-0 !text-base 2xl:text-lg">
                {companyName}
              </p>
            )}
            {description ? (
              <div
                className="font-normal mt-1 max-w-[430px] my-0 py-0 leading-relaxed !text-base 2xl:text-lg"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : !companyName ? (
              <>
                <p className="font-bold my-0 py-0 !text-base 2xl:text-lg">
                  Uno Travel Sweden AB
                </p>
                <p className="font-normal mt-1 max-w-[430px] my-0 py-0 leading-relaxed !text-base 2xl:text-lg">
                  Please do not hesitate to contact us if you have any doubts,
                  please use the contact form below and describe your case as
                  comprehensively as possible so that we can provide you with the
                  best possible service.
                </p>
              </>
            ) : null}
          </div>
        </div>
        <div data-aos="fade-down-left" className="flex flex-col">
          <form className="flex flex-col gap-[10px]">
            <input
              placeholder={namePlaceholder}
              className="rounded-[6px] h-[40px] px-3 bg-white focus:outline-none backdrop-blur-[2px] border !border-[#16294F]"
            />
            <input
              placeholder={emailPlaceholder}
              className="rounded-[6px] h-[40px] px-3 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
            />
            <input
              placeholder={messageTitlePlaceholder}
              className="rounded-[6px] h-[40px] px-3 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
            />
            <textarea
              className="rounded-[6px] h-[184px] p-4 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
              placeholder={messagePlaceholder}
            ></textarea>

            <div className="flex gap-2 items-center">
              <input type="checkbox" className="w-5 h-5 accent-[#16294F]" />
              <label className="text-black text-md 2xl:text-lg">
                {checkboxLabel}
              </label>
            </div>

            {submitLabel && (
              <button
                type="submit"
                className="mt-2 rounded-[6px] h-[40px] px-6 bg-[#16294F] text-white font-semibold hover:bg-[#264787] transition-colors"
              >
                {submitLabel}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
