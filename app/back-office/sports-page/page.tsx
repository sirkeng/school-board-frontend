"use client";

import React from "react";
import withAuth from "../../components/withAuth";
import Head from "next/head";
import NewsTable from "./NewsTable";
import ScoreboardTable from "./ScoreboardTable";
import SeasonTable from "./SeasonsTable";
import BannerEdit from "./BannerEdit";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../css/main-back-office.css";
import "../../css/main.css";

function SportsPage() {
  return (
    <>
      <Head>
        <title>Edit Sports Page</title>
      </Head>

      <div className="container">
        <div className="row">
          <div className="offset-2 col-8">
            <h2 className="my-4">Edit Sports Page</h2>
            {/* Banner Card */}
            <BannerEdit />

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
