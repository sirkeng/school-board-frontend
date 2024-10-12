"use client";

import Image from "next/image";
import "../css/login.css";
import "next/image";
import "../css/main.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    if (username.length == 0) {
      alert("Please Enter your username");
    } else if (password.length == 0) {
      alert("Please Enter your password");
    } else {
      // Enter both input
      // CALL API
      const json_body = JSON.stringify({
        email: "yujuns27@rism.ac.th",
        password: "test123",
      });
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
        const resp = await fetch(apiUrl, {
          method: "POST",
          body: json_body,
        });
        const json = await resp.json();
        console.log(json);
      } catch (err) {
        console.log(err);
      }

      if (username == "me@gmail.com" && password == "helloworld") {
        router.push("/back-office/dashboard");
      } else {
        alert("Incorrect Username or Password");
      }
    }
  }

  return (
    <main>
      <div className="background-image" />
      <div className="background-overlay" />
      <div className="login-container">
        <div className="login-form">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-12">
                <h3>Email Address</h3>
                {/* Input for Email Address */}
                <input
                  type="email"
                  className="form-control w-100"
                  placeholder="yourname@rism.ac.th"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h3>Password</h3>
                {/* Input for Password */}
                <input
                  type="password"
                  className="form-control w-100"
                  placeholder="write something..."
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <button className="btn btn-orange" onClick={login}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="login-info">
          <Image
            height={500}
            width={500}
            src="/images/risr-logo-2.png"
            alt="RIS High School Portal Logo"
            className=""
            style={{ height: "auto", width: "250px" }}
          />

          <h3>High School Portal</h3>
        </div>
        <button
          type="button"
          className="btn-close form-close"
          aria-label="Close"
        ></button>
      </div>
    </main>
  );
}
