"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { format } from "date-fns";
import { NewsItem } from "../types";

export default function NewsSection() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("An error occurred while fetching news.");
    }
  };

  return (
    <section className="bg-dark-blue pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Swiper
              navigation={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiperNews"
            >
              {newsList.map((data: NewsItem) => {
                return (
                  <SwiperSlide key={data.id}>
                    <div className="card p-2">
                      <div className="card-body p-5">
                        <div className="row">
                          <div className="col-12 fs-3 blue-text">
                            {data.title}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 fs-6 yellow-text text-margin">
                            {format(new Date(data.timestamp), "MMMM do, yyyy")}{" "}
                            | {data.location}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-roboto fs-6 text-body-secondary">
                            {data.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
