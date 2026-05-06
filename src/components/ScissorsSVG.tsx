import type { CSSProperties } from "react";

type Props = {
  className?: string;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

/** Pure SVG scissors silhouette — no external image dependency. */
export default function ScissorsSVG({ className, color = "#0099CC", strokeWidth = 1.5, style }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M50 165 L120 95 L180 35" />
      <path d="M50 35 L120 105 L180 165" />
      <circle cx="120" cy="100" r="6" />
      <circle cx="38" cy="165" r="22" />
      <circle cx="38" cy="35" r="22" />
      <path d="M170 38 L180 35 L177 45" />
      <path d="M170 162 L180 165 L177 155" />
    </svg>
  );
}
