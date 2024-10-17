"use client";

import "../css/main.css";
import "../css/season-sports.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SeasonSportItem } from "../types";

export default function SeasonSports() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sportId = searchParams.get("id");
  const [seasonSport, setSeasonSport] = useState<SeasonSportItem>({
    id: null,
    bannerTitle: "",
    bannerImageUrl: "",
    coachName: "",
    coachDescription: "",
    coachProfileImageUrl: "",
    recentGameTitle: "",
    recentGameDescription: "",
    seasonNumber: "",
    seasonDetail: "",
    seasonImageUrl: "",
    awards: [],
  });

  useEffect(() => {
    if (sportId) {
      fetchSeasonSport();
    }
  }, [sportId]);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchSeasonSport = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/${sportId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 404) {
        return;
      }
      if (!response.ok) {
        console.error("Error fetching season sport:", response);
        return;
      }
      const data = await response.json();
      if (data) {
        setSeasonSport(data);
      }
    } catch (error) {
      console.error("Error fetching season sport:", error);
      alert("An error occurred while fetching the season sport.");
    }
  };

  return (
    <main className="overflow-hidden">
      {/* Banner */}
      <section
        className="background-picture-ss d-flex flex-column justify-content-center mb-5"
        style={
          seasonSport.bannerImageUrl
            ? {
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}${seasonSport.bannerImageUrl})`,
              }
            : {}
        }
      >
        <button className="back-icon" onClick={() => router.back()}>
          <Image
            height={500}
            width={500}
            src="/images/return-arrow.png"
            alt=""
            className="back-arrow"
          />
        </button>
        <div className="container">
          <div className="row mt-5 mt-md-0">
            <div className="col-12 text-center">
              <h1 className="fs-80">{seasonSport.bannerTitle}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Coach */}
      <section>
        <div className="container mb-5">
          <div className="row">
            <div className="offset-3 col-6 offset-md-0 col-md-2 mb-4">
              {seasonSport.coachProfileImageUrl && (
                <Image
                  height={500}
                  width={500}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${seasonSport.coachProfileImageUrl}`}
                  className="border border-warning border-5 rounded-circle text-margin w-100 h-auto"
                  alt="Coach Profile"
                />
              )}
            </div>
            <div className="col-12 col-md-10">
              <h2 className="blue-text">{seasonSport.coachName}</h2>
              <p className="text-black text-roboto">
                {seasonSport.coachDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Games */}
      <section>
        <div className="container">
          <div className="row">
            <motion.div
              className="col-12 blue-text"
              initial={{ opacity: 0, y: "100px" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "Tween", stiffness: 100 }}
            >
              <h2>Recent Games</h2>
            </motion.div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <motion.div
                className="card p-2 bg-sblue"
                initial={{ opacity: 0, y: "100px" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "Tween", stiffness: 100 }}
              >
                <motion.div
                  className="card-body pb-5"
                  initial={{ opacity: 0, y: "100px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "Tween", stiffness: 100 }}
                >
                  <div className="row">
                    <div className="col-12 fs-3 text-white fw-bold">
                      {seasonSport.recentGameTitle}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 fs-6 yellow-text text-margin">
                      {seasonSport.recentGameDescription}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Detail */}
      <section>
        <div className="container mb-5">
          <div className="row">
            <motion.div
              className="col-12"
              initial={{ opacity: 0, y: "100px" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "Tween", stiffness: 100 }}
            >
              <h1 className="blue-text text-center fs-64">
                {seasonSport.seasonNumber}
              </h1>
            </motion.div>
          </div>
          <div className="row">
            <motion.div
              className="col-12 offset-lg-1 col-lg-10 text-center"
              initial={{ opacity: 0, y: "100px" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "Tween", stiffness: 100 }}
            >
              {seasonSport.seasonImageUrl ? (
                <Image
                  height={500}
                  width={500}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${seasonSport.seasonImageUrl}`}
                  alt="Season Image"
                  className="s-image rounded-3 mb-4 w-100"
                />
              ) : null}
            </motion.div>
          </div>
          <div className="row">
            <motion.div
              className="col-12 offset-lg-1 col-lg-10"
              initial={{ opacity: 0, y: "100px" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "Tween", stiffness: 100 }}
            >
              <p className="text-black text-roboto">
                {seasonSport.seasonDetail}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-my-grey">
        <div className="container">
          <div className="row">
            <motion.div
              className="col-12 text-center my-4"
              initial={{ opacity: 0, y: "100px" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "Tween", stiffness: 100 }}
            >
              <h2>Awards</h2>
            </motion.div>
          </div>
          {seasonSport.awards.length > 0 ? (
            seasonSport.awards.map((award, index) => (
              <div className="row" key={index}>
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, y: "50px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "Tween", stiffness: 100 }}
                >
                  <h5>{award.title}</h5>
                  <p className="text-roboto grey-text text-margin">
                    {award.description}
                  </p>
                  <hr />
                </motion.div>
              </div>
            ))
          ) : (
            <div className="row">
              <motion.div
                className="col-12 text-center"
                initial={{ opacity: 0, y: "50px" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "Tween", stiffness: 100 }}
              >
                <p>No awards available at this time.</p>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
