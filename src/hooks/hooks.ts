import { useState, useEffect } from 'react'

export const useScreenSize = (breakpoint: number) => {
  const [screenSize, setScreenSize] = useState(window.screen.width)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.screen.width)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (screenSize < breakpoint)
}