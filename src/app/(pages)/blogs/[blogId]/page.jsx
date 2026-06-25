"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Eye,
  Video,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import CustomHeading from "../../../../components/shared/CustomHeading/CustomHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import HomeProjectCard from "../../../../components/pages/HomePage/HomeProjects/HomeProjectCard/HomeProjectCard";
import { useRouter, useParams } from "next/navigation";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import BlogDetailsBanner from "../../../../components/pages/BlogPage/BlogDetailsBanner/BlogDetailsBanner";
import { _get } from "../../../../lib/shared/api";
import { apiRoutes } from "../../../../lib/shared/routes";
import { useSelector } from "react-redux";

const ContentRenderer = ({ htmlContent, isRTL }) => (
  <div
    className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none text-slate-800 font-serif ${
      isRTL ? "text-right prose-headings:text-right" : "text-left"
    } prose-a:text-[var(--main-light-color)] prose-h1:text-slate-900`}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
    dir={isRTL ? "rtl" : "ltr"}
  />
);

const getTagColor = (tag) => {
  const hash = (tag || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    "bg-[rgba(38,71,135,0.08)] text-[#264787]",
    "bg-[rgba(59,133,193,0.09)] text-[#3b85c1]",
    "bg-sky-50 text-sky-800",
    "bg-slate-100 text-slate-700",
  ];
  return colors[hash % colors.length];
};

const BlogPostDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { selectedLanguage, blogs_data } = useSelector((state) => state?.layout);

  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedSwiper, setRelatedSwiper] = useState(null);

  const langId = selectedLanguage || 1;
  const isRTL = langId === 2;
  const langCode = isRTL ? "ar" : "en";

  useEffect(() => {
    if (!params?.blogId) return;
    setLoading(true);
    _get(apiRoutes.blog_detail(params.blogId))
      .then((res) => {
        setArticleData(res?.data?.data ?? null);
      })
      .catch(() => setArticleData(null))
      .finally(() => setLoading(false));
  }, [params?.blogId]);

  const getTranslation = (item) =>
    item?.translations?.find((t) => t.language_id === Number(langId)) ||
    item?.translations?.[0] || {};

  const t = getTranslation(articleData);
  const title = t.title || articleData?.title || "";
  const subtitle = t.short_text || articleData?.short_text || "";
  const contentHtml = t.content_html || "";

  const formattedDate = articleData?.publish_date
    ? new Date(articleData.publish_date).toLocaleDateString(langCode, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const textAlignment = isRTL ? "text-right" : "text-left";
  const marginStart = isRTL ? "ml-2" : "mr-2";
  const flexIconOrder = isRTL ? "flex-row-reverse" : "flex-row";

  const relatedArticles = (blogs_data?.data?.data?.articles?.data ?? []).filter(
    (a) => a.article_id !== articleData?.article_id
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
        Loading...
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Article not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden font-sans bg-slate-50">
      <BlogDetailsBanner title={title} subTitle={subtitle} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.1fr)] items-start">
          {/* Article Card */}
          <div
            data-aos="fade-right"
            className="bg-white/95 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
          >
            {/* Meta strip */}
            <div className="px-4 sm:px-6 md:px-10 pt-5 pb-3 md:pt-8 md:pb-4 border-b border-slate-100">
              <div className={`flex items-start sm:items-center justify-between flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(38,71,135,0.08)] text-[#264787] border border-[#264787]/15 px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold tracking-wide">
                    <BookOpen className="w-4 h-4" />
                    <span>{articleData.category_name}</span>
                  </span>

                  <div className={`flex flex-wrap items-center text-slate-500 text-[11px] sm:text-xs md:text-sm gap-3 sm:gap-4 ${flexIconOrder}`}>
                    {formattedDate && (
                      <div className={`flex items-center ${flexIconOrder}`}>
                        <Calendar className={`w-4 h-4 ${marginStart} text-[#3b85c1]`} />
                        <time dateTime={articleData.publish_date}>{formattedDate}</time>
                      </div>
                    )}
                    {articleData.estimated_read_time && (
                      <div className={`flex items-center ${flexIconOrder}`}>
                        <BookOpen className={`w-4 h-4 ${marginStart} text-[#3b85c1]`} />
                        <span>{articleData.estimated_read_time} {isRTL ? "دقيقة قراءة" : "min read"}</span>
                      </div>
                    )}
                    {articleData.view_count != null && (
                      <div className={`flex items-center ${flexIconOrder}`}>
                        <Eye className={`w-4 h-4 ${marginStart} text-[#3b85c1]`} />
                        <span>{Number(articleData.view_count).toLocaleString()} {isRTL ? "مشاهدة" : "views"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <figure className="relative w-full overflow-hidden">
              <img
                src={articleData.image_url || "/images/Flights slider (3).webp"}
                alt={title}
                className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/Flights slider (3).webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
              <div className={`absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10 ${isRTL ? "text-right" : "text-left"}`}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                  {title}
                </h1>
                <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm md:text-base text-slate-100/90">
                  {subtitle}
                </p>
              </div>
            </figure>

            {/* Video CTA */}
            {articleData.video_url && (
              <div className={`mx-4 sm:mx-6 md:mx-8 mt-4 sm:mt-6 mb-2 rounded-2xl border border-dashed border-[#3b85c1]/40 bg-[rgba(59,133,193,0.06)] px-3 sm:px-4 md:px-6 py-3 md:py-4 ${textAlignment}`}>
                <a
                  href={articleData.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-xs sm:text-sm md:text-base font-semibold text-[#264787] hover:text-[#3b85c1] transition ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}`}
                >
                  <Video className={`w-4 h-4 sm:w-5 sm:h-5 ${marginStart}`} />
                  <span>{isRTL ? "شاهد الفيديو التوضيحي" : "Watch the video guide"}</span>
                </a>
              </div>
            )}

            {/* Article body */}
            <article className="px-4 sm:px-6 md:px-10 pb-8 md:pb-10 pt-3 sm:pt-4">
              <ContentRenderer htmlContent={contentHtml} isRTL={isRTL} />
            </article>

            {/* Tags */}
            {articleData.tags?.length > 0 && (
              <div className="px-4 sm:px-6 md:px-10 pb-6 md:pb-8 border-t border-slate-100 pt-4 sm:pt-6">
                <div className={`flex flex-wrap items-center gap-2 md:gap-3 ${isRTL ? "justify-end" : "justify-start"}`}>
                  <h4 className={`text-xs sm:text-sm md:text-base font-semibold text-slate-800 ${textAlignment}`}>
                    {isRTL ? "الموضوعات:" : "Topics:"}
                  </h4>
                  {articleData.tags.map((tag) => (
                    <span
                      key={tag.tag_id}
                      className={`px-3 py-1 text-[11px] sm:text-xs md:text-sm font-medium rounded-full ${getTagColor(tag.tag_label || tag.tag_key)} hover:bg-[rgba(59,133,193,0.12)] transition`}
                    >
                      #{isRTL ? (tag.tag_label || tag.tag_key) : tag.tag_key}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside data-aos="fade-left" className="space-y-5 sm:space-y-6 lg:space-y-8">
            <div className="hidden sm:block">
              <div className="rounded-3xl bg-gradient-to-br from-[#264787] to-[#3b85c1] text-white p-5 sm:p-6 shadow-xl">
                <h4 className="text-base sm:text-lg font-bold mb-2">
                  {isRTL ? "حضّر رحلتك القادمة" : "Plan your next trip"}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-100 mb-4 leading-relaxed">
                  {isRTL
                    ? "اكتشف المزيد من المقالات والنصائح التي تساعدك على جعل كل رحلة أسهل وأمتع."
                    : "Explore more guides and tips that make every trip smoother and more enjoyable."}
                </p>
                <button
                  onClick={() => router.push("/blogs")}
                  className="w-full rounded-full bg-white/10 border border-white/40 text-[11px] sm:text-xs font-semibold py-2 hover:bg-white/15 transition"
                >
                  {isRTL ? "استعرض كل المقالات" : "Browse all articles"}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Blogs */}
        {relatedArticles.length > 0 && (
          <section data-aos="fade-up" data-aos-delay="1000" className="mt-12 md:mt-16">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
              <CustomHeading first_title={"Related"} second_title={"Blogs"} />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => relatedSwiper?.slidePrev()}
                  className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#264787] hover:text-white transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => relatedSwiper?.slideNext()}
                  className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#264787] hover:text-white transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white/90 rounded-3xl border border-slate-100 shadow-md shadow-slate-200/70 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6">
              <Swiper
                modules={[Autoplay]}
                onSwiper={setRelatedSwiper}
                loop={relatedArticles.length > 1}
                spaceBetween={16}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                breakpoints={{
                  0: { slidesPerView: 1.05 },
                  480: { slidesPerView: 1.6 },
                  640: { slidesPerView: 2.2 },
                  900: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {relatedArticles.map((item) => {
                  const rt = getTranslation(item);
                  const normalizedItem = {
                    ...item,
                    title: rt.title || item.title || "",
                    short_text: rt.short_text || item.short_text || "",
                  };
                  return (
                    <SwiperSlide key={item?.article_id}>
                      <div className="h-full">
                        <HomeProjectCard
                          onclick={() => router.push(`/blogs/${item?.article_id}`)}
                          item={normalizedItem}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BlogPostDetail;
