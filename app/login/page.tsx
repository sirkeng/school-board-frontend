"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "../css/login.css";
import "../css/main.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!username) {
      alert("Please enter your username");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    const requestBody = JSON.stringify({
      email: username,
      password: password,
    });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.message) {
          alert(errorData.message);
        } else {
          throw new Error("Network response was not ok");
        }
        return;
      }

      const data = await response.json();

      if (data.message === "Login successful.") {
        // Store the access token and refresh token in local storage
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("refreshToken", data?.refreshToken);

        // Redirect to back-office
        router.push("/back-office/sports-page");
      } else {
        alert("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("There was a problem with the login request:", error);
      alert("An error occurred. Please try again later.");
    }
  };

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
