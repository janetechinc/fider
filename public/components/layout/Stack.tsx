import React from "react"
import { classSet } from "@fider/services"

interface StackProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  justify?: "between" | "evenly"
  spacing?: 0 | 1 | 2 | 3 | 4 | 6
}

const Stack = (props: StackProps, dir: "x" | "y") => {
  const spacing = props.spacing || 1
  const className = classSet({
    [`${props.className}`]: props.className,
    [`flex flex--spacing-${spacing}`]: true,
    "flex-x": dir === "x",
    "flex-y": dir === "y",
    "justify-between": props.justify === "between",
    "justify-evenly": props.justify === "evenly",
  })

  return (
    <div onClick={props.onClick} className={className}>
      {props.children}
    </div>
  )
}

export const HStack = (props: StackProps) => {
  return Stack(props, "x")
}

export const VStack = (props: StackProps) => {
  return Stack(props, "y")
}
