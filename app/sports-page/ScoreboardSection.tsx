"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScoreboardItem } from "../types";

export default function ScoreboardSection() {
  const [scoreboardList, setScoreboardList] = useState<ScoreboardItem[]>([]);

  useEffect(() => {
    fetchScoreboards();
  }, []);

  const fetchScoreboards = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/scoreboard`,
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
      setScoreboardList(data);
    } catch (error) {
      console.error("Error fetching scoreboards:", error);
      alert("An error occurred while fetching scoreboards.");
    }
  };
  return (
    <motion.div
      className="col-12 col-lg-6 mb-4"
      initial={{ opacity: 0, y: "100px" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "Tween", stiffness: 100 }}
    >
      <h1 className="fs-1 text-white text-center">scoreboard</h1>
      <div className="card border-0">
        <div className="card-body card-lightbluecolor p-5">
          {scoreboardList.map((data) => {
            return (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: "100px" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "Tween", stiffness: 100 }}
              >
                <div className="row mb-2">
                  <div className="col-12">
                    <h2 className="text-center text-white">
                      {data?.sportName}
                    </h2>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-5 bg-white h-50 my-auto shadow d-flex justify-content-center rounded-start">
                    {/* <Image
                      height={500}
                      width={500}
                      src="/images/PantherHead_500x302_shadow.png"
                      alt=""
                      className="me-2"
                      style={{ height: "40px", width: "auto" }}
                    /> */}
                    <p className="m-0 fs-3 blue-text">{data?.firstTeam}</p>
                  </div>
                  <div className="col-2 bg-orange p-1 text-center rounded-3 shadow">
                    <h1 className="m-0 text-white">{`${data?.firstTeamScore} : ${data?.secondTeamScore}`}</h1>
                  </div>
                  <div className="col-5 bg-white h-50 my-auto shadow d-flex justify-content-center rounded-end position-relative">
                    {/* <Image
                      height={500}
                      width={500}
                      src="/images/RIS-Phoenix-logo-819x1024.png"
                      alt=""
                      className="me-2"
                      style={{ height: "40px", width: "auto" }}
                    /> */}
                    <p className="m-0 fs-3 blue-text">{data?.secondTeam}</p>
                    <Link
                      target="_blank"
                      href={data?.liveLink}
                      className="live-link"
                    >
                      {" "}
                      <i className="bi bi-circle-fill text-danger me-1"></i>{" "}
                      Watch Live!
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
