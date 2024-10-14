"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ScoreboardSection() {
  const score_title = ["football", "badminton", "soccer", "volleyball"];

  return (
    <motion.div
      className="col-12 col-lg-6 mb-4"
      initial={{ opacity: 0, y: "100px" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "Tween", stiffness: 100 }}
    >
      <h1 className="fs-1 text-white text-center">scoreboard</h1>
      <div className="card border-0">
        <div className="card-body card-lightbluecolor p-5">
          {score_title.map((data) => {
            return (
              <motion.div
                key={data}
                initial={{ opacity: 0, y: "100px" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "Tween", stiffness: 100 }}
              >
                <div className="row mb-2">
                  <div className="col-12">
                    <h2 className="text-center text-white">{data}</h2>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-5 bg-white h-50 my-auto shadow d-flex justify-content-center rounded-start">
                    <Image
                      height={500}
                      width={500}
                      src="/images/PantherHead_500x302_shadow.png"
                      alt=""
                      className="me-2"
                      style={{ height: "40px", width: "auto" }}
                    />
                    <p className="m-0 fs-3 blue-text">Panther</p>
                  </div>
                  <div className="col-2 bg-orange p-1 text-center rounded-3 shadow">
                    <h1 className="m-0 text-white">2 : 1</h1>
                  </div>
                  <div className="col-5 bg-white h-50 my-auto shadow d-flex justify-content-center rounded-end position-relative">
                    <Image
                      height={500}
                      width={500}
                      src="/images/RIS-Phoenix-logo-819x1024.png"
                      alt=""
                      className="me-2"
                      style={{ height: "40px", width: "auto" }}
                    />
                    <p className="m-0 fs-3 blue-text">Phoenix</p>
                    <Link
                      target="_blank"
                      href={
                        "https://www.youtube.com/embed/-4NCjjcF7y8?controls=0&rel=0&playsinline=1&enablejsapi=1&origin=https%3A%2F%2Fwww.rism.ac.th&widgetid=1"
                      }
                      className="live-link"
                    >
                      {" "}
                      <i className="bi bi-circle-fill text-danger me-1"></i>{" "}
                      Watch Live!
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
