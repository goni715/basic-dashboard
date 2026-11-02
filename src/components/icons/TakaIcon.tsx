import React from "react";

export function TakaIcon({
  className = "h-4 w-4",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Taka symbol ৳ */}
      {/* Cross horizontal slash */}
      <line x1="5" y1="11" x2="19" y2="11" />
      {/* Upper loop to vertical stem and base curve */}
      <path d="M16 6a3.5 3.5 0 0 0-3.5-3.5H9a2.5 2.5 0 0 0-2.5 2.5v12a3.5 3.5 0 0 0 3.5 3.5h3a4 4 0 0 0 4-4v-3a3 3 0 0 0-3-3H9" />
    </svg>
  );
}

export default TakaIcon;
