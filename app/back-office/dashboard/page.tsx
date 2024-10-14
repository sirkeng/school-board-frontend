"use client";

import React, { useEffect } from "react";
import withAuth from "../../components/withAuth";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

function Dashboard() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !sessionStorage.getItem("hasRefreshed")
    ) {
      window.location.reload();
      sessionStorage.setItem("hasRefreshed", "true");
    }
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} className="text-center">
          <h1>Welcome back!</h1>
          <p>
            We hope you&apos;re having a great day. Where would you like to go
            next?
          </p>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col xs={12} md={6} className="mb-3">
          <Link href="/back-office/season-sport" passHref>
            <Button variant="primary" className="w-100">
              Go to Season Sports
            </Button>
          </Link>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Link href="/back-office/sports-page" passHref>
            <Button variant="secondary" className="w-100">
              Go to Sports Page
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default withAuth(Dashboard);
