import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";

const FALLBACK = {
  title: "Explore the World with Uno Travel",
  description:
    "From iconic landmarks to hidden gems, our international tours are crafted to give you unforgettable experiences. Expert guides, hand-picked hotels, and seamless logistics so you can focus on the journey.",
};

const getT = (section, langId) =>
  section?.translations?.find((t) => t.language_id === Number(langId)) ||
  section?.translations?.[0] ||
  {};

export default function IntlToursIntro({ section, langId }) {
  const t = getT(section, langId);
  const title = t.section_title || FALLBACK.title;
  const desc  = t.section_description || FALLBACK.description;

  const words = title.split(" ");
  const half  = Math.ceil(words.length / 2);

  return (
    <div data-aos="fade-up" className="mt-20 container">
      <CustomHeading
        first_title={words.slice(0, half).join(" ") + " "}
        second_title={words.slice(half).join(" ")}
      />
      <p className="text-[#16294F] 2xl:!text-lg mt-4 !text-base max-w-3xl">{desc}</p>
    </div>
  );
}
