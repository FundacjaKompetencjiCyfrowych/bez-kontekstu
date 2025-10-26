import { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 294 294" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c7cff" />
          <stop offset="50%" stopColor="#6b6bdd" />
          <stop offset="100%" stopColor="#5a5acc" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="147" cy="147" r="140" fill="#252326" />

      {/* Outline */}
      <circle cx="147" cy="147" r="143" fill="none" stroke="url(#borderGradient)" strokeWidth="6" />

      {/* Hamburger */}
      <g transform="translate(75, 75)">
        <path
          d="M5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6L5 5L5 4ZM11 6L12 6L12 4L11 4L11 5L11 6ZM5 5L5 6L11 6L11 5L11 4L5 4L5 5Z"
          fill="#F5F5F5"
          transform="scale(6)"
        />
        <path
          d="M4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12L4 11L4 10ZM11 12L12 12L12 10L11 10L11 11L11 12ZM4 11L4 12L11 12L11 11L11 10L4 10L4 11Z"
          fill="#F5F5F5"
          transform="scale(6)"
        />
        <path
          d="M4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19L4 18L4 17ZM11 19L12 19L12 17L11 17L11 18L11 19ZM4 18L4 19L11 19L11 18L11 17L4 17L4 18Z"
          fill="#F5F5F5"
          transform="scale(6)"
        />
        <path
          d="M20 7C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5V6V7ZM13 5H12V7H13V6V5ZM20 6V5L13 5V6V7L20 7V6Z"
          fill="#F5F5F5"
          transform="scale(6)"
        />
        <path
          d="M20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V12V13ZM13 11L12 11V13H13V12V11ZM20 12V11H13V12V13H20V12Z"
          fill="#F5F5F5"
          transform="scale(6)"
        />
        <path
          d="M20 20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18V19V20ZM13 18H12V20H13V19V18ZM20 19V18H13V19V20H20V19Z"
          fill="#F5F5F5"
          transform="scale(6)"
        />
      </g>
    </svg>
  );
}
