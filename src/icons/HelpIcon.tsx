import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const HelpIcon: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.55967 6.00016C5.71641 5.55461 6.02578 5.1789 6.43298 4.93958C6.84018 4.70027 7.31894 4.61279 7.78446 4.69264C8.24998 4.77249 8.67222 5.01451 8.97639 5.37585C9.28057 5.73718 9.44705 6.19451 9.44634 6.66683C9.44634 8.00016 7.44634 8.66683 7.44634 8.66683M7.49967 11.3335H7.50634M14.1663 8.00016C14.1663 11.6821 11.1816 14.6668 7.49967 14.6668C3.81778 14.6668 0.833008 11.6821 0.833008 8.00016C0.833008 4.31826 3.81778 1.3335 7.49967 1.3335C11.1816 1.3335 14.1663 4.31826 14.1663 8.00016Z"
      stroke="#98A2B3"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HelpIcon;
