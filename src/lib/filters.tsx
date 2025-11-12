import React from 'react'

/**
 * SVG filter definitions for the painted portrait effect.
 * Uses feTurbulence for watercolor edge, feGaussianBlur for bloom,
 * and feDisplacementMap for subtle distortion.
 */
export const SvgDefs: React.FC = () => {
  return (
    <svg className="hidden">
      <defs>
        {/* Watercolor edge effect with turbulence */}
        <filter id="watercolorEdge" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            baseFrequency="0.9"
            numOctaves="4"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="1" />
        </filter>

        {/* Paper grain texture */}
        <filter id="paperGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            baseFrequency="0.04"
            numOctaves="3"
            result="noise"
            seed="1"
          />
          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
          />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0.3 0.5 0.7 1" />
          </feComponentTransfer>
        </filter>

        {/* Ink bleed effect */}
        <filter id="inkBleed" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
          <feFlood floodColor="#0E0E10" floodOpacity="0.3" />
          <feComposite in2="offsetBlur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle painted effect - minimal blur for clarity */}
        <filter id="paintedPortrait" x="-20%" y="-20%" width="140%" height="140%">
          {/* Very subtle texture only - no blur */}
          <feTurbulence
            baseFrequency="0.02"
            numOctaves="2"
            result="turbulence"
            seed="3"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="0.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

