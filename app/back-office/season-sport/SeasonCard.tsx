"use client";

import React, { useState } from "react";

export default function SeasonCard() {
  function saveall_season() {
    if (season.number.length == 0) {
      alert("Please provide a Season and its current number ex. Season 14");
    } else if (season.image.length == 0) {
      alert("Please provide a background image");
    } else {
      // CALL API
    }
  }

  const [season, setSeason] = useState({
    number: "",
    detail: "",
    image: "",
  });

  function update_season(event, key) {
    // key = title
    const temp = { ...season };
    temp[key] = event.target.value;
    setSeason(temp);
  }

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Season</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">
                  Season Number:{" "}
                </label>
                <input
                  value={season.number}
                  onChange={(event) => update_season(event, "number")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">
                  Season Detail:{" "}
                </label>
                <textarea
                  value={season.detail}
                  onChange={(event) => update_season(event, "detail")}
                  className="form-control"
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="" className="form-label">
                  Season Image:{" "}
                </label>
                <input
                  value={season.image}
                  onChange={(event) => update_season(event, "image")}
                  type="file"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={saveall_season}>
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
