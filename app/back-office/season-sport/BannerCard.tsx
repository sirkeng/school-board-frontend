"use client";

import React, { useState } from "react";

export default function BannerCard() {
  const [banner, setBanner] = useState({
    title: "",
    image: "",
  });

  function saveall_banner() {
    if (banner.title.length == 0) {
      alert("Please provide a title");
    } else if (banner.image.length == 0) {
      alert("Please provide a background picture");
    } else {
      // CALL API
    }
  }

  function update_banner(event, key) {
    // key = title
    const temp = { ...banner };
    temp[key] = event.target.value;
    setBanner(temp);
  }
  return (
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
                  Banner picture:{" "}
                </label>
                <input
                  value={banner.image}
                  onChange={(event) => update_banner(event, "picture")}
                  type="file"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={saveall_banner}>
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
