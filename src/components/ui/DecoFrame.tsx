import React from "react";

export default function DecoFrame({
  size = 26,
  opacity = 0.45,
}: {
  size?: number;
  opacity?: number;
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: `rgba(201,160,82,${opacity})`,
    borderStyle: "solid",
    pointerEvents: "none",
    zIndex: 2,
  };
  return (
    <>
      <span style={{ ...base, top: 0, left: 0, borderWidth: "1.5px 0 0 1.5px", borderRadius: "2px 0 0 0" }} />
      <span style={{ ...base, top: 0, right: 0, borderWidth: "1.5px 1.5px 0 0", borderRadius: "0 2px 0 0" }} />
      <span style={{ ...base, bottom: 0, left: 0, borderWidth: "0 0 1.5px 1.5px", borderRadius: "0 0 0 2px" }} />
      <span style={{ ...base, bottom: 0, right: 0, borderWidth: "0 1.5px 1.5px 0", borderRadius: "0 0 2px 0" }} />
    </>
  );
}
