import React from "react";

type LeetCodeProps = React.SVGProps<SVGSVGElement>;

const LeetCode: React.FC<LeetCodeProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="M128 16C66.393 16 16 66.393 16 128s50.393 112 112 112 112-50.393 112-112S189.607 16 128 16zm-9.6 62.4 22.4 22.4-35.2 35.2 35.2 35.2-22.4 22.4-57.6-57.6 57.6-57.6zm35.2 22.4 22.4-22.4 57.6 57.6-57.6 57.6-22.4-22.4 35.2-35.2-35.2-35.2z" />
  </svg>
);

export default LeetCode;
