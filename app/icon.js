import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#060608",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF", // High-contrast clean white letter
          fontWeight: 800,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.25)", // Translucent white border ring
          fontFamily: "sans-serif",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
