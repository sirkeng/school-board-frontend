"use client";

import React, { useState, useEffect } from "react";

interface RecentGameProps {
  recentGameTitle: string;
  recentGameDescription: string;
  updateSeasonSport: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => void;
  saveRecentGameCard: () => void;
}

export default function RecentGame({
  recentGameTitle,
  recentGameDescription,
  updateSeasonSport,
  saveRecentGameCard,
}: RecentGameProps) {
  const [recentGameForm, setRecentGameForm] = useState({
    recentGameTitle: recentGameTitle || "",
    recentGameDescription: recentGameDescription || "",
  });

  useEffect(() => {
    setRecentGameForm((prevRecentGameForm) => ({
      ...prevRecentGameForm,
      recentGameTitle: recentGameTitle || prevRecentGameForm.recentGameTitle,
      recentGameDescription:
        recentGameDescription || prevRecentGameForm.recentGameDescription,
    }));
  }, [recentGameTitle, recentGameDescription]);

  const handleSaveRecentGame = () => {
    if (recentGameForm.recentGameTitle.length === 0) {
      alert("Please provide a title");
    } else if (recentGameForm.recentGameDescription.length === 0) {
      alert("Please provide a description");
    } else {
      saveRecentGameCard();
    }
  };

  const handleUpdateRecentGame = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const value = event.target.value;
    const updatedRecentGame = { ...recentGameForm, [key]: value };
    setRecentGameForm(updatedRecentGame);
    updateSeasonSport(event, key);
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Recent Game</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="recentGameTitle" className="form-label">
                  Recent Game Title:
                </label>
                <input
                  id="recentGameTitle"
                  value={recentGameForm.recentGameTitle}
                  onChange={(event) =>
                    handleUpdateRecentGame(event, "recentGameTitle")
                  }
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="recentGameDescription" className="form-label">
                  Recent Game Description:
                </label>
                <textarea
                  id="recentGameDescription"
                  value={recentGameForm.recentGameDescription}
                  onChange={(event) =>
                    handleUpdateRecentGame(event, "recentGameDescription")
                  }
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={handleSaveRecentGame}>
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
