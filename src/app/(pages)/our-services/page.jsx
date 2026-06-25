"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetServicesData } from "../../../lib/features/layoutSlice";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const dispatch = useDispatch();
  const { services_data, services_loading, selectedLanguage } = useSelector(
    (state) => state?.layout
  );

  useEffect(() => {
    dispatch(handleGetServicesData());
  }, []);

  const pageData = services_data?.data?.data;
  const services = pageData?.services?.data ?? [];

  const getTranslation = (item) =>
    item?.translations?.find((t) => t.language_id === Number(selectedLanguage)) ||
    item?.translations?.[0] ||
    {};

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          {pageData?.services?.sectionName || "Our Services"}
        </h1>
      </header>

      <main>
        {services_loading ? (
          <div className="text-center py-12 text-gray-400 text-lg">Loading...</div>
        ) : services.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const t = getTranslation(service);
              const name = t.service_name || service.service_name || service.service_slug || "";
              const description = t.service_description || service.service_description || "";

              return (
                <Link
                  key={service.service_id}
                  href={`/our-services/${service.service_slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition block"
                >
                  {service.service_image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={service.service_image}
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
                    {description && (
                      <div
                        className="mt-2 text-slate-600 text-sm line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-lg">
            No services found.
          </div>
        )}
      </main>
    </div>
  );
}
