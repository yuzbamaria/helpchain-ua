import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const SuccessIcon: React.FC<IconProps> = (props) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="56" height="56" rx="28" fill="#D1FADF" />
    <path
      d="M39.6673 26.9267V28C39.6659 30.5158 38.8512 32.9638 37.3449 34.9788C35.8385 36.9938 33.7211 38.4679 31.3086 39.1812C28.896 39.8945 26.3175 39.8089 23.9575 38.937C21.5976 38.0652 19.5827 36.4538 18.2134 34.3433C16.8441 32.2327 16.1937 29.7361 16.3593 27.2257C16.5248 24.7153 17.4974 22.3257 19.132 20.4133C20.7666 18.5008 22.9756 17.168 25.4295 16.6135C27.8835 16.0591 30.451 16.3127 32.749 17.3367M39.6673 18.6667L28.0007 30.345L24.5007 26.845"
      stroke="#039855"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SuccessIcon;
