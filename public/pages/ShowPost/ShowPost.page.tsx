import "./ShowPost.page.scss"

import React from "react"

import { Comment, Post, Tag, Vote, ImageUpload } from "@fider/models"
import { actions, Failure, Fider } from "@fider/services"

import {
  VoteCounter,
  ShowPostResponse,
  Button,
  UserName,
  Moment,
  MultiLineText,
  List,
  ListItem,
  Input,
  Form,
  TextArea,
  MultiImageUploader,
  ImageViewer,
  Icon,
} from "@fider/components"
import { ResponseForm } from "./components/ResponseForm"
import { TagsPanel } from "./components/TagsPanel"
import { NotificationsPanel } from "./components/NotificationsPanel"
import { ModerationPanel } from "./components/ModerationPanel"
import { DiscussionPanel } from "./components/DiscussionPanel"
import { VotesPanel } from "./components/VotesPanel"

import IconX from "@fider/assets/images/heroicons-x.svg"
import IconPencilAlt from "@fider/assets/images/heroicons-pencil-alt.svg"
import IconCheck from "@fider/assets/images/heroicons-check.svg"

interface ShowPostPageProps {
  post: Post
  subscribed: boolean
  comments: Comment[]
  tags: Tag[]
  votes: Vote[]
  attachments: string[]
}

interface ShowPostPageState {
  editMode: boolean
  newTitle: string
  attachments: ImageUpload[]
  newDescription: string
  error?: Failure
}

export default class ShowPostPage extends React.Component<ShowPostPageProps, ShowPostPageState> {
  constructor(props: ShowPostPageProps) {
    super(props)

    this.state = {
      editMode: false,
      newTitle: this.props.post.title,
      newDescription: this.props.post.description,
      attachments: [],
    }
  }

  private saveChanges = async () => {
    const result = await actions.updatePost(this.props.post.number, this.state.newTitle, this.state.newDescription, this.state.attachments)
    if (result.ok) {
      location.reload()
    } else {
      this.setState({
        error: result.error,
      })
    }
  }

  private setNewTitle = (newTitle: string) => {
    this.setState({ newTitle })
  }

  private setNewDescription = (newDescription: string) => {
    this.setState({ newDescription })
  }

  private setAttachments = (attachments: ImageUpload[]) => {
    this.setState({ attachments })
  }

  private cancelEdit = async () => {
    this.setState({ error: undefined, editMode: false })
  }

  private startEdit = async () => {
    this.setState({ editMode: true })
  }

  public render() {
    return (
      <div id="p-show-post" className="page container">
        <div className="header-col">
          <List>
            <ListItem>
              <VoteCounter post={this.props.post} />

              <div className="post-header">
                {this.state.editMode ? (
                  <Form error={this.state.error}>
                    <Input field="title" maxLength={100} value={this.state.newTitle} onChange={this.setNewTitle} />
                  </Form>
                ) : (
                  <h1 className="text-display2">{this.props.post.title}</h1>
                )}

                <span className="text-muted">
                  Posted by <UserName user={this.props.post.user} /> &middot; <Moment date={this.props.post.createdAt} />
                </span>
              </div>
            </ListItem>
          </List>

          <span className="text-category">Description</span>
          {this.state.editMode ? (
            <Form error={this.state.error}>
              <TextArea field="description" value={this.state.newDescription} onChange={this.setNewDescription} />
              <MultiImageUploader field="attachments" bkeys={this.props.attachments} maxUploads={3} onChange={this.setAttachments} />
            </Form>
          ) : (
            <>
              {this.props.post.description && <MultiLineText className="description" text={this.props.post.description} style="full" />}
              {!this.props.post.description && <em className="text-muted">No description provided.</em>}
              {this.props.attachments.map((x) => (
                <ImageViewer key={x} bkey={x} />
              ))}
            </>
          )}
          <ShowPostResponse showUser={true} status={this.props.post.status} response={this.props.post.response} />
        </div>

        <div className="action-col">
          <VotesPanel post={this.props.post} votes={this.props.votes} />

          {Fider.session.isAuthenticated &&
            Fider.session.user.isCollaborator && [
              <span key={0} className="text-category">
                Actions
              </span>,
              this.state.editMode ? (
                <List key={1}>
                  <ListItem>
                    <Button className="w-full" variant="primary" onClick={this.saveChanges}>
                      <Icon sprite={IconCheck} /> <span>Save</span>
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button className="w-full" onClick={this.cancelEdit}>
                      <Icon sprite={IconX} /> <span>Cancel</span>
                    </Button>
                  </ListItem>
                </List>
              ) : (
                <List key={1}>
                  <ListItem>
                    <Button className="w-full" onClick={this.startEdit}>
                      <Icon sprite={IconPencilAlt} /> <span>Edit</span>
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ResponseForm post={this.props.post} />
                  </ListItem>
                </List>
              ),
            ]}

          <TagsPanel post={this.props.post} tags={this.props.tags} />
          <NotificationsPanel post={this.props.post} subscribed={this.props.subscribed} />
          <ModerationPanel post={this.props.post} />
        </div>

        <DiscussionPanel post={this.props.post} comments={this.props.comments} />
      </div>
    )
  }
}
