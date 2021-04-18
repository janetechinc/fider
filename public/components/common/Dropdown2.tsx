import "./Dropdown2.scss"

import React, { useEffect, useRef, useState } from "react"
import { classSet } from "@fider/services"

interface Dropdown2ListProps {
  position?: "left" | "right"
  children: React.ReactNode
}

const List = (props: Dropdown2ListProps) => {
  const position = props.position || "right"
  const listClassName = classSet({
    "c-dropdown2__list shadow-lg": true,
    [`c-dropdown2__list--${position}`]: position === "left",
  })

  return <div className={listClassName}>{props.children}</div>
}

const ListItem = (props: { children: React.ReactNode }) => {
  return <div className="c-dropdown2__listitem">{props.children}</div>
}

const Divider = () => {
  return <hr className="c-dropdown2__divider" />
}

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
      {isOpen && props.children}
    </div>
  )
}

Dropdown2.List = List
Dropdown2.ListItem = ListItem
Dropdown2.Divider = Divider
