"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { SeasonItem } from "../../types";

export default function SeasonsTable() {
  const { handleAuthError } = useAuth();
  const [seasonsList, setSeasonsList] = useState<SeasonItem[]>([]);
  const [season, setSeason] = useState({ seasonName: "" });
  const [showSeasonModal, setShowSeasonModal] = useState(false);
  const [isEditingSeason, setIsEditingSeason] = useState(false);
  const [editSeasonId, setEditSeasonId] = useState(null);
  const [showSportModal, setShowSportModal] = useState(false);
  const [sport, setSport] = useState({ sportName: "", imageUrl: null });
  const [editSportId, setEditSportId] = useState(null);
  const [isEditingSport, setIsEditingSport] = useState(false);
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

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
        await handleAuthError(response);
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

  const handleShowSportModal = (seasonId) => {
    setSelectedSeasonId(seasonId);
    setShowSportModal(true);
  };

  const handleCloseSportModal = () => {
    setShowSportModal(false);
    setIsEditingSport(false);
    setSport({ sportName: "", imageUrl: null });
  };

  const handleEditSport = (sportItem, seasonId) => {
    setIsEditingSport(true);
    setEditSportId(sportItem.id);
    setSport({
      sportName: sportItem.sportName,
      imageUrl: sportItem.imageUrl || null,
    });
    setSelectedSeasonId(seasonId);
    setShowSportModal(true);
  };

  const saveSport = async () => {
    if (!sport.sportName || !sport.imageUrl) {
      alert("Please enter the sport name and select an image.");
      return;
    }
    try {
      const accessToken = getAccessToken();
      let response;
      const formData = new FormData();
      formData.append("sportName", sport.sportName);
      formData.append(
        "image",
        sport.imageUrl instanceof File ? sport.imageUrl : ""
      );
      formData.append("seasonId", selectedSeasonId);

      if (isEditingSport && editSportId) {
        // Edit existing sport
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/season/sport/${editSportId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );
      } else {
        // Add new sport
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/season/sport`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );
      }
      if (response.ok) {
        fetchSeasons();
        handleCloseSportModal();
        alert(
          isEditingSport
            ? "Sport updated successfully!"
            : "Sport added successfully!"
        );
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving sport:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteSport = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/season/sport/${id}`,
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
      console.error("Error deleting sport:", error);
      alert("An error occurred while deleting sport.");
    }
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
                              <i
                                className="bi bi-plus-circle text-primary ms-3 cursor-pointer"
                                title="Add Sport"
                                onClick={() => handleShowSportModal(data.id)}
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
                              <div
                                className="col-12 d-flex align-items-center mb-2"
                                key={sp.id}
                              >
                                <img
                                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${sp.imageUrl}`}
                                  alt={sp.sportName}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    marginRight: "10px",
                                  }}
                                />
                                <span>{sp.sportName}</span>
                                <i
                                  className="bi bi-pencil text-success ms-3 cursor-pointer"
                                  title="Edit Sport"
                                  onClick={() => handleEditSport(sp, data.id)}
                                ></i>
                                <i
                                  onClick={() => {
                                    const confirmDelete = window.confirm(
                                      `Are you sure you want to delete the sport "${sp.sportName}"?`
                                    );
                                    if (confirmDelete) {
                                      deleteSport(sp.id);
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

            {/* Add/Edit Sport Modal */}
            <Modal
              show={showSportModal}
              onHide={handleCloseSportModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditingSport ? "Edit Sport" : "Add Sport"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="col-12 mb-3">
                  <label htmlFor="sportName">
                    Sport Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={sport.sportName}
                    onChange={(e) =>
                      setSport({ ...sport, sportName: e.target.value })
                    }
                    className="form-control text-black text-roboto"
                    type="text"
                    placeholder="Enter sport name"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="imageUrl">
                    Sport Image <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) =>
                      setSport({ ...sport, imageUrl: e.target.files[0] })
                    }
                    className="form-control text-black text-roboto"
                    type="file"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSportModal}>
                  Close
                </Button>
                <Button variant="blue" onClick={saveSport}>
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
