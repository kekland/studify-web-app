import { useState } from 'react'

export const useModal = (_isOpen: boolean) => {
  const [isOpen, setIsOpen] = useState(_isOpen)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close, onClose: close }
}