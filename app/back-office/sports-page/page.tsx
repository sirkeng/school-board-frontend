"use client";

import dynamic from "next/dynamic";

dynamic(() => import("bootstrap/dist/js/bootstrap.bundle.js"), {
  ssr: false,
});
import "../../css/main-back-office.css";
import "../../css/main.css";

import React, { useEffect } from "react";
import withAuth from "../../components/withAuth";
import NewsTable from "./NewsTable";
import ScoreboardTable from "./ScoreboardTable";
import SeasonTable from "./SeasonsTable";
import BannerCard from "./BannerCard";

function SportsPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js").then((bootstrap) => {
      // Bootstrap is loaded; ensure components are correctly initialized here if necessary
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-2 col-8">
            <h2 className="my-4">Edit Sports Page</h2>
            {/* Banner Card */}
            <BannerCard />

            {/* News Card */}
            <NewsTable />

            {/* Scoresboard */}
            <ScoreboardTable />

            {/* Seasons */}
            <SeasonTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(SportsPage);
