import React from 'react'

function Time({ fillColor, strokeColor }) {
  return (
    <svg
      width="36"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="17.559"
        cy="16"
        rx="17.4624"
        ry="16"
        fill={fillColor}
      />
      <path
        d="M15.0002 22.6667C18.6821 22.6667 21.6668 19.6819 21.6668 16C21.6668 12.3181 18.6821 9.33337 15.0002 9.33337C11.3183 9.33337 8.3335 12.3181 8.3335 16C8.3335 19.6819 11.3183 22.6667 15.0002 22.6667Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12V16L17.6667 17.3333"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Time
