import "./Avatar.scss"

import React from "react"
import { UserRole } from "@fider/models"

interface AvatarProps {
  user: {
    role?: UserRole
    avatarURL: string
    name: string
  }
}

export const Avatar = (props: AvatarProps) => {
  return <img className="c-avatar" alt={props.user.name} src={`${props.user.avatarURL}?size=50`} />
}
