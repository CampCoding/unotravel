"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  User,
  ArrowLeft,
  Eye,
  Video,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import CustomHeading from "../../../../components/shared/CustomHeading/CustomHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { blog_data } from "../../../../utils/data";
import HomeProjectCard from "../../../../components/pages/HomePage/HomeProjects/HomeProjectCard/HomeProjectCard";
import { useRouter } from "next/navigation";
// If not already imported globally
import "swiper/css";
import { Autoplay } from "swiper/modules";
import BlogDetailsBanner from "../../../../components/pages/BlogPage/BlogDetailsBanner/BlogDetailsBanner";

// --- ARABIC-FIRST MOCK DATA (Using your provided structure) ---
const articleData = {
  article_id: 5,
  slug: "seven-essential-airport-tips",
  publish_date: "2025-01-22T00:00:00.000Z",
  estimated_read_time: 7,
  view_count: 12850,
  video_url: "https://www.youtube.com/watch?v=stress-free-travel-tips",
  category_id: 1,
  category_key: "blog",
  category_name: "المدوّنة",
  title: "٧ نصائح أساسية في المطارات لرحلة بدون توتر",
  short_text:
    "تجاوز الزحام، وعدّي التفتيش بسهولة، ووصل لرحلتك في الوقت مع شوية خطوات بسيطة...",
  translations: [
    {
      // English (language_id: 1)
      language_id: 1,
      title: "7 Essential Airport Tips For Stress-Free Travel",
      short_text:
        "Simple airport strategies to help you avoid delays, confusion and last-minute stress.",
      content_html:
        '\r\n    <h1>7 Essential Airport Tips For Stress-Free Travel</h1>\r\n    <p>\r\n      Airports can be crowded and confusing, especially during holidays.\r\n      These seven tips will help you move through the airport smoothly and reduce stress.\r\n    </p>\r\n    <h2>1. Check In Online</h2>\r\n    <p>\r\n      Save time at the airport by checking in online and downloading your boarding pass in advance.\r\n    </p>\r\n    <h2>2. Arrive Early</h2>\r\n    <p>\r\n      Give yourself enough buffer time for security, check-in and unexpected queues, especially with family or groups.\r\n    </p>\r\n    <h2>3. Prepare for Security</h2>\r\n    <p>\r\n      Keep your liquids, laptop and documents easy to access to speed up the security process.\r\n    </p>\r\n    <h2>4–7. Extra Tips</h2>\r\n    <ul>\r\n      <li>Keep an eye on gate changes through the airline app.</li>\r\n      <li>Carry a small power bank for your phone.</li>\r\n      <li>Have a printed copy of important bookings.</li>\r\n      <li>Use airport lounges when possible to relax and refresh.</li>\r\n    </ul>\r\n    <p>\r\n      Uno Travel can also help you add airport services such as meet & assist, lounges and private transfers to your trip.\r\n    </p>\r\n    ',
    },
    {
      // Arabic (language_id: 2)
      language_id: 2,
      title: "٧ نصائح أساسية في المطارات لرحلة بدون توتر",
      short_text:
        "نصائح بسيطة في المطار تساعدك تتجنب التأخير والارتباك والتوتر قبل السفر.",
      content_html:
        '\r\n    <h1>٧ نصائح أساسية في المطارات لرحلة بدون توتر</h1>\r\n    <p dir="rtl">\r\n      المطار ممكن يكون مزدحم ومرهق، خصوصًا في المواسم،\r\n      علشان كده جمعنالك شوية خطوات سهلة تخليك تعدّي كل المراحل بهدوء.\r\n    </p>\r\n    <h2 dir="rtl">١. اعمل تسجيل الوصول أونلاين</h2>\r\n    <p dir="rtl">\r\n      وفّر وقتك في المطار واعمل Check-in من الموبايل،\r\n      وحمّل كارت الصعود للطائرة قبل ما تتحرك.\r\n    </p>\r\n    <h2 dir="rtl">٢. اطلع بدري على المطار</h2>\r\n    <p dir="rtl">\r\n      سيب لنفسك وقت كافي للتفتيش وتسليم الشنط والطوابير، خصوصًا لو معاك أسرة أو مجموعة.\r\n    </p>\r\n    <h2 dir="rtl">٣. جهّز نفسك للتفتيش</h2>\r\n    <p dir="rtl">\r\n      خليك مخلّي اللابتوب والسوائل والأوراق المهمة في مكان سهل علشان تعدّي نقطة التفتيش بسرعة.\r\n    </p>\r\n    <h2 dir="rtl">٤–٧. نصائح إضافية</h2>\r\n    <ul dir="rtl">\r\n      <li>تابع أي تغيير في البوابة من تطبيق شركة الطيران.</li>\r\n      <li>خذ معاك باور بنك صغير للموبايل.</li>\r\n      <li>احتفظ بنسخة مطبوعة من الحجوزات المهمة.</li>\r\n      <li>لو متاح، استغل صالات الانتظار للمزيد من الراحة قبل الرحلة.</li>\r\n    </ul>\r\n    <p dir="rtl">\r\n      تقدر تضيف كمان خدمات المطار مثل الاستقبال والمساعدة والصالات والنقل الخاص من خلال حجزك مع Uno Travel.\r\n    </p>\r\n    ',
    },
  ],
  tags: [
    { tag_id: 3, tag_key: "cleaning", tag_label: "تنظيف" },
    { tag_id: 4, tag_key: "tips", tag_label: "نصائح" },
    { tag_id: 5, tag_key: "airport", tag_label: "مطار" },
  ],
};

