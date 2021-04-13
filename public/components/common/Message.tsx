import "./Message.scss"

import React from "react"
import { classSet } from "@fider/services"
import IconCheckCircle from "@fider/assets/images/heroicons-check-circle.svg"
import IconExclamationCircle from "@fider/assets/images/heroicons-exclamation-circle.svg"
import IconExclamation from "@fider/assets/images/heroicons-exclamation.svg"

import { HStack } from "./layout"

interface MessageProps {
  type: "success" | "warning" | "error"
  showIcon?: boolean
}

export const Message: React.FunctionComponent<MessageProps> = (props) => {
  const className = classSet({
    "c-message": true,
    [`m-${props.type}`]: true,
  })

  const icon = props.type === "error" ? <IconExclamation /> : props.type === "warning" ? <IconExclamationCircle /> : <IconCheckCircle />

  return (
    <HStack className={className}>
      {props.showIcon === true && icon}
      <span>{props.children}</span>
    </HStack>
  )
}
