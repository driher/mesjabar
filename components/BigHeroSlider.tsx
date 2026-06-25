"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Post = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
};

export default function BigHeroSlider() {
  const [slides, setSlides] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch(
          "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/posts?categories=6&per_page=10&orderby=date&order=desc&_embed",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to load slider");
        }

        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error("Slider Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[250px] sm:h-[320px] md:h-[500px] lg:h-[650px] bg-gray-200 animate-pulse" />
    );
  }

  if (!slides.length) return null;

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        speed={800}
        navigation={slides.length > 1}
        loop={slides.length > 2}
        rewind={slides.length <= 2}
        pagination={{
          clickable: true,
        }}
        autoplay={
          slides.length > 1
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        className="hero-slider w-full h-[250px] sm:h-[320px] md:h-[500px] lg:h-[650px]"
      >
        {slides.map((post) => {
          const image =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/images/default-slider.jpg";

          const alt =
            post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
            post.title.rendered;

          return (
            <SwiperSlide key={post.id}>
                <div className="relative w-full h-full cursor-pointer">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-14">
                      <span className="inline-block bg-green-600 text-white text-xs md:text-sm font-medium px-6 py-3 rounded-full mb-3">
                        MES JAWA BARAT
                      </span>

                      <h2
                        className="text-white text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl drop-shadow-lg"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />

                      <div
                        className="hidden md:block mt-4 text-white/90 text-base lg:text-lg max-w-3xl line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      />
                    </div>
                  </div>
                </div>
             
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .hero-slider .swiper-button-prev,
        .hero-slider .swiper-button-next {
          width: 52px;
          height: 52px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          color: white;
          z-index: 50;
          transition: all 0.3s ease;
        }

        .hero-slider .swiper-button-prev:hover,
        .hero-slider .swiper-button-next:hover {
          background: rgba(22, 163, 74, 0.9);
        }

        .hero-slider .swiper-button-prev:after,
        .hero-slider .swiper-button-next:after {
          font-size: 20px;
          font-weight: 700;
        }

        .hero-slider .swiper-pagination {
          bottom: 20px !important;
        }

        .hero-slider .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          opacity: 1;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .hero-slider .swiper-pagination-bullet-active {
          background: #16a34a;
          width: 28px;
          border-radius: 9999px;
        }

        @media (max-width: 768px) {
          .hero-slider .swiper-button-prev,
          .hero-slider .swiper-button-next {
            width: 40px;
            height: 40px;
          }

          .hero-slider .swiper-button-prev:after,
          .hero-slider .swiper-button-next:after {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}