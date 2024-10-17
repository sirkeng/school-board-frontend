"use client";

import React, { useState, useEffect } from "react";

interface SeasonCardProps {
  seasonNumber: string;
  seasonDetail: string;
  seasonImageUrl: string | null;
  paramSeasonName: string;
  updateSeasonSport: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => void;
  saveSeasonCard: () => void;
}

export default function SeasonCard({
  seasonNumber,
  seasonDetail,
  seasonImageUrl,
  updateSeasonSport,
  saveSeasonCard,
}: SeasonCardProps) {
  const [seasonForm, setSeasonForm] = useState({
    seasonNumber: seasonNumber || "",
    seasonDetail: seasonDetail || "",
    seasonImage: seasonImageUrl || "",
  });

  useEffect(() => {
    setSeasonForm((prevSeasonForm) => ({
      ...prevSeasonForm,
      seasonNumber: seasonNumber || prevSeasonForm.seasonNumber,
      seasonDetail: seasonDetail || prevSeasonForm.seasonDetail,
      seasonImage: seasonImageUrl || prevSeasonForm.seasonImage,
    }));
  }, [seasonNumber, seasonDetail, seasonImageUrl]);

  const handleSaveSeason = () => {
    if (seasonForm.seasonNumber.length === 0) {
      alert("Please provide a Season and its current number ex. Season 14");
    } else if (!seasonForm.seasonImage) {
      alert("Please provide a background image");
    } else {
      saveSeasonCard();
    }
  };

  const handleUpdateSeason = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const value =
      key === "seasonImage" && event.target instanceof HTMLInputElement
        ? event.target.files[0]
        : event.target.value;
    const updatedSeason = { ...seasonForm, [key]: value };
    setSeasonForm(updatedSeason);
    updateSeasonSport(event, key);
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Season</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="seasonNumber" className="form-label">
                  Season Number:
                </label>
                <input
                  id="seasonNumber"
                  value={seasonForm.seasonNumber}
                  onChange={(event) =>
                    handleUpdateSeason(event, "seasonNumber")
                  }
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="seasonDetail" className="form-label">
                  Season Detail:
                </label>
                <textarea
                  id="seasonDetail"
                  value={seasonForm.seasonDetail}
                  onChange={(event) =>
                    handleUpdateSeason(event, "seasonDetail")
                  }
                  className="form-control"
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="seasonImage" className="form-label">
                  Season Image:
                </label>
                <input
                  id="seasonImage"
                  onChange={(event) => handleUpdateSeason(event, "seasonImage")}
                  type="file"
                  className="form-control"
                />
                {seasonForm.seasonImage &&
                  typeof seasonForm.seasonImage === "string" && (
                    <div className="mt-2">
                      <strong>Current Image:</strong>{" "}
                      {seasonForm.seasonImage.split("/").pop()}
                    </div>
                  )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={handleSaveSeason}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
