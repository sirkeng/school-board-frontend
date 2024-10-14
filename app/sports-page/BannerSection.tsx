"use client";

export default function BannerSection() {
  return (
    <section className="background-picture-sp d-flex flex-column justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="fs-80">Hs Sports</h1>
          </div>
        </div>
      </div>
      <div className="banner-video">
        <video
          className=""
          src="/video/SchoolVid.mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>
    </section>
  );
}
