import React from "react"

import { Modal, Form, Button, PageTitle, Input, Select, SelectOption, ImageUploader } from "@fider/components"

import { UserSettings, UserAvatarType, ImageUpload } from "@fider/models"
import { Failure, actions, Fider } from "@fider/services"
import { NotificationSettings } from "./components/NotificationSettings"
import { APIKeyForm } from "./components/APIKeyForm"
import { DangerZone } from "./components/DangerZone"

interface MySettingsPageState {
  showModal: boolean
  name: string
  newEmail: string
  avatar?: ImageUpload
  avatarType: UserAvatarType
  changingEmail: boolean
  error?: Failure
  userSettings: UserSettings
}

interface MySettingsPageProps {
  userSettings: UserSettings
}

export default class MySettingsPage extends React.Component<MySettingsPageProps, MySettingsPageState> {
  constructor(props: MySettingsPageProps) {
    super(props)
    this.state = {
      showModal: false,
      changingEmail: false,
      avatarType: Fider.session.user.avatarType,
      newEmail: "",
      name: Fider.session.user.name,
      userSettings: this.props.userSettings,
    }
  }

  private confirm = async () => {
    const result = await actions.updateUserSettings({
      name: this.state.name,
      avatarType: this.state.avatarType,
      avatar: this.state.avatar,
      settings: this.state.userSettings,
    })
    if (result.ok) {
      location.reload()
    } else if (result.error) {
      this.setState({ error: result.error })
    }
  }

  private submitNewEmail = async () => {
    const result = await actions.changeUserEmail(this.state.newEmail)
    if (result.ok) {
      this.setState({
        error: undefined,
        changingEmail: false,
        showModal: true,
      })
    } else if (result.error) {
      this.setState({ error: result.error })
    }
  }

  private startChangeEmail = () => {
    this.setState({ changingEmail: true })
  }

  private cancelChangeEmail = async () => {
    this.setState({
      changingEmail: false,
      newEmail: "",
      error: undefined,
    })
  }

  private avatarTypeChanged = (opt?: SelectOption) => {
    if (opt) {
      this.setState({ avatarType: opt.value as UserAvatarType })
    }
  }

  private setName = (name: string) => {
    this.setState({ name })
  }

  private setNotificationSettings = (userSettings: UserSettings) => {
    this.setState({ userSettings })
  }

  private closeModal = () => {
    this.setState({ showModal: false })
  }

  private setNewEmail = (newEmail: string) => {
    this.setState({ newEmail })
  }

  private setAvatar = (avatar: ImageUpload): void => {
    this.setState({ avatar })
  }

  public render() {
    const changeEmail = (
      <Button variant="tertiary" size="small" onClick={this.startChangeEmail}>
        change
      </Button>
    )

    return (
      <div id="p-my-settings" className="page container">
        <Modal.Window isOpen={this.state.showModal} onClose={this.closeModal}>
          <Modal.Header>Confirm your new email</Modal.Header>
          <Modal.Content>
            <div>
              <p>
                We have just sent a confirmation link to <b>{this.state.newEmail}</b>. <br /> Click the link to update your email.
              </p>
              <p>
                <a href="#" onClick={this.closeModal}>
                  OK
                </a>
              </p>
            </div>
          </Modal.Content>
        </Modal.Window>

        <PageTitle title="Settings" subtitle="Manage your profile settings" />

        <div className="w-max-7xl">
          <Form error={this.state.error}>
            <Input
              label="Email"
              field="email"
              value={this.state.changingEmail ? this.state.newEmail : Fider.session.user.email}
              maxLength={200}
              disabled={!this.state.changingEmail}
              afterLabel={this.state.changingEmail ? undefined : changeEmail}
              onChange={this.setNewEmail}
            >
              <p className="text-muted">
                {Fider.session.user.email || this.state.changingEmail
                  ? "Your email is private and will never be publicly displayed."
                  : "Your account doesn't have an email."}
              </p>
              {this.state.changingEmail && (
                <>
                  <Button variant="primary" size="small" onClick={this.submitNewEmail}>
                    Confirm
                  </Button>
                  <Button variant="tertiary" size="small" onClick={this.cancelChangeEmail}>
                    Cancel
                  </Button>
                </>
              )}
            </Input>

            <Input label="Name" field="name" value={this.state.name} maxLength={100} onChange={this.setName} />

            <Select
              label="Avatar"
              field="avatarType"
              defaultValue={this.state.avatarType}
              options={[
                { label: "Letter", value: UserAvatarType.Letter },
                { label: "Gravatar", value: UserAvatarType.Gravatar },
                { label: "Custom", value: UserAvatarType.Custom },
              ]}
              onChange={this.avatarTypeChanged}
            >
              {this.state.avatarType === UserAvatarType.Gravatar && (
                <p className="text-muted mt-1">
                  A{" "}
                  <a className="text-link" rel="noopener" href="https://en.gravatar.com" target="_blank">
                    Gravatar
                  </a>{" "}
                  will be used based on your email. If you don&apos;t have a Gravatar, a letter avatar based on your initials is generated for you.
                </p>
              )}
              {this.state.avatarType === UserAvatarType.Letter && <p className="text-muted">A letter avatar based on your initials is generated for you.</p>}
              {this.state.avatarType === UserAvatarType.Custom && (
                <ImageUploader field="avatar" onChange={this.setAvatar} bkey={Fider.session.user.avatarBlobKey}>
                  <p className="text-muted">
                    We accept JPG, GIF and PNG images, smaller than 100KB and with an aspect ratio of 1:1 with minimum dimensions of 50x50 pixels.
                  </p>
                </ImageUploader>
              )}
            </Select>

            <NotificationSettings userSettings={this.props.userSettings} settingsChanged={this.setNotificationSettings} />

            <Button variant="primary" onClick={this.confirm}>
              Save
            </Button>
          </Form>

          <div className="mt-8">{Fider.session.user.isCollaborator && <APIKeyForm />}</div>
          <div className="mt-8">
            <DangerZone />
          </div>
        </div>
      </div>
    )
  }
}
