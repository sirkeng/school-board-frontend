"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LastSeasonsSection() {
  const [lastSeasons, setLastSeasons] = useState([]);
  const [expandedSeasons, setExpandedSeasons] = useState({});

  useEffect(() => {
    fetchLastSeasons();
  }, []);

  const fetchLastSeasons = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/last-seasons`,
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

  return (
    <section className="container mb-5">
      <div className="row">
        {lastSeasons.map((season, index) => (
          <motion.div
            key={index}
            className="col-12 col-md-4 mb-4"
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "Tween", stiffness: 100 }}
          >
            <div className="card">
              <div className="card-header fs-4 text-center text-primary">
                {season.seasonNumber}
              </div>
              <Image
                height={300}
                width={500}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${season.seasonImageUrl}`}
                alt="Season Image"
                className="card-img-top"
                style={{ objectFit: "cover", height: "300px" }}
              />
              <div className="card-body">
                <p className="card-text text-black text-roboto">
                  {expandedSeasons[index] || season.seasonDetail.length <= 100
                    ? season.seasonDetail
                    : `${season.seasonDetail.substring(0, 100)}...`}
                  {season.seasonDetail.length > 100 &&
                    !expandedSeasons[index] && (
                      <button
                        className="btn btn-link p-0 text-primary ms-1"
                        onClick={() => toggleSeeMore(index)}
                      >
                        See More
                      </button>
                    )}
                </p>
                {expandedSeasons[index] && season.seasonDetail.length > 100 && (
                  <button
                    className="btn btn-link p-0 text-primary"
                    onClick={() => toggleSeeMore(index)}
                  >
                    See Less
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
