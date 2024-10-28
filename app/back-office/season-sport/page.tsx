"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import "../../css/main.css";
import "../../css/main-back-office.css";
dynamic(() => import("bootstrap/dist/js/bootstrap.bundle.js"), {
  ssr: false,
});

import BannerCard from "./BannerCard";
import CoachCard from "./CoachCard";
import RecentGameTable from "./RecentGameTable";
import SeasonCard from "./SeasonCard";
import AwardsTable from "./AwardsTable";
import { useAuth } from "../../context/AuthContext";
import { SeasonSportItem, SeasonSportItemForm } from "../../types";

export default function SeasonSport() {
  const { handleAuthError } = useAuth();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js").then((bootstrap) => {
      // Bootstrap is loaded; ensure components are correctly initialized here if necessary
    });
  }, []);

  // Wrapping `useSearchParams` inside a Suspense boundary
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeasonSportContent handleAuthError={handleAuthError} />
    </Suspense>
  );
}

function SeasonSportContent({ handleAuthError }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sportId = searchParams.get("sportId");
  const seasonName = searchParams.get("seasonName");
  const [seasonSport, setSeasonSport] = useState<SeasonSportItem>({
    id: null,
    bannerTitle: "",
    bannerImageUrl: null,
    coachName: "",
    coachDescription: "",
    coachProfileImageUrl: null,
    recentGameTitle: "",
    recentGameDescription: "",
    seasonNumber: "",
    seasonDetail: "",
    seasonImageUrl: null,
    awards: [],
    recentGames: [],
  });
  const [seasonSportForm, setSeasonSportForm] = useState<SeasonSportItemForm>({
    id: null,
    bannerTitle: "",
    bannerImage: null,
    coachName: "",
    coachDescription: "",
    coachProfileImage: null,
    recentGameTitle: "",
    recentGameDescription: "",
    seasonNumber: "",
    seasonDetail: "",
    seasonImage: null,
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
        await createSeasonSport();
        return;
      }
      if (!response.ok) {
        await handleAuthError(response);
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

  const createSeasonSport = async () => {
    try {
      const accessToken = getAccessToken();
      const formData = new FormData();
      formData.append("sportId", sportId as string);
      formData.append("bannerTitle", "");
      formData.append("coachName", "");
      formData.append("coachDescription", "");
      formData.append("recentGameTitle", "");
      formData.append("recentGameDescription", "");
      formData.append("seasonNumber", "");
      formData.append("seasonDetail", "");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.status === 409) {
        // Conflict: Do nothing and return out of the function
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setSeasonSport(data);
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error creating season sport:", error);
      alert("An error occurred while creating the season sport.");
    }
  };

  const updateSeasonSport = (event, key: keyof SeasonSportItemForm) => {
    const value = key.includes("Image")
      ? event.target.files[0]
      : event.target.value;
    setSeasonSportForm({ ...seasonSportForm, [key]: value });
  };

  const saveSeasonSport = async (cardName: string) => {
    try {
      const accessToken = getAccessToken();
      const formData = new FormData();

      if (cardName === "banner") {
        formData.append(
          "bannerTitle",
          seasonSportForm.bannerTitle || seasonSport.bannerTitle
        );
        if (seasonSportForm.bannerImage instanceof File) {
          formData.append("bannerImage", seasonSportForm.bannerImage);
        }
      } else if (cardName === "coach") {
        formData.append(
          "coachName",
          seasonSportForm.coachName || seasonSport.coachName
        );
        formData.append(
          "coachDescription",
          seasonSportForm.coachDescription || seasonSport.coachDescription
        );
        if (seasonSportForm.coachProfileImage instanceof File) {
          formData.append(
            "coachProfileImage",
            seasonSportForm.coachProfileImage
          );
        }
      } else if (cardName === "recentGame") {
        formData.append(
          "recentGameTitle",
          seasonSportForm.recentGameTitle || seasonSport.recentGameTitle
        );
        formData.append(
          "recentGameDescription",
          seasonSportForm.recentGameDescription ||
            seasonSport.recentGameDescription
        );
      } else if (cardName === "season") {
        formData.append(
          "seasonNumber",
          seasonSportForm.seasonNumber || seasonSport.seasonNumber
        );
        formData.append(
          "seasonDetail",
          seasonSportForm.seasonDetail || seasonSport.seasonDetail
        );
        if (seasonSportForm.seasonImage instanceof File) {
          formData.append("seasonImage", seasonSportForm.seasonImage);
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/${
          seasonSport.id || ""
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(
          `${
            cardName.charAt(0).toUpperCase() + cardName.slice(1)
          } updated successfully!`
        );
        fetchSeasonSport();
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving season sport:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-2 col-8">
          <h2 className="my-4">Edit Season-Sport Page</h2>
          <button
            className="btn btn-secondary mb-4"
            onClick={() => router.back()}
          >
            Back
          </button>

          {/* Banner Card */}
          <BannerCard
            bannerTitle={seasonSport.bannerTitle}
            bannerImageUrl={seasonSport.bannerImageUrl}
            updateSeasonSport={updateSeasonSport}
            saveBannerCard={() => saveSeasonSport("banner")}
          />

          {/* Coach Card */}
          <CoachCard
            coachName={seasonSport.coachName}
            coachDescription={seasonSport.coachDescription}
            coachProfileImageUrl={seasonSport.coachProfileImageUrl}
            updateSeasonSport={updateSeasonSport}
            saveCoachCard={() => saveSeasonSport("coach")}
          />

          {/* Recent Game */}
          <RecentGameTable
            sportId={Number(sportId)}
            recentGameData={seasonSport.recentGames}
            fetchSeasonSport={fetchSeasonSport}
          />
          {/* Season Card */}
          <SeasonCard
            seasonNumber={seasonSport.seasonNumber}
            seasonDetail={seasonSport.seasonDetail}
            seasonImageUrl={seasonSport.seasonImageUrl}
            paramSeasonName={seasonName}
            updateSeasonSport={updateSeasonSport}
            saveSeasonCard={() => saveSeasonSport("season")}
          />

          {/* Awards */}
          <AwardsTable
            sportId={Number(sportId)}
            awardsData={seasonSport.awards}
            fetchSeasonSport={fetchSeasonSport}
          />
        </div>
      </div>
    </div>
  );
}
