"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function SeasonsTable() {
  const { handleAuthError } = useAuth();
  const [seasonsList, setSeasonsList] = useState([]);
  const [season, setSeason] = useState({ seasonName: "" });
  const [showSeasonModal, setShowSeasonModal] = useState(false);
  const [isEditingSeason, setIsEditingSeason] = useState(false);
  const [editSeasonId, setEditSeasonId] = useState(null);

  useEffect(() => {
    fetchSeasons();
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchSeasons = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/season`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      const data = await response.json();
      setSeasonsList(data);
    } catch (error) {
      console.error("Error fetching seasons:", error);
      alert("An error occurred while fetching seasons.");
    }
  };

  const saveSeason = async () => {
    if (!season.seasonName) {
      alert("Please enter the season name.");
      return;
    }
    try {
      const accessToken = getAccessToken();
      let response;
      if (isEditingSeason && editSeasonId) {
        // Edit existing season
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/season/${editSeasonId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(season),
          }
        );
      } else {
        // Add new season
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/season`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(season),
          }
        );
      }
      if (response.ok) {
        fetchSeasons();
        handleCloseSeasonModal();
        alert(
          isEditingSeason
            ? "Season updated successfully!"
            : "Season added successfully!"
        );
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving season:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteSeason = async (id) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/season/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      fetchSeasons();
    } catch (error) {
      console.error("Error deleting season:", error);
      alert("An error occurred while deleting season.");
    }
  };

  const handleEditSeason = (seasonItem) => {
    setIsEditingSeason(true);
    setEditSeasonId(seasonItem.id);
    setSeason({ seasonName: seasonItem.seasonName });
    handleShowSeasonModal();
  };

  const handleShowSeasonModal = () => setShowSeasonModal(true);
  const handleCloseSeasonModal = () => {
    setShowSeasonModal(false);
    setIsEditingSeason(false);
    setSeason({ seasonName: "" });
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Seasons</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-backoffice">
                    <thead>
                      <tr>
                        <th style={{ width: "100px" }}>Action</th>
                        <th>Expand</th>
                        <th>Season Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seasonsList.map((data) => (
                        <React.Fragment key={data.id}>
                          <tr>
                            <td>
                              <i
                                className="bi bi-pencil text-success me-2 cursor-pointer"
                                title="Edit"
                                onClick={() => handleEditSeason(data)}
                              ></i>
                              <i
                                onClick={() => {
                                  const confirmDelete = window.confirm(
                                    `Are you sure you want to delete the season "${data.seasonName}"?`
                                  );
                                  if (confirmDelete) {
                                    deleteSeason(data.id);
                                  }
                                }}
                                className="bi bi-trash3 text-danger cursor-pointer"
                                title="Delete"
                              ></i>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                data-bs-toggle="collapse"
                                data-bs-target={`#sport-${data.id}`}
                              >
                                Expand
                              </button>
                            </td>
                            <td>{data.seasonName}</td>
                          </tr>
                          <div className="row collapse" id={`sport-${data.id}`}>
                            {data.sports.map((sp) => (
                              <div className="col-12" key={sp.id}>
                                <img
                                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${sp.imageUrl}`}
                                  alt={sp.sportName}
                                  style={{ width: "50px", marginRight: "10px" }}
                                />
                                {sp.sportName}
                                <i
                                  className="bi bi-pencil text-success ms-3 cursor-pointer"
                                  title="Edit Sport"
                                  onClick={() => {
                                    // Handle edit sport logic here
                                  }}
                                ></i>
                                <i
                                  onClick={() => {
                                    const confirmDelete = window.confirm(
                                      `Are you sure you want to delete the sport "${sp.sportName}"?`
                                    );
                                    if (confirmDelete) {
                                      // Handle delete sport logic here
                                    }
                                  }}
                                  className="bi bi-trash3 text-danger ms-2 cursor-pointer"
                                  title="Delete Sport"
                                ></i>
                              </div>
                            ))}
                          </div>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">
                <Button
                  className="btn btn-success"
                  onClick={handleShowSeasonModal}
                >
                  <i className="bi bi-plus-lg me-1"></i>
                  Add Season
                </Button>
              </div>
            </div>

            {/* Add/Edit Season Modal */}
            <Modal
              show={showSeasonModal}
              onHide={handleCloseSeasonModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditingSeason ? "Edit Season" : "Add Season"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="col-12 mb-3">
                  <label htmlFor="seasonName">
                    Season Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={season.seasonName}
                    onChange={(e) =>
                      setSeason({ ...season, seasonName: e.target.value })
                    }
                    className="form-control text-black text-roboto"
                    type="text"
                    placeholder="Enter season name"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSeasonModal}>
                  Close
                </Button>
                <Button variant="blue" onClick={saveSeason}>
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
