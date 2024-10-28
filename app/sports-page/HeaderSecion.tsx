"use client";

import Image from "next/image";

export default function HeaderPage() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg position-absolute top-0 start-0 end-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://www.rism.ac.th/">
            <Image
              height={500}
              width={500}
              src="/images/RIS-logo.png"
              alt="RIS Logo"
              className="img-fluid"
              style={{ maxHeight: "55px", width: "auto" }}
            />
          </a>
          {/* <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item fs-3 mx-lg-5 mx-4 text-end">
                <a className="nav-link text-white" href="#">
                  Club
                </a>
              </li>
              <li className="nav-item fs-3 mx-lg-5 mx-4 text-end">
                <a className="nav-link text-white" href="#">
                  Sports
                </a>
              </li>
              <li className="nav-item fs-3 mx-lg-5 mx-4 text-end">
                <a className="nav-link text-white" href="#">
                  Grade
                </a>
              </li>
              <li className="nav-item fs-3 mx-lg-5 mx-4 text-end">
                <a className="nav-link text-white" href="#">
                  Points
                </a>
              </li>
              <li className="nav-item fs-3 mx-lg-5 mx-4 text-end">
                <a className="nav-link text-white" href="qa.html">
                  Q&amp;A
                </a>
              </li>
            </ul>
            <Image 
                            height={500}
                            width={500}
                            src="/images/icon.png"
                            alt=""
                            style={{height: '45px', width: 'auto'}}
                        />
          </div> */}
        </div>
      </nav>
    </header>
  );
}
