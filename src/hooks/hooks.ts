import { useState, useEffect } from 'react'
import { RootState } from '../state/store'
import { useSelector } from 'react-redux'

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

export const useSelectedGroup = () => {
  const groups = useSelector((state: RootState) => state.groups.groups)
  const selectedGroupId = useSelector((state: RootState) => state.main.selectedGroupId)

  if (selectedGroupId)
    return groups[selectedGroupId]
  return null
}