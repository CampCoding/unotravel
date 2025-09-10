import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";

const termsAndConditions = [
  {
    title: "Travel terms",
    content: [
      "UNO TRAVEL SWEDEN AB only provides airline tickets and is not responsible for any changes in schedule, cancellations, lost luggage or other events related to the flight performance. Such events are solely the responsibility of the respective airlines; therefore any claims that may arise in connection therewith shall be made directly to the Airline.",
      "We are not responsible for booked hotels or rental cars.",
    ],
  },
  {
    title: "1. The traveler's responsibility",
    content: [
      "1.0.1 We are a provider of products from airlines and other suppliers, such as hotel agents, car dealers, etc. These distribute the actual number of seats at different prices as we present on our website. The prices and the number of seats we show are completely beyond our control and not something we are responsible for.",
      "1.0.2 If you are in contact with us regarding your order, it is only you as a main booker / booker who is entitled to make changes to your booking. Please have order number and / or booking number prepared by contact.",
      "1.0.3 Once the final payment has arrived, and as soon as we have managed your booking, we will send e-mail with information about your order. We usually manage orders within 24 hours from the date of payment.",
      "1.0.4 We reserve the right to technical problems and pricing errors that are beyond our control and reserve the right to contact the buyer within 24 hours on weekdays for any changes made to the booking. In cases where money has been debited card or bank account, multiple banking days may occur before the money is left in the account. Note that this is the bank's rules and nothing we can influence.",
      "1.0.5 When booking on weekends and holidays, we are entitled to return the following working day.",
      "1.0.6 Travel documents are delivered to the e-mail address you provided at the time of booking. In case you wish to have the travel documents delivered by mail, an administration fee will be charged.",
      "1.0.7 We do not accept responsibility for the texts, information, etc. that other parties, such as suppliers, booking systems or travel magazines produce.",
      "1.0.8 If, at or near your destination, an environmental disaster, war action, strike or other incident occurring, which means that the planned trip can not be completed, we as a mediator can not be held responsible for this.",
      "1.0.9 Otherwise, Swedish laws and regulations apply.",
    ],
  },
  {
    title: "2. Customer responsibility",
    content: [
      "2.0.1 As a customer, it is your responsibility to read the terms of reference before purchase.",
      "2.0.2 As a customer, it is your responsibility to verify that you have received confirmation / travel documents within 24 hours or the following day. If you have not received any travel documents, please contact us immediately.",
      "2.0.3 As a traveler, you are required to check that you have valid travel documents, passports, visas, short-stay visas, required vaccinations and any other documents required.",
      "2.0.4 You as a customer are required to provide the correct e-mail address and telephone number and carefully read the information we send to you.",
      "2.0.5 It is very important that you provide a correct e-mail address as we are not responsible for the consequences of incorrect information or if your personal spam filter or folders shed the emails we send.",
      "2.0.6 Before completing your booking and pay, you as a customer are required to check that all information such as dates, times, itinerary, destination and that all travelers' names etc. are correct. All first names and surnames must be written in the order they are in the passport and the spelling must be identical.",
      "2.0.7 As a customer, you are required to claim an error or lack of space to help us correct the problem.",
      "2.0.8 As a customer, you are required to provide important information that may be crucial for you to complete the journey before booking.",
    ],
  },
  // Additional sections from 3 to 18 should be added here in similar structure
  {
    title: "3. Order",
    content: [
      "3.0.1 Minimum age for booking travel on our website is 18 years.",
      "3.0.2 We cannot handle bookings with single traveling children / adolescents under 18 years of age.",
      "3.0.3 Your booking is not binding as long as you do not make a payment or choose invoicing.",
      "3.0.4 When selecting payment invoice or payment by Save, the booking will be binding upon acceptance of payment terms even if you have not completed the payment transfer to Save.",
      "3.0.5 The right of cancellation under the Swedish Distribution and Home Sales Act does not apply to transport and related services such as accommodation.",
    ],
  },
  {
    title: "4. Payment Specifics for airplane",
    content: [
      "4.0.1 You must be 18 years to pay on our website.",
      "4.0.2 The payment page shows the terms of payment of your specific order.",
      "4.0.3 If you provide incorrect information, you may also incur costs incurred later.",
      "4.0.4 We do not accept responsibility for payments that have not been incurred due to technical issues beyond our control.",
      "4.0.5 Your order must be completed by...",
      "4.0.6 We use so-called SSL encryption to protect all payment data.",
      "4.0.7 For information about payment method, see Payment information.",
    ],
  },
  {
    title: "5. Prices",
    content: [
      "5.0.1 Prices include taxes and fees that are known at the time of booking.",
      "5.0.2 Additional costs for luggage, seating and check-in may apply depending on airline and price category.",
      "5.0.3 Local taxes such as city tax or airport fee may apply and are paid locally.",
      "5.0.4 Suppliers of airplanes, hire cars and hotels have different purchase requirements at different prices.",
      "5.0.5 We reserve the reservation for any price and ticket changes from airlines and/or other providers.",
      "5.0.6 In case of a flight change, transfer costs may occur which are not included in the trip price.",
      "5.0.7 Long transit accommodation or compensation will not be included.",
      "5.0.8 If your booking cannot be completed with the supplier, we reserve the right to return with any price increase or refund.",
    ],
  },
];

export default function TermsAndConditionContent() {
  return (
    <div className=" mt-[80px]">
      <div
        data-aos="fade-up-right"
        className=" !bg-white container flex  items-center h-[70px] z-50 !sticky !top-[0px]"
      >
        <CustomHeading first_title={"Terms & "} second_title={"Conditions"} />
      </div>
      <div className="flex container flex-col gap-5 mt-6">
        {termsAndConditions.map((section, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="!text-[#16294F] !font-bold !text-base 2xl:!text-xl"
            >
              {section.title}
            </h2>
            {section.content.map((text, idx) => (
              <p
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                key={idx}
                className="!text-[#16294F] !font-normal !text-base 2xl:!text-xl"
              >
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
