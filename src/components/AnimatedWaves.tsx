import { useEffect, useRef, useState } from 'react'

interface AnimatedWavesProps {
  className?: string
}

export const AnimatedWaves: React.FC<AnimatedWavesProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate wave paths using requestAnimationFrame for smooth motion
  useEffect(() => {
    let time = 0
    const animate = () => {
      time += 0.016 // ~60fps
      
      if (wave1Ref.current) {
        const offset1 = Math.sin(time * 0.5) * 30 // Slow, deep wave
        const path1 = `M0,400 Q150,${350 + offset1} 300,400 T600,400 T900,400 T1200,400 L1200,800 L0,800 Z`
        wave1Ref.current.setAttribute('d', path1)
      }
      
      if (wave2Ref.current) {
        const offset2 = Math.sin(time * 0.7 + 1) * 25 // Medium wave
        const path2 = `M0,450 Q200,${400 + offset2} 400,450 T800,450 T1200,450 L1200,800 L0,800 Z`
        wave2Ref.current.setAttribute('d', path2)
      }
      
      if (wave3Ref.current) {
        const offset3 = Math.sin(time * 1.2 + 0.5) * 20 // Fast surface wave
        const path3 = `M0,500 Q180,${460 + offset3} 360,500 T720,500 T1080,500 L1200,500 L1200,800 L0,800 Z`
        wave3Ref.current.setAttribute('d', path3)
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Calculate parallax offset based on scroll
  const parallaxOffset = scrollY * 0.3

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Multiple wave layers for depth */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <defs>
          {/* Gradient for wave depth */}
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A0A0C" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0C0C0E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0E0E10" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0C0C0E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0E0E10" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Wave Layer 1 - Deep, slow moving */}
        <path
          ref={wave1Ref}
          d="M0,400 Q150,350 300,400 T600,400 T900,400 T1200,400 L1200,800 L0,800 Z"
          fill="url(#waveGrad1)"
          className="wave-layer-1"
        />

        {/* Wave Layer 2 - Medium depth */}
        <path
          ref={wave2Ref}
          d="M0,450 Q200,400 400,450 T800,450 T1200,450 L1200,800 L0,800 Z"
          fill="url(#waveGrad2)"
          className="wave-layer-2"
        />

        {/* Wave Layer 3 - Surface, faster */}
        <path
          ref={wave3Ref}
          d="M0,500 Q180,460 360,500 T720,500 T1080,500 L1200,500 L1200,800 L0,800 Z"
          fill="#0E0E10"
          fillOpacity="0.2"
          className="wave-layer-3"
        />
      </svg>

      {/* Additional subtle wave texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 Q100,80 200,100 T400,100' stroke='%230E0E10' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 200px',
          animation: 'waveTexture 10s linear infinite',
          transform: `translateY(${parallaxOffset * 0.5}px)`,
        }}
      />
    </div>
  )
}

