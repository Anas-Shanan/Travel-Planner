import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          fontSize: "120px",
          fontWeight: "bold",
          color: "#6c757d",
          margin: "0",
        }}
      >
        404
      </div>
      <h1 style={{ color: "#495057", margin: "20px 0" }}>
        Oops! Page Not Found
      </h1>
      <p style={{ color: "#6c757d", fontSize: "18px", marginBottom: "30px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
