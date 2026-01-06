import { Input, Select } from "antd";
import { CircleAlert } from "lucide-react";
import TextArea from "antd/es/input/TextArea";
export default function ExtraServiceCard({
  title,
  image,
  description,
  priceText,
  totalPrice,
  showMessage,
  infoBox, 
}) {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden bg-white border-t-4 border-t-[var(--main-light-color)]">
      <h2
        className="flex items-center !text-xl gap-2 w-full sm:w-2/3 md:w-3/4
 text-white bg-[var(--main-light-color)] p-2 font-bold"
        style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
      >
        {title}
      </h2>

      <div className="px-6 py-6">
        {/* Image */}
       <div className="mb-4 aspect-[16/9] overflow-hidden rounded">
  <img
    src={image}
    alt={title}
    className="w-full h-full object-contain"
  />
</div>


        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          {description}{" "}
          <span className="text-[var(--main-orange-color)] cursor-pointer">Read More</span>
        </p>

        {/* 🔵 Blue Info Box */}
        {infoBox && (
          <div className="mb-4 bg-[var(--main-light-color)]/10 border border-[var(--main-light-color)]/60 rounded-md p-3 flex items-center gap-2 text-sm text-[var(--main-light-color)]">
            <span className="font-bold">
              <CircleAlert/>
            </span>
            <p>{infoBox}</p>
          </div>
        )}

        {/* Optional Message */}
        {showMessage && (
          <div className="mb-4">
            <TextArea
              rows={3}
              maxLength={150}
              placeholder="Your Message"
            />
            <p className="text-xs text-gray-400 mt-1">
              Maks. 150 tegn
            </p>
          </div>
        )}

        {/* Select */}
        <div className="mb-3">
          <Select
            defaultValue="no"
            className="w-full"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>

        {/* Price */}
        <div className="flex justify-between items-center text-[var(--main-light-color)]">
          <span className="text-sm">{priceText}</span>
          <span className="text-xl font-bold">{totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
