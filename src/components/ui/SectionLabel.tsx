interface SectionLabelProps {
  children: React.ReactNode;
  align?: "center" | "left";
}

export default function SectionLabel({ children, align = "center" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      <span
        style={{
          display: "block",
          width: "36px",
          height: "1px",
          flexShrink: 0,
          background:
            align === "center"
              ? "linear-gradient(90deg, transparent, rgba(201,160,82,0.8))"
              : "linear-gradient(90deg, rgba(201,160,82,0.7), rgba(201,160,82,0.2))",
        }}
      />
      <span
        style={{
          display: "block",
          width: "5px",
          height: "5px",
          background: "#c9a052",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: "#c9a052",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      <span
        style={{
          display: "block",
          width: "5px",
          height: "5px",
          background: "#c9a052",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          display: "block",
          width: "36px",
          height: "1px",
          flexShrink: 0,
          background:
            align === "center"
              ? "linear-gradient(90deg, rgba(201,160,82,0.8), transparent)"
              : "linear-gradient(90deg, rgba(201,160,82,0.2), rgba(201,160,82,0.7))",
        }}
      />
    </div>
  );
}
