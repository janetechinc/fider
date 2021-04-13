import "./Heading.scss"

import React from "react"
import { classSet } from "@fider/services"

interface HeadingLogo {
  title: string
  subtitle?: string
  className?: string
}

export const Heading = (props: HeadingLogo) => {
  const className = classSet({
    "c-heading": true,
    [`${props.className}`]: props.className,
  })

  return (
    <div className={className}>
      <div className="c-heading-content">
        {props.title}
        <div className="c-heading-subtitle">{props.subtitle}</div>
      </div>
    </div>
  )
}
