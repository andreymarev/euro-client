import { FC } from 'react';

interface ArrowProps {
  back: boolean;
  className?: string;
}
const Arrow: FC<ArrowProps> = ({ back, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ml-3 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      transform={back ? 'rotate(180)' : 'rotate(0)'}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
};

export default Arrow;
