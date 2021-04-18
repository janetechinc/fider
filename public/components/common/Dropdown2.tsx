import "./Dropdown2.scss"

import React, { useEffect, useRef, useState } from "react"

interface Dropdown2Props {
  renderHandle: JSX.Element
  children: React.ReactNode
}

export const Dropdown2 = (props: Dropdown2Props) => {
  const node = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = (e: MouseEvent) => {
    if (node.current && node.current.contains(e.target as Node)) {
      return
    }
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])

  return (
    <div ref={node} className="c-dropdown2">
      <button type="button" className="c-dropdown2__handle" onClick={toggleIsOpen}>
        {props.renderHandle}
      </button>
      {isOpen && <div className="c-dropdown2__list shadow-lg w-full">{props.children}</div>}
    </div>
  )
}
