"use client";

import { useEffect, useState } from "react";

export default function BannerSection() {
  const [banner, setBanner] = useState({ id: null, title: "", videoUrl: null });

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = banner?.title;
    }
  }, [banner]);

  const fetchBanner = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
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

  return (
    <section className="background-picture-sp d-flex flex-column justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="fs-80">{banner?.title}</h1>
          </div>
        </div>
      </div>
      <div className="banner-video">
        <video
          className=""
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${banner?.videoUrl}`}
          autoPlay
          muted
          loop
        ></video>
      </div>
    </section>
  );
}
