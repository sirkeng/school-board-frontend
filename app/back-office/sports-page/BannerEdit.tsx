"use client";

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function BannerEdit() {
  const { handleAuthError } = useAuth();
  const [banner, setBanner] = useState({ id: null, title: "", videoUrl: null });

  useEffect(() => {
    fetchBanner();
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchBanner = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner`,
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
      if (data) {
        setBanner(data);
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
      alert("An error occurred while fetching the banner.");
    }
  };

  const updateBanner = (event, key) => {
    const value =
      key === "videoUrl" ? event.target.files[0] : event.target.value;
    setBanner({ ...banner, [key]: value });
  };

  const saveBanner = async () => {
    if (!banner.title) {
      alert("Please enter the banner title.");
      return;
    }
    try {
      const accessToken = getAccessToken();
      const formData = new FormData();
      formData.append("title", banner.title);
      if (banner.videoUrl instanceof File) {
        formData.append("video", banner.videoUrl);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/${banner.id || ""}`,
        {
          method: banner.id ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(
          banner.id
            ? "Banner updated successfully!"
            : "Banner created successfully!"
        );
        fetchBanner();
      } else {
        await handleAuthError(response);
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      alert(`An error occurred: ${error.message || "Something went wrong."}`);
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Banner</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="bannerTitle" className="form-label">
                  Banner Title:
                </label>
                <input
                  id="bannerTitle"
                  value={banner.title}
                  onChange={(event) => updateBanner(event, "title")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="bannerVideo" className="form-label">
                  Banner Video:
                </label>
                <input
                  id="bannerVideo"
                  onChange={(event) => updateBanner(event, "videoUrl")}
                  type="file"
                  className="form-control"
                />
                {banner.videoUrl && typeof banner.videoUrl === "string" && (
                  <div className="mt-2">
                    <strong>Current Video:</strong>{" "}
                    {banner.videoUrl.split("/").pop()}
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <Button className="btn btn-blue" onClick={saveBanner}>
                  SAVE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