// Mock Author Data
const authorData = {
  name: "ميسرة السفر",
  title: "خبير ومُدوّن السفر",
  bio: "ميسرة السفر يسافر بانتظام ويكتشف أفضل الطرق لجعل رحلاتك خالية من التوتر.",
};

// Component to render the HTML content safely
const ContentRenderer = ({ htmlContent, isRTL }) => (
  <div
    className={`prose prose-lg max-w-none text-slate-800 font-serif ${isRTL ? "text-right prose-headings:text-right" : "text-left"
      } prose-a:text-[var(--main-light-color)] prose-h1:text-slate-900`}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
    dir={isRTL ? "rtl" : "ltr"}
  />
);

const BlogPostDetail = () => {
  const router = useRouter();

  // 2 = Arabic default, 1 = English
  const [currentLangId, setCurrentLangId] = useState(2);
  const [relatedSwiper, setRelatedSeiper] = useState(null);


  const handleNext = () => {
    if (!relatedSwiper) return;
      relatedSwiper.slideNext();
  };

  const handlePrev = () => {
    if (!relatedSwiper) return;
      relatedSwiper.slidePrev();
  };


  const isRTL = currentLangId === 2;
  const langCode = isRTL ? "ar" : "en";

  // Function to extract translated content
  const getTranslatedContent = (field) => {
    if (articleData[field] && currentLangId === 2) {
      return articleData[field];
    }

    const translation = articleData.translations.find(
      (t) => t.language_id === currentLangId
    );

    if (translation && translation[field]) {
      return translation[field];
    }

    return articleData[field] || "Content Not Available";
  };

  const title = getTranslatedContent("title");
  const subtitle = getTranslatedContent("short_text");
  const contentHtml = getTranslatedContent("content_html");

  const formattedDate = new Date(articleData.publish_date).toLocaleDateString(
    langCode,
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Tag color helper
  const getTagColor = (tag) => {
    const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-[rgba(38,71,135,0.08)] text-[#264787]",
      "bg-[rgba(59,133,193,0.09)] text-[#3b85c1]",
      "bg-sky-50 text-sky-800",
      "bg-slate-100 text-slate-700",
    ];
    return colors[hash % colors.length];
  };


  const textAlignment = isRTL ? "text-right" : "text-left";
  const marginStart = isRTL ? "ml-2" : "mr-2";
  const marginEnd = isRTL ? "mr-2" : "ml-2";
  const flexIconOrder = isRTL ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className="min-h-screen overflow-hidden! font-sans"
    >
      <BlogDetailsBanner title={articleData?.title} subTitle={articleData?.short_text}/>
      {/* Main Content */}
      <main
      className="mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,1.1fr)] gap-10 items-start">
          {/* Article Card */}
          <div 
          data-aos="fade-right"
          className="bg-white/95 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            {/* Category and meta strip */}
            <div className="px-6 pt-6 pb-3 md:px-10 md:pt-8 md:pb-4 border-b border-slate-100">
              <div
                className={`flex items-center justify-between flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""
                  }`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(38,71,135,0.08)] text-[#264787] border border-[#264787]/15 px-4 py-1 text-xs font-semibold tracking-wide">
                    <BookOpen className="w-4 h-4" />
                    <span>{articleData.category_name}</span>
                  </span>

                  <div
                    className={`flex flex-wrap items-center text-slate-500 text-xs md:text-sm gap-4 ${flexIconOrder}`}
                  >
                    <div className={`flex items-center ${flexIconOrder}`}>
                      <User className={`w-4 h-4 ${marginStart} text-[#3b85c1]`} />
                      <span>
                        {isRTL ? "الكاتب" : "By"}{" "}
                        <span className="font-semibold text-slate-800">
                          {authorData.name}
                        </span>
                      </span>
                    </div>
                    <div className={`flex items-center ${flexIconOrder}`}>
                      <Calendar
                        className={`w-4 h-4 ${marginStart} text-[#3b85c1]`}
                      />
                      <time dateTime={articleData.publish_date}>
                        {formattedDate}
                      </time>
                    </div>
                    <div className={`flex items-center ${flexIconOrder}`}>
                      <BookOpen
                        className={`w-4 h-4 ${marginStart} text-[#3b85c1]`}
                      />
                      <span>
                        {articleData.estimated_read_time}{" "}
                        {isRTL ? "دقيقة قراءة" : "min read"}
                      </span>
                    </div>
                    <div className={`flex items-center ${flexIconOrder}`}>
                      <Eye className={`w-4 h-4 ${marginStart} text-[#3b85c1]`} />
                      <span>
                        {articleData.view_count.toLocaleString()}{" "}
                        {isRTL ? "مشاهدة" : "views"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <figure className="relative">
              <img
                src={`/images/Flights slider (3).webp`}
                alt={title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/1200x480/264787/ffffff?text=Travel+Blog";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
              <div
                className={`absolute bottom-6 left-6 right-6 md:left-10 md:right-10 ${isRTL ? "text-right" : "text-left"
                  }`}
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-100/90">
                  {subtitle}
                </p>
              </div>
            </figure>

            {/* Video CTA */}
            {articleData.video_url && (
              <div
                className={`mx-4 md:mx-8 mt-6 mb-2 rounded-2xl border border-dashed border-[#3b85c1]/40 bg-[rgba(59,133,193,0.06)] px-4 py-3 md:px-6 md:py-4 ${textAlignment}`}
              >
                <a
                  href={articleData.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm md:text-base font-semibold text-[#264787] hover:text-[#3b85c1] transition ${isRTL ? "flex-row-reverse justify-end" : "justify-start"
                    }`}
                >
                  <Video className={`w-5 h-5 ${marginStart}`} />
                  <span>
                    {isRTL
                      ? "شاهد الفيديو التوضيحي لنصائح السفر"
                      : "Watch the video guide for these airport tips"}
                  </span>
                </a>
              </div>
            )}

            {/* Article body */}
            <article className="px-4 md:px-10 pb-10 pt-4">
              <ContentRenderer htmlContent={contentHtml} isRTL={isRTL} />
            </article>

            {/* Tags */}
            <div className="px-4 md:px-10 pb-8 border-t border-slate-100 pt-6">
              <div
                className={`flex flex-wrap items-center gap-2 md:gap-3 ${isRTL ? "justify-end" : "justify-start"
                  }`}
              >
                <h4
                  className={`text-sm md:text-base font-semibold text-slate-800 ${textAlignment}`}
                >
                  {isRTL ? "الموضوعات:" : "Topics:"}
                </h4>
                {articleData.tags.map((tag) => (
                  <span
                    key={tag.tag_id}
                    className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full ${getTagColor(
                      tag.tag_label
                    )} hover:bg-[rgba(59,133,193,0.12)] transition`}
                  >
                    #{isRTL ? tag.tag_label : tag.tag_key}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Author and CTA */}
          <aside 
          data-aos="fade-left"
          className="space-y-6 lg:space-y-8">
            {/* Author card */}
            <div className="bg-white/95 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/70 p-6 md:p-7">
              <div
                className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""
                  }`}
              >
                <div className="relative">
                  <img
                    src={`https://placehold.co/120x120/264787/ffffff?text=${isRTL ? "م س" : "AT"
                      }`}
                    alt={`Avatar of ${authorData.name}`}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#3b85c1]/30"
                  />
                  <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3b85c1] text-white text-xs shadow-md">
                    ✈
                  </span>
                </div>
                <div className={textAlignment}>
                  <h3 className="text-lg font-bold text-slate-900">
                    {authorData.name}
                  </h3>
                  <p className="text-xs font-medium text-[#3b85c1] mb-1">
                    {authorData.title}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {authorData.bio}
                  </p>
                </div>
              </div>
              <button
                className={`mt-4 inline-flex items-center text-xs font-semibold text-[#264787] hover:text-[#3b85c1] transition ${flexIconOrder}`}
              >
                {isRTL ? "مشاهدة الملف الشخصي" : "View full profile"}
                <ArrowLeft className={`w-4 h-4 ${marginEnd}`} />
              </button>
            </div>

            {/* Simple CTA card */}
            <div className="hidden lg:block">
              <div className="rounded-3xl bg-gradient-to-br from-[#264787] to-[#3b85c1] text-white p-6 shadow-xl">
                <h4 className="text-lg font-bold mb-2">
                  {isRTL ? "حضّر رحلتك القادمة" : "Plan your next trip"}
                </h4>
                <p className="text-xs text-slate-100 mb-4 leading-relaxed">
                  {isRTL
                    ? "اكتشف المزيد من المقالات والنصائح التي تساعدك على جعل كل رحلة أسهل وأمتع."
                    : "Explore more guides and tips that make every trip smoother and more enjoyable."}
                </p>
                <button className="w-full rounded-full! bg-white/10 border border-white/40 text-xs font-semibold py-2 hover:bg-white/15 transition">
                  {isRTL ? "استعرض كل المقالات" : "Browse all articles"}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Blogs */}
        <section 
        data-aos="fade-up"
        delay={1000}
        className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <CustomHeading first_title={"Related"} second_title={"Blogs"} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-[34px] h-[34px] !rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#264787] hover:text-white transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-[34px] h-[34px] !rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#264787] hover:text-white transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          <div className="bg-white/90 rounded-3xl border border-slate-100 shadow-md shadow-slate-200/70 px-3 py-5 md:px-6 md:py-6">
            <Swiper
              onSwiper={setRelatedSeiper}
              loop={true}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1.1 },
                480: { slidesPerView: 1.6 },
                640: { slidesPerView: 2.2 },
                900: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
            >
              {blog_data?.map((item) => (
                <SwiperSlide key={item?.article_id}>
                  <div className="h-full">
                    <HomeProjectCard
                      onclick={() => router.push(`/blogs/${item?.article_id}`)}
                      key={item.article_id}
                      item={item}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPostDetail;
