"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap"; // Import React Bootstrap components
import { useAuth } from "../../context/AuthContext";

// Define the type for news items
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

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("An error occurred while fetching news.");
    }
  };

  const addNews = async () => {
    if (!news.title) {
      alert("Please enter a title");
      return;
    }

    if (!news.content) {
      alert("Please enter content");
      return;
    }

    try {
      const accessToken = getAccessToken(); // Retrieve token for authorization
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach token to Authorization header
            "Content-Type": "application/json",
          },
          body: JSON.stringify(news),
        }
      );
      if (response.status === 201) {
        fetchNews(); // Refresh the news list

        handleCloseModal(); // Close modal after successful submission

        // Clear input fields after success
        setNews({
          title: "",
          content: "",
          location: "",
          timestamp: "",
        });

        alert("News added successfully!");
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error adding news:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  const deleteNews = async (id: number) => {
    try {
      const accessToken = getAccessToken(); // Retrieve token for authorization
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach token to Authorization header
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("An error occurred while deleting news.");
    }
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

            {/* Add News Modal */}
            <div className="row mb-2">
              <div className="col-6 text-start">
                <Button className="btn btn-success" onClick={handleShowModal}>
                  <i className="bi bi-plus-lg me-1"></i>
                  Add News
                </Button>
              </div>
              {/* <div className="col-6 text-end">
                <Button className="btn btn-blue" onClick={() => saveAllNews()}>
                  SAVE
                </Button>
              </div> */}
            </div>

            {/* React Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add News</Modal.Title>
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
                <Button variant="blue" onClick={addNews}>
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
