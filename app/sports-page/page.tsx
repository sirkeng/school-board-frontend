"use client";

import dynamic from "next/dynamic";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/main.css";
import "../css/custom-swiper.css";
import "../css/custom-dropdown.css";
import "../css/sportspage.css";
dynamic(() => import("bootstrap/dist/js/bootstrap.bundle.min.js"), {
  ssr: false,
});

import HeaderSecion from "./HeaderSecion";
import BannerSection from "./BannerSection";
import NewsSection from "./NewsSection";
import ScoreboardSection from "./ScoreboardSection";
import SeasonsSection from "./SeasonsSection";
import LastSeasonsSection from "./LastSeasonsSection";
import { useEffect } from "react";

export default function SportsPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      // Bootstrap is loaded; ensure components are correctly initialized here if necessary
    });
  }, []);
  return (
    <>
      <HeaderSecion />
      <main className="overflow-hidden">
        {/* banner */}
        <BannerSection />
        {/* curve dark blue*/}
        <section className="curve-dark-blue" />
        {/* news */}
        <NewsSection />

        <section className="bg-dark-blue pb-5">
          <div className="container">
            <div className="row">
              {/* scoreboard*/}
              <ScoreboardSection />

              {/* seasons */}
              <SeasonsSection />
            </div>
          </div>
        </section>
      </main>
      {/* add new section for 3 last-seasons*/}
      <LastSeasonsSection />
    </>
  );
}
