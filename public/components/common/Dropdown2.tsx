import "./Dropdown2.scss"

import React, { useEffect, useRef, useState } from "react"
import { classSet } from "@fider/services"

interface Dropdown2ListItemProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
}

const ListItem = (props: Dropdown2ListItemProps) => {
  if (props.href) {
    return (
      <a href={props.href} className="c-dropdown2__listitem">
        {props.children}
      </a>
    )
  }

  return (
    <div onClick={props.onClick} className="c-dropdown2__listitem">
      {props.children}
    </div>
  )
}

const Divider = () => {
  return <hr className="c-dropdown2__divider" />
}

interface Dropdown2Props {
  renderHandle: JSX.Element
  position?: "left" | "right"
  children: React.ReactNode
}

export const Dropdown2 = (props: Dropdown2Props) => {
  const node = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const position = props.position || "right"

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

  const listClassName = classSet({
    "c-dropdown2__list shadow-lg": true,
    [`c-dropdown2__list--${position}`]: position === "left",
  })

  return (
    <div ref={node} className="c-dropdown2">
      <button type="button" className="c-dropdown2__handle" onClick={toggleIsOpen}>
        {props.renderHandle}
      </button>
      {isOpen && <div className={listClassName}>{props.children}</div>}
    </div>
  )
}

Dropdown2.ListItem = ListItem
Dropdown2.Divider = Divider
