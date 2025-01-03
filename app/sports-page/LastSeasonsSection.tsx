"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import useWindowSize from "../hooks/useWindowSize";

export default function LastSeasonsSection() {
  const [lastSeasons, setLastSeasons] = useState([]);
  const [expandedSeasons, setExpandedSeasons] = useState({});
  const { width } = useWindowSize();

  useEffect(() => {
    fetchLastSeasons();
  }, []);

  const fetchLastSeasons = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/last-seasons?limit=6`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        console.error("Error fetching last seasons:", response);
        return;
      }
      const data = await response.json();
      setLastSeasons(data);
    } catch (error) {
      console.error("Error fetching last seasons:", error);
      alert("An error occurred while fetching the last seasons.");
    }
  };

  const toggleSeeMore = (index) => {
    setExpandedSeasons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (lastSeasons.length === 0) {
    return null;
  }

  return (
    <section className="bg-white mx-2">
      <div className="container">
        <div className="row py-3 d-flex justify-content-center">
          <div className="my-2">
            <h4 className="blue-text text-center fs-1">RECENT POSTS</h4>
          </div>
          {width > 768 ? (
            <Swiper
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              pagination={{
                dynamicBullets: true,
              }}
              slidesPerView={3}
              spaceBetween={30}
              modules={[Pagination, Navigation]}
              className="mySwiperLastSeasons"
            >
              {lastSeasons.map((season, index) => (
                <SwiperSlide key={index}>
                  <div className="d-flex justify-content-center">
                    <div
                      className="card bg-grey shadow"
                      style={{
                        border: "none",
                        width: "100%",
                        maxWidth: "360px",
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: "50px" }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "Tween", stiffness: 100 }}
                      >
                        <div className="card">
                          <Link href={`/season-sports?id=${season?.sport?.id}`}>
                            <div className="card-header fs-4 text-center blue-text">
                              {season.seasonNumber}
                            </div>
                            <Image
                              height={300}
                              width={500}
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${season.seasonImageUrl}`}
                              alt="Season Image"
                              className="card-img-top card-img-top-radius-unset"
                              style={{ objectFit: "cover", height: "300px" }}
                            />
                          </Link>
                          <div className="card-body">
                            <p className="card-text text-black text-roboto">
                              {expandedSeasons[index] ||
                              season.seasonDetail.length <= 100
                                ? season.seasonDetail
                                : `${season.seasonDetail.substring(0, 100)}...`}
                              {season.seasonDetail.length > 100 &&
                                !expandedSeasons[index] && (
                                  <button
                                    className="btn btn-link p-0 blue-text ms-1"
                                    onClick={() => toggleSeeMore(index)}
                                  >
                                    See More
                                  </button>
                                )}
                            </p>
                            {expandedSeasons[index] &&
                              season.seasonDetail.length > 100 && (
                                <button
                                  className="btn btn-link p-0 blue-text"
                                  onClick={() => toggleSeeMore(index)}
                                >
                                  See Less
                                </button>
                              )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div
                className="swiper-button-prev"
                style={{ left: "-5px" }}
              ></div>
              <div
                className="swiper-button-next"
                style={{ right: "-5px" }}
              ></div>
              <div
                className="swiper-pagination"
                style={{ bottom: "-30px" }}
              ></div>
            </Swiper>
          ) : (
            <div className="row">
              {lastSeasons.map((season, index) => (
                <div key={index} className="col-12 col-md-4 mb-4">
                  <div
                    className="card bg-grey shadow"
                    style={{ border: "none", width: "100%", maxWidth: "380px" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: "50px" }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "Tween", stiffness: 100 }}
                    >
                      <div className="card">
                        <Link href={`/season-sports?id=${season?.sport?.id}`}>
                          <div className="card-header fs-4 text-center blue-text">
                            {season.seasonNumber}
                          </div>
                          <Image
                            height={300}
                            width={500}
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${season.seasonImageUrl}`}
                            alt="Season Image"
                            className="card-img-top card-img-top-radius-unset"
                            style={{ objectFit: "cover", height: "300px" }}
                          />
                        </Link>
                        <div className="card-body">
                          <p className="card-text text-black text-roboto">
                            {expandedSeasons[index] ||
                            season.seasonDetail.length <= 100
                              ? season.seasonDetail
                              : `${season.seasonDetail.substring(0, 100)}...`}
                            {season.seasonDetail.length > 100 &&
                              !expandedSeasons[index] && (
                                <button
                                  className="btn btn-link p-0 blue-text ms-1"
                                  onClick={() => toggleSeeMore(index)}
                                >
                                  See More
                                </button>
                              )}
                          </p>
                          {expandedSeasons[index] &&
                            season.seasonDetail.length > 100 && (
                              <button
                                className="btn btn-link p-0 blue-text"
                                onClick={() => toggleSeeMore(index)}
                              >
                                See Less
                              </button>
                            )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
