import React from "react";
import background from "../../assets/images/background2.jpg";

export default function HeroBanner() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        //backgroundClip: "text",
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <h1>Plane Your Next Adventure</h1>
    </div>
  );
}
