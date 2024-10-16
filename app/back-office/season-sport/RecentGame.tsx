"use client";

import React, { useState } from "react";

export default function RecentGame() {
  const [recentgame, setRecentGame] = useState({
    rgtitle: "",
    rgdescription: "",
  });

  function saveall_recentgame() {
    if (recentgame.rgtitle.length == 0) {
      alert("Please provide a title");
    } else if (recentgame.rgdescription.length == 0) {
      alert("Please provide a description");
    } else {
      // CALL API
    }
  }

  function update_recentgame(event, key) {
    // key = title
    const temp = { ...recentgame };
    temp[key] = event.target.value;
    setRecentGame(temp);
  }

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Recent Game</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">
                  Recent Game Title:{" "}
                </label>
                <input
                  value={recentgame.rgtitle}
                  onChange={(event) => update_recentgame(event, "rgtitle")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="" className="form-label">
                  Recent Game Description:{" "}
                </label>
                <textarea
                  value={recentgame.rgdescription}
                  onChange={(event) =>
                    update_recentgame(event, "rgdescription")
                  }
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={saveall_recentgame}>
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
