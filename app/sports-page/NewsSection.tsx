"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";

export default function NewsSection() {
  const news_title = [
    {
      id: 1,
      title: "new1",
      content:
        "On July 7th, please report to Godbout hall to cheer for our U14 football team, who are goingagainst BPS!",
    },
    {
      id: 2,
      title: "new2",
      content:
        "On July 7th, please report to Godbout hall to cheer for our U14 football team, who are goingagainst BPS!",
    },
    {
      id: 3,
      title: "new3",
      content:
        "On July 7th, please report to Godbout hall to cheer for our U14 football team, who are goingagainst BPS!",
    },
  ];

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
              className="mySwiper"
            >
              {news_title.map((data) => {
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
                            JULY 7th, 2024 | GODBOUT HALL
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
