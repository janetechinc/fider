import React from "react"
import { Tag } from "@fider/models"
import { ShowTag } from "@fider/components"
import IconCheck from "@fider/assets/images/heroicons-check.svg"
import { HStack } from "@fider/components/layout"

interface TagListItemProps {
  tag: Tag
  assigned: boolean
  onClick: (tag: Tag) => void
}

export const TagListItem = (props: TagListItemProps) => {
  const onClick = () => {
    props.onClick(props.tag)
  }

  return (
    <HStack className="c-tag-list" onClick={onClick}>
      {props.assigned && <IconCheck className="h-4 mr-1" />}
      <ShowTag tag={props.tag} circular={true} />
      <span>{props.tag.name}</span>
    </HStack>
  )
}
