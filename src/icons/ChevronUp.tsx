import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ChevronUp: React.FC<IconProps> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 12.5L10 7.5L5 12.5"
      stroke="#667085"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronUp;
