"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { ScoreboardItem } from "../../types";

export default function ScoreboardTable() {
  const { handleAuthError } = useAuth();
  const [scoreboardList, setScoreboardList] = useState<ScoreboardItem[]>([]);
  const [scoreboard, setScoreboard] = useState<Partial<ScoreboardItem>>({
    sportName: "",
    firstTeam: "",
    secondTeam: "",
    firstTeamScore: 0,
    secondTeamScore: 0,
    liveLink: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setScoreboard({
      sportName: "",
      firstTeam: "",
      secondTeam: "",
      firstTeamScore: 0,
      secondTeamScore: 0,
      liveLink: "",
    });
  };

  useEffect(() => {
    fetchScoreboards();
  }, []);

  const updateScoreboardField = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof ScoreboardItem
  ) => {
    setScoreboard({ ...scoreboard, [field]: event.target.value });
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchScoreboards = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/scoreboard`,
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
      setScoreboardList(data);
    } catch (error) {
      console.error("Error fetching scoreboards:", error);
      alert("An error occurred while fetching scoreboards.");
    }
  };

  const saveScoreboard = async () => {
    if (
      !scoreboard.sportName ||
      !scoreboard.firstTeam ||
      !scoreboard.secondTeam
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const accessToken = getAccessToken();
      let response;

      if (isEditing && editId) {
        // Edit existing scoreboard
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/scoreboard/${editId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(scoreboard),
          }
        );
      } else {
        // Add new scoreboard
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/scoreboard`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(scoreboard),
          }
        );
      }

      if (response.ok) {
        fetchScoreboards();
        handleCloseModal();
        alert(
          isEditing
            ? "Scoreboard updated successfully!"
            : "Scoreboard added successfully!"
        );
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving scoreboard:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteScoreboard = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/scoreboard/${id}`,
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
      fetchScoreboards();
    } catch (error) {
      console.error("Error deleting scoreboard:", error);
      alert("An error occurred while deleting scoreboard.");
    }
  };

  const handleEdit = (scoreboardItem: ScoreboardItem) => {
    setIsEditing(true);
    setEditId(scoreboardItem.id);
    setScoreboard({ ...scoreboardItem });
    handleShowModal();
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Scoreboard</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped table-hover table-backoffice">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Sport Name</th>
                      <th>First Team</th>
                      <th>Second Team</th>
                      <th>First Team Score</th>
                      <th>Second Team Score</th>
                      <th>Live Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreboardList.map((data) => (
                      <tr key={data.id}>
                        <td>
                          <i
                            className="bi bi-pencil text-success me-2 cursor-pointer"
                            title="Edit"
                            onClick={() => handleEdit(data)}
                          ></i>
                          <i
                            onClick={() => {
                              const confirmDelete = window.confirm(
                                `Are you sure you want to delete the scoreboard for "${data.sportName}"?`
                              );
                              if (confirmDelete) {
                                deleteScoreboard(data.id);
                              }
                            }}
                            className="bi bi-trash3 text-danger cursor-pointer"
                            title="Delete"
                          ></i>
                        </td>
                        <td>{data.sportName}</td>
                        <td>{data.firstTeam}</td>
                        <td>{data.secondTeam}</td>
                        <td>{data.firstTeamScore}</td>
                        <td>{data.secondTeamScore}</td>
                        <td>
                          <Link
                            href={data.liveLink}
                            className="text-grey"
                            target="_blank"
                          >
                            <u>Link to Live</u>
                            <i className="bi bi-box-arrow-up-right text-grey ms-1"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">
                <Button className="btn btn-success" onClick={handleShowModal}>
                  <i className="bi bi-plus-lg me-1"></i>
                  Add Scoreboard
                </Button>
              </div>
            </div>

            {/* Add/Edit Scoreboard Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing ? "Edit Scoreboard" : "Add Scoreboard"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="sportName">
                      Sport Name <span className="text-danger">*</span>
                    </label>
                    <input
                      value={scoreboard.sportName || ""}
                      onChange={(e) => updateScoreboardField(e, "sportName")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter sport name"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="firstTeam">
                      First Team <span className="text-danger">*</span>
                    </label>
                    <input
                      value={scoreboard.firstTeam || ""}
                      onChange={(e) => updateScoreboardField(e, "firstTeam")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter first team name"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="secondTeam">
                      Second Team <span className="text-danger">*</span>
                    </label>
                    <input
                      value={scoreboard.secondTeam || ""}
                      onChange={(e) => updateScoreboardField(e, "secondTeam")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter second team name"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="firstTeamScore">
                      First Team Score <span className="text-danger">*</span>
                    </label>
                    <input
                      value={scoreboard.firstTeamScore?.toString() || ""}
                      onChange={(e) =>
                        updateScoreboardField(e, "firstTeamScore")
                      }
                      className="form-control text-black text-roboto"
                      type="number"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="secondTeamScore">
                      Second Team Score <span className="text-danger">*</span>
                    </label>
                    <input
                      value={scoreboard.secondTeamScore?.toString() || ""}
                      onChange={(e) =>
                        updateScoreboardField(e, "secondTeamScore")
                      }
                      className="form-control text-black text-roboto"
                      type="number"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="liveLink">Live Link</label>
                    <input
                      value={scoreboard.liveLink || ""}
                      onChange={(e) => updateScoreboardField(e, "liveLink")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Paste link to live event"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="blue" onClick={saveScoreboard}>
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
