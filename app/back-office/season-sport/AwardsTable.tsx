"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { AwardItem } from "../../types";

interface AwardsTableProps {
  sportId: number;
  awardsData: AwardItem[];
  fetchSeasonSport: () => Promise<void>;
}

export default function AwardsTable({
  sportId,
  awardsData,
  fetchSeasonSport,
}: AwardsTableProps) {
  const { handleAuthError } = useAuth();
  const [awardsList, setAwardsList] = useState<AwardItem[]>([]);
  const [award, setAward] = useState({ title: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setAward({ title: "", description: "" });
  };

  useEffect(() => {
    setAwardsList(awardsData);
  }, [awardsData]);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const saveAward = async () => {
    if (!award.title || !award.description) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const accessToken = getAccessToken();
      let response;

      if (isEditing && editId) {
        // Edit existing award
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/award/${editId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(award),
          }
        );
      } else {
        // Add new award
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/award`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...award, detailSportId: sportId }),
          }
        );
      }

      if (response.ok) {
        await fetchSeasonSport();
        handleCloseModal();
        alert(
          isEditing
            ? "Award updated successfully!"
            : "Award added successfully!"
        );
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving award:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteAward = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/detail-sport/award/${id}`,
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
      console.error("Error deleting award:", error);
      alert("An error occurred while deleting the award.");
    }
  };

  const handleEdit = (awardItem: any) => {
    setIsEditing(true);
    setEditId(awardItem.id);
    setAward({ title: awardItem.title, description: awardItem.description });
    handleShowModal();
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Awards</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped table-hover table-backoffice">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awardsList.map((data) => (
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
                                `Are you sure you want to delete the award titled "${data.title}"?`
                              );
                              if (confirmDelete) {
                                deleteAward(data.id);
                              }
                            }}
                            className="bi bi-trash3 text-danger cursor-pointer"
                            title="Delete"
                          ></i>
                        </td>
                        <td>{data.title}</td>
                        <td>{data.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add/Edit Award Modal */}
            <div className="row mb-2">
              <div className="col-6 text-start">
                <Button className="btn btn-success" onClick={handleShowModal}>
                  <i className="bi bi-plus-lg me-1"></i>
                  Add Award
                </Button>
              </div>
            </div>

            {/* React Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing ? "Edit Award" : "Add Award"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="title">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      value={award.title || ""}
                      onChange={(e) =>
                        setAward({ ...award, title: e.target.value })
                      }
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter award title"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="description">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={award.description || ""}
                      onChange={(e) =>
                        setAward({ ...award, description: e.target.value })
                      }
                      className="form-control text-black text-roboto"
                      placeholder="Enter award description"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="blue" onClick={saveAward}>
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
