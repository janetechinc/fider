import "./Comments.scss"

import React from "react"
import { CurrentUser, Comment, Post } from "@fider/models"
import { ShowComment } from "./ShowComment"
import { CommentInput } from "./CommentInput"
import PostIllustration from "@fider/assets/images/undraw-post.svg"
import { Icon } from "@fider/components"

interface DiscussionPanelProps {
  user?: CurrentUser
  post: Post
  comments: Comment[]
}

export const DiscussionPanel = (props: DiscussionPanelProps) => {
  return (
    <div className="comments-col">
      <div className="c-comment-list">
        <span className="text-category">Discussion</span>
        <CommentInput post={props.post} />
        {props.comments.map((c) => (
          <ShowComment key={c.id} post={props.post} comment={c} />
        ))}
        {props.comments.length === 0 && (
          <div className="text-center">
            <Icon sprite={PostIllustration} height="150" />
            <p>No one has commented yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
