"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SeasonItem } from "../types";

export default function SeasonsSection() {
  const [seasonsList, setSeasonsList] = useState<SeasonItem[]>([]);
  const [activeSeason, setActiveSeason] = useState<SeasonItem | null>(null);

  useEffect(() => {
    fetchSeasons();
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchSeasons = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/season`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      const data: SeasonItem[] = await response.json();
      data.sort((a, b) =>
        a.seasonName.localeCompare(b.seasonName, undefined, { numeric: true })
      );
      setSeasonsList(data);
      setActiveSeason(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error fetching seasons:", error);
      alert("An error occurred while fetching seasons.");
    }
  };

  const handleSeasonSelect = (season: SeasonItem) => {
    setActiveSeason(season);
  };

  return (
    <div className="col-12 col-lg-6">
      <div className="row">
        <motion.div
          className="offset-3 col-6"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <div className="dropdown text-center dda-margintop mb-3">
            <a
              className="btn dropdown-toggle d-flex justify-content-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fs-1 text-white text-center">
                {activeSeason ? activeSeason.seasonName : "Select a Season"}
              </span>
              <Image
                height={500}
                width={500}
                src="/images/ddarrow.png"
                alt=""
                style={{ height: "auto", width: "26px" }}
                className="my-auto ms-2"
              />
            </a>
            <ul className="dropdown-menu w-100">
              {seasonsList.map((season) => (
                <li key={season.id}>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSeasonSelect(season)}
                  >
                    {season.seasonName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="row">
        {activeSeason &&
          activeSeason.sports.map((sport) => (
            <motion.div
              key={sport.id}
              className="col-6 mb-4"
              initial={{ opacity: 0, y: "100px" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "Tween", stiffness: 100 }}
            >
              <Link href="/season-sports">
                <div className="picture-card">
                  <Image
                    height={500}
                    width={500}
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${sport.imageUrl}`}
                    alt={sport.sportName}
                    className="picture-hover picture-width"
                  />
                </div>
                <h2 className="text-center mt-2">{sport.sportName}</h2>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
