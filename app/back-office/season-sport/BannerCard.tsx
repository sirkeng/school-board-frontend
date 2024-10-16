"use client";

import React, { useState, useEffect } from "react";

interface BannerCardProps {
  bannerTitle: string;
  bannerImageUrl: File | string | null;
  updateSeasonSport: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
  saveBannerCard: () => void;
}

export default function BannerCard({
  bannerTitle,
  bannerImageUrl,
  updateSeasonSport,
  saveBannerCard,
}: BannerCardProps) {
  const [bannerForm, setBannerForm] = useState({
    bannerTitle: bannerTitle || "",
    bannerImage: bannerImageUrl || "",
  });

  useEffect(() => {
    setBannerForm((prevBannerForm) => ({
      ...prevBannerForm,
      bannerTitle: bannerTitle || prevBannerForm.bannerTitle,
      bannerImage: bannerImageUrl || prevBannerForm.bannerImage,
    }));
  }, [bannerTitle, bannerImageUrl]);

  const handleSaveBanner = () => {
    if (bannerForm.bannerTitle.length === 0) {
      alert("Please provide a title");
    } else if (!bannerForm.bannerImage) {
      alert("Please provide a background picture");
    } else {
      saveBannerCard();
    }
  };

  const handleUpdateBanner = (event, key) => {
    const value =
      key === "bannerImage" ? event.target.files[0] : event.target.value;
    const updatedBanner = { ...bannerForm, [key]: value };
    setBannerForm(updatedBanner);
    updateSeasonSport(event, key);
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
                  value={bannerForm.bannerTitle}
                  onChange={(event) => handleUpdateBanner(event, "bannerTitle")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="bannerImage" className="form-label">
                  Banner Picture:
                </label>
                <input
                  id="bannerImage"
                  onChange={(event) => handleUpdateBanner(event, "bannerImage")}
                  type="file"
                  className="form-control"
                />
                {bannerForm.bannerImage &&
                  typeof bannerForm.bannerImage === "string" && (
                    <div className="mt-2">
                      <strong>Current Image:</strong>{" "}
                      {bannerForm.bannerImage.split("/").pop()}
                    </div>
                  )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button className="btn btn-blue" onClick={handleSaveBanner}>
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
