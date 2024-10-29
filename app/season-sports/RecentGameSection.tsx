// RecentGameSection.tsx
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { format } from "date-fns";
import { RecentGameItem } from "../types";

interface RecentGameSectionProps {
  recentGames: RecentGameItem[];
}

export default function RecentGameSection({
  recentGames,
}: Readonly<RecentGameSectionProps>) {
  const [recentGamesList, setRecentGamesList] = useState<RecentGameItem[]>([]);

  useEffect(() => {
    setRecentGamesList(recentGames);
  }, [recentGames]);

  if (recentGamesList.length === 0) {
    return null;
  }

  return (
    <section className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="blue-text">Recent Games</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Swiper
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiperGames"
            >
              {recentGamesList.map((game: RecentGameItem) => {
                return (
                  <SwiperSlide key={game.id}>
                    <div className="card p-2 mb-4 bg-sblue">
                      <div className="card-body p-5">
                        <div className="row">
                          <div className="col-12 fs-3 text-white fw-bold">
                            {game.title}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 fs-6 yellow-text text-margin">
                            {format(new Date(game.timestamp), "MMMM do, yyyy")}{" "}
                            |{game.location && ` ${game.location}`}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-roboto fs-6 text-white">
                            {game.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <div
                className="swiper-button-prev"
                style={{ paddingBottom: "20px" }}
              ></div>
              <div
                className="swiper-button-next"
                style={{ paddingBottom: "20px" }}
              ></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
