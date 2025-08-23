import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        textAlign: "center",
        marginTop: "auto",
        borderTop: "1px solid #dee2e6",
      }}
    >
      <div>
        <p style={{ margin: "0", color: "#6c757d" }}>
          © 2024 Travel Planner. Made with ❤️ for travelers around the world.
        </p>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#adb5bd" }}>
          Explore countries, plan trips, and discover amazing destinations.
        </p>
      </div>
    </footer>
  );
}
