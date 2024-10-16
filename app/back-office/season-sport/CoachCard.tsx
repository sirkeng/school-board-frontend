"use client";

import React, { useState, useEffect } from "react";

interface CoachCardProps {
  coachName: string;
  coachDescription: string;
  coachProfileImageUrl: File | string | null;
  updateSeasonSport: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
  saveCoachCard: () => void;
}

export default function CoachCard({
  coachName,
  coachDescription,
  coachProfileImageUrl,
  updateSeasonSport,
  saveCoachCard,
}: CoachCardProps) {
  const [coachForm, setCoachForm] = useState({
    coachName: coachName || "",
    coachDescription: coachDescription || "",
    coachProfileImage: coachProfileImageUrl || "",
  });

  useEffect(() => {
    setCoachForm((prevCoachForm) => ({
      ...prevCoachForm,
      coachName: coachName || prevCoachForm.coachName,
      coachDescription: coachDescription || prevCoachForm.coachDescription,
      coachProfileImage:
        coachProfileImageUrl || prevCoachForm.coachProfileImage,
    }));
  }, [coachName, coachDescription, coachProfileImageUrl]);

  const handleSaveCoach = () => {
    if (coachForm.coachName.length === 0) {
      alert("Please provide a name");
    } else if (!coachForm.coachProfileImage) {
      alert("Please provide a profile picture");
    } else {
      saveCoachCard();
    }
  };

  const handleUpdateCoach = (event, key) => {
    const value =
      key === "coachProfileImage" ? event.target.files[0] : event.target.value;
    const updatedCoach = { ...coachForm, [key]: value };
    setCoachForm(updatedCoach);
    updateSeasonSport(event, key);
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Coach</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="coachName" className="form-label">
                  Coach Name:
                </label>
                <input
                  id="coachName"
                  value={coachForm.coachName}
                  onChange={(event) => handleUpdateCoach(event, "coachName")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="coachDescription" className="form-label">
                  Coach Description:
                </label>
                <input
                  id="coachDescription"
                  value={coachForm.coachDescription}
                  onChange={(event) =>
                    handleUpdateCoach(event, "coachDescription")
                  }
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="coachProfileImage" className="form-label">
                  Coach Profile:
                </label>
                <input
                  id="coachProfileImage"
                  onChange={(event) =>
                    handleUpdateCoach(event, "coachProfileImage")
                  }
                  type="file"
                  className="form-control"
                />
                {coachForm.coachProfileImage &&
                  typeof coachForm.coachProfileImage === "string" && (
                    <div className="mt-2">
                      <strong>Current Profile:</strong>{" "}
                      {coachForm.coachProfileImage.split("/").pop()}
                    </div>
                  )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={handleSaveCoach}>
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
