// RecentGameTable.tsx
"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { RecentGameItem } from "../../types";

interface RecentGameTableProps {
  sportId: number;
  recentGameData: RecentGameItem[];
  fetchSeasonSport: () => Promise<void>;
}

export default function RecentGameTable({
  sportId,
  recentGameData,
  fetchSeasonSport,
}: RecentGameTableProps) {
  const { handleAuthError } = useAuth();
  const [recentGamesList, setRecentGamesList] = useState<RecentGameItem[]>([]);
  const [recentGame, setRecentGame] = useState<Partial<RecentGameItem>>({
    title: "",
    description: "",
    location: "",
    timestamp: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setRecentGame({ title: "", description: "", location: "", timestamp: "" });
  };

  useEffect(() => {
    setRecentGamesList(recentGameData);
  }, [recentGameData]);

  const updateRecentGameField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof RecentGameItem
  ) => {
    setRecentGame({ ...recentGame, [field]: event.target.value });
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const saveRecentGame = async () => {
    if (!recentGame.title || !recentGame.description) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const accessToken = getAccessToken();
      let response;

      if (isEditing && editId) {
        // Edit existing recent game
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/recent-game/${editId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recentGame),
          }
        );
      } else {
        // Add new recent game
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/recent-game`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...recentGame, detailSportId: sportId }),
          }
        );
      }

      if (response.ok) {
        await fetchSeasonSport();
        handleCloseModal();
        alert(
          isEditing
            ? "Recent game updated successfully!"
            : "Recent game added successfully!"
        );
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving recent game:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteRecentGame = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/recent-game/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        await handleAuthError(response);
        return;
      }
      fetchSeasonSport();
    } catch (error) {
      console.error("Error deleting recent game:", error);
      alert("An error occurred while deleting the recent game.");
    }
  };

  const handleEdit = (recentGameItem: RecentGameItem) => {
    setIsEditing(true);
    setEditId(recentGameItem.id);
    setRecentGame({
      title: recentGameItem.title,
      description: recentGameItem.description,
      location: recentGameItem.location,
      timestamp: recentGameItem.timestamp,
    });
    handleShowModal();
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Recent Games</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped table-hover table-backoffice">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Location</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(recentGamesList) &&
                    recentGamesList.length > 0 ? (
                      recentGamesList.map((data) => (
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
                                  `Are you sure you want to delete the recent game titled "${data.title}"?`
                                );
                                if (confirmDelete) {
                                  deleteRecentGame(data.id);
                                }
                              }}
                              className="bi bi-trash3 text-danger cursor-pointer"
                              title="Delete"
                            ></i>
                          </td>
                          <td>{data.title}</td>
                          <td>{data.description}</td>
                          <td>{data.location}</td>
                          <td>
                            {format(new Date(data.timestamp), "MMMM do, yyyy")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          No recent games available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add/Edit Recent Game Modal */}
            <div className="row mb-2">
              <div className="col-6 text-start">
                <Button className="btn btn-success" onClick={handleShowModal}>
                  <i className="bi bi-plus-lg me-1"></i>
                  Add Recent Game
                </Button>
              </div>
            </div>

            {/* React Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing ? "Edit Recent Game" : "Add Recent Game"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="title">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      value={recentGame.title || ""}
                      onChange={(e) => updateRecentGameField(e, "title")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter recent game title"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="description">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={recentGame.description || ""}
                      onChange={(e) => updateRecentGameField(e, "description")}
                      className="form-control text-black text-roboto"
                      placeholder="Enter recent game description"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="location">Location</label>
                    <input
                      value={recentGame.location || ""}
                      onChange={(e) => updateRecentGameField(e, "location")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="timestamp">Timestamp</label>
                    <input
                      value={recentGame.timestamp || ""}
                      onChange={(e) => updateRecentGameField(e, "timestamp")}
                      className="form-control text-black text-roboto"
                      type="date"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="blue" onClick={saveRecentGame}>
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
