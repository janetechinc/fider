import "./ListPosts.scss"

import React from "react"
import { Post, Tag, CurrentUser } from "@fider/models"
import { ShowTag, ShowPostResponse, VoteCounter, MultiLineText, ListItem, List, Icon } from "@fider/components"
import IconChatAlt2 from "@fider/assets/images/heroicons-chat-alt-2.svg"
import { HStack } from "@fider/components/layout"

interface ListPostsProps {
  posts?: Post[]
  tags: Tag[]
  emptyText: string
}

const ListPostItem = (props: { post: Post; user?: CurrentUser; tags: Tag[] }) => {
  return (
    <ListItem>
      <VoteCounter post={props.post} />
      <div className="c-list-item-content">
        {props.post.commentsCount > 0 && (
          <HStack className="text-muted right">
            {props.post.commentsCount} <Icon sprite={IconChatAlt2} className="h-4 ml-1" />
          </HStack>
        )}
        <a className="c-list-item-title text-title" href={`/posts/${props.post.number}/${props.post.slug}`}>
          {props.post.title}
        </a>
        <MultiLineText className="c-list-item-description" maxLength={300} text={props.post.description} style="plainText" />
        <ShowPostResponse showUser={false} status={props.post.status} response={props.post.response} />
        {props.tags.map((tag) => (
          <ShowTag key={tag.id} tag={tag} />
        ))}
      </div>
    </ListItem>
  )
}

export const ListPosts = (props: ListPostsProps) => {
  if (!props.posts) {
    return null
  }

  if (props.posts.length === 0) {
    return <p className="text-center">{props.emptyText}</p>
  }

  return (
    <List className="c-post-list" divided={true}>
      {props.posts.map((post) => (
        <ListPostItem key={post.id} post={post} tags={props.tags.filter((tag) => post.tags.indexOf(tag.slug) >= 0)} />
      ))}
    </List>
  )
}
