"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SeasonsSection() {
  return (
    <div className="col-12 col-lg-6">
      <div className="row">
        <motion.div
          className="offset-3 col-6"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <div className="dropdown text-center dda-margintop mb-3">
            <a
              className="btn dropdown-toggle d-flex justify-content-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fs-1 text-white text-center">SEASON 1-3</span>
              <Image
                height={500}
                width={500}
                src="/images/ddarrow.png"
                alt=""
                style={{ height: "auto", width: "26px" }}
                className="my-auto ms-2"
              />
            </a>
            <ul className="dropdown-menu w-100">
              <li>
                <a className="dropdown-item" href="#">
                  SEASON 1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  SEASON 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  SEASON 3
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="row">
        <motion.div
          className="col-6 mb-4"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <Link href="/season-sports">
            <div className="picture-card">
              <Image
                height={500}
                width={500}
                src="/images/volleyball.webp"
                alt=""
                className="picture-hover picture-width"
              />
            </div>
          </Link>
          <h2 className="text-center mt-2">Girls volleyball</h2>
        </motion.div>
        <motion.div
          className="col-6 mb-4"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <Link href="/season-sports">
            <div className="picture-card">
              <Image
                height={500}
                width={500}
                src="/images/gfootball.png"
                alt=""
                className="picture-hover picture-width"
              />
            </div>
          </Link>
          <h2 className="text-center mt-2">football</h2>
        </motion.div>
        <motion.div
          className="col-6 mb-4"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <Link href="/season-sports">
            <div className="picture-card">
              <Image
                height={500}
                width={500}
                src="/images/basketball.jpeg"
                alt=""
                className="picture-hover picture-width"
              />
            </div>
          </Link>
          <h2 className="text-center mt-2">basketball</h2>
        </motion.div>
        <motion.div
          className="col-6 mb-4"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <Link href="/season-sports">
            <div className="picture-card">
              <Image
                height={500}
                width={500}
                src="/images/swimming.jpeg"
                alt=""
                className="picture-hover picture-width"
              />
            </div>
          </Link>
          <h2 className="text-center mt-2">swimming</h2>
        </motion.div>
        <motion.div
          className="col-6 mb-4"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <Link href="/season-sports">
            <div className="picture-card">
              <Image
                height={500}
                width={500}
                src="/images/volleyball.webp"
                alt=""
                className="picture-hover picture-width"
              />
            </div>
          </Link>
          <h2 className="text-center mt-2">Girls volleyball</h2>
        </motion.div>
        <motion.div
          className="col-6 mb-4"
          initial={{ opacity: 0, y: "100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <Link href="/season-sports">
            <div className="picture-card">
              <Image
                height={500}
                width={500}
                src="/images/volleyball.webp"
                alt=""
                className="picture-hover picture-width"
              />
            </div>
            <h2 className="text-center mt-2">Girls volleyball</h2>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
