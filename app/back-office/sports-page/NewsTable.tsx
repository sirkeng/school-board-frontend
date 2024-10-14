"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  location: string;
  timestamp: string;
}

export default function NewsTable() {
  const { handleAuthError } = useAuth();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [news, setNews] = useState<Partial<NewsItem>>({
    title: "",
    content: "",
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
    setNews({ title: "", content: "", location: "", timestamp: "" });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const updateNewsField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof NewsItem
  ) => {
    setNews({ ...news, [field]: event.target.value });
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchNews = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news`,
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
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("An error occurred while fetching news.");
    }
  };

  const saveNews = async () => {
    if (!news.title || !news.content) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const accessToken = getAccessToken();
      let response;

      if (isEditing && editId) {
        // Edit existing news
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${editId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(news),
          }
        );
      } else {
        // Add new news
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(news),
        });
      }

      if (response.ok) {
        fetchNews();
        handleCloseModal();
        alert(
          isEditing ? "News updated successfully!" : "News added successfully!"
        );
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving news:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteNews = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${id}`,
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
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("An error occurred while deleting news.");
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setIsEditing(true);
    setEditId(newsItem.id);
    setNews({
      title: newsItem.title,
      content: newsItem.content,
      location: newsItem.location,
      timestamp: newsItem.timestamp,
    });
    handleShowModal();
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">News</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped table-hover table-backoffice">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Location</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsList.map((data) => (
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
                                `Are you sure you want to delete the news titled "${data.title}"?`
                              );
                              if (confirmDelete) {
                                deleteNews(data.id);
                              }
                            }}
                            className="bi bi-trash3 text-danger cursor-pointer"
                            title="Delete"
                          ></i>
                        </td>
                        <td>{data.title}</td>
                        <td>{data.content}</td>
                        <td>{data.location}</td>
                        <td>
                          {format(new Date(data.timestamp), "MMMM do, yyyy")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add/Edit News Modal */}
            <div className="row mb-2">
              <div className="col-6 text-start">
                <Button className="btn btn-success" onClick={handleShowModal}>
                  <i className="bi bi-plus-lg me-1"></i>
                  Add News
                </Button>
              </div>
            </div>

            {/* React Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing ? "Edit News" : "Add News"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="title">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      value={news.title || ""}
                      onChange={(e) => updateNewsField(e, "title")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter news title"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="content">
                      Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={news.content || ""}
                      onChange={(e) => updateNewsField(e, "content")}
                      className="form-control text-black text-roboto"
                      placeholder="Enter news content"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="location">Location</label>
                    <input
                      value={news.location || ""}
                      onChange={(e) => updateNewsField(e, "location")}
                      className="form-control text-black text-roboto"
                      type="text"
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="timestamp">Timestamp</label>
                    <input
                      value={news.timestamp || ""}
                      onChange={(e) => updateNewsField(e, "timestamp")}
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
                <Button variant="blue" onClick={saveNews}>
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
