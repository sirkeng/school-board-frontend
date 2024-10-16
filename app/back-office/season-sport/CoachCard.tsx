"use client";

import React, { useState } from "react";

export default function CoachCard() {
  const [coach, setCoach] = useState({
    name: "",
    description: "",
    profile: "",
  });

  function update_coach(event, key) {
    // key = title
    const temp = { ...coach };
    temp[key] = event.target.value;
    setCoach(temp);
  }

  function saveall_coach() {
    if (coach.name.length == 0) {
      alert("Please provide a name");
    } else if (coach.profile.length == 0) {
      alert("Please provide a profile picture");
    } else {
      // CALL API
    }
  }

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Coach</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">
                  Coach Name:{" "}
                </label>
                <input
                  value={coach.name}
                  onChange={(event) => update_coach(event, "name")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">
                  Coach Description:{" "}
                </label>
                <input
                  value={coach.description}
                  onChange={(event) => update_coach(event, "description")}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="" className="form-label">
                  Coach Profile:{" "}
                </label>
                <input
                  value={coach.profile}
                  onChange={(event) => update_coach(event, "profile")}
                  type="file"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={saveall_coach}>
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
