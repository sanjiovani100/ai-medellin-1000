import React from "react"

interface MedellinAILogoProps {
  className?: string
}

/**
 * MedellinAI Logo Component
 *
 * Renders the Medellín AI logo with responsive sizing
 * and gradient effects.
 */
export const MedellinAILogo = ({ className = "" }: MedellinAILogoProps) => {
  // Generate a unique ID for the gradient to prevent conflicts when multiple instances are used
  const gradientId = React.useId()

  return (
    <div
      className={`xs:gap-2.5 flex items-center gap-2 transition-all duration-300 ease-in-out will-change-transform sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5 ${className}`}
      aria-label="Medellín AI Logo"
    >
      <div className="xs:text-base bg-gradient-to-r from-[#F97316] via-[#D946EF] to-[#8B5CF6] bg-clip-text text-sm font-bold text-transparent transition-all duration-300 ease-in-out will-change-transform select-none sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Medellín
      </div>

      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="xs:h-5 xs:w-5 h-4 w-4 transition-all duration-300 ease-in-out will-change-transform select-none sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9"
        style={{ aspectRatio: "1/1" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Outer circle with gradient */}
        <path
          d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM30 50C19 50 10 41 10 30C10 19 19 10 30 10C41 10 50 19 50 30C50 41 41 50 30 50Z"
          fill={`url(#${gradientId})`}
        />

        {/* Inner square with white fill */}
        <path
          d="M30 15C21.7 15 15 21.7 15 30C15 38.3 21.7 45 30 45C38.3 45 45 38.3 45 30C45 21.7 38.3 15 30 15ZM35 35H25V25H35V35Z"
          fill="white"
        />

        {/* AI text - using path instead of text for better cross-browser compatibility */}
        <g fill={`url(#${gradientId})`} transform="translate(18, 25)">
          {/* A letter */}
          <path d="M8.5 0L11.5 9H9.8L9 6.5H4L3.2 9H1.5L4.5 0H8.5ZM6.5 2L4.7 5H8.3L6.5 2Z" />
          {/* I letter */}
          <path d="M15 0V9H13V0H15Z" />
        </g>
      </svg>
    </div>
  )
}

export default MedellinAILogo