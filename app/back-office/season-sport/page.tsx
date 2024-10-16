"use client";

import "../../css/main.css";
import "../../css/main-back-office.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import BannerCard from "./BannerCard";
import CoachCard from "./CoachCard";
import RecentGame from "./RecentGame";
import SeasonCard from "./SeasonCard";

export default function SeasonSport() {
  return (
    <div className="container">
      <div className="row">
        <div className="offset-2 col-8">
          <h2 className="my-4">Edit Season-Sport Page</h2>

          {/* Banner Card */}
          <BannerCard />

          {/* Coach Card */}
          <CoachCard />

          {/* Recent Game */}
          <RecentGame />

          {/* Season Card */}
          <SeasonCard />

          {/* Awards */}
        </div>
      </div>
    </div>
  );
}
