"use client";

import React, { useState } from "react";
import withAuth from "../../components/withAuth";
import Head from "next/head";
import NewsTable from "./NewsTable";
import ScoreboardTable from "./ScoreboardTable";
import SeasonTable from "./SeasonsTable";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../css/main-back-office.css";
import "../../css/main.css";

function SportsPage() {
  const [banner, setBanner] = useState({
    title: "",
    video: "",
  });

  const [scoreboard, setScoreboard] = useState({
    sportname: "",
    firstteam: "",
    secondteam: "",
    firstscore: "",
    secondscore: "",
    livelink: "",
  });

  function saveall_banner() {
    if (banner.title.length == 0) {
      alert("Please provide a title");
    } else if (banner.video.length == 0) {
      alert("Please provide a background video");
    } else {
      // CALL API
    }
  }

  const [seasons_list, set_seasons_list] = useState([
    {
      id: 1,
      seasons: "Season 1",
      sports: [
        {
          id: 1,
          sport_title: "Sport1",
        },
        {
          id: 2,
          sport_title: "Sport2",
        },
        {
          id: 3,
          sport_title: "Sport3",
        },
      ],
    },
    {
      id: 2,
      seasons: "Season 2",
      sports: [
        {
          id: 4,
          sport_title: "Sport4",
        },
        {
          id: 5,
          sport_title: "Sport5",
        },
        {
          id: 6,
          sport_title: "Sport6",
        },
      ],
    },
    {
      id: 3,
      seasons: "Season 3",
      sports: [
        {
          id: 7,
          sport_title: "Sport7",
        },
        {
          id: 8,
          sport_title: "Sport8",
        },
        {
          id: 9,
          sport_title: "Sport9",
        },
      ],
    },
  ]);

  function update_banner(event, key) {
    // key = title
    const temp = { ...banner };
    temp[key] = event.target.value;
    setBanner(temp);
  }

  function delete_season(index) {
    const temp = seasons_list.filter(function (data, i) {
      return i != index;
    });
    set_seasons_list(temp);
    //TODO remove news api
  }

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
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <h4 className="card-header bg-blue text-white">Banner</h4>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="" className="form-label">
                          Banner Title:{" "}
                        </label>
                        <input
                          value={banner.title}
                          onChange={(event) => update_banner(event, "title")}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 mb-4">
                        <label htmlFor="" className="form-label">
                          Banner Video:{" "}
                        </label>
                        <input
                          value={banner.video}
                          onChange={(event) => update_banner(event, "video")}
                          type="file"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-12 text-end">
                        <button
                          className="btn btn-blue"
                          onClick={saveall_banner}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
