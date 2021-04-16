import React from "react"

import { Segment, List, ListItem, Button, PageTitle, OAuthProviderLogo } from "@fider/components"
import { OAuthConfig, OAuthProviderOption } from "@fider/models"
import { OAuthForm } from "../components/OAuthForm"
import { actions, notify, Fider } from "@fider/services"
import { AdminBasePage } from "../components/AdminBasePage"

import IconPlay from "@fider/assets/images/heroicons-play.svg"
import IconPencilAlt from "@fider/assets/images/heroicons-pencil-alt.svg"

import "./ManageAuthentication.page.scss"

interface ManageAuthenticationPageProps {
  providers: OAuthProviderOption[]
}

interface ManageAuthenticationPageState {
  isAdding: boolean
  editing?: OAuthConfig
}

export default class ManageAuthenticationPage extends AdminBasePage<ManageAuthenticationPageProps, ManageAuthenticationPageState> {
  public id = "p-admin-authentication"
  public name = "authentication"
  public title = "Authentication"
  public subtitle = "Manage your site authentication"

  constructor(props: ManageAuthenticationPageProps) {
    super(props)
    this.state = {
      isAdding: false,
    }
  }

  private addNew = async () => {
    this.setState({ isAdding: true, editing: undefined })
  }

  private edit = async (provider: string) => {
    const result = await actions.getOAuthConfig(provider)
    if (result.ok) {
      this.setState({ editing: result.data, isAdding: false })
    } else {
      notify.error("Failed to retrieve OAuth configuration. Try again later")
    }
  }

  private startTest = async (provider: string) => {
    const redirect = `${Fider.settings.baseURL}/oauth/${provider}/echo`
    window.open(`/oauth/${provider}?redirect=${redirect}`, "oauth-test", "width=1100,height=600,status=no,menubar=no")
  }

  private cancel = async () => {
    this.setState({ isAdding: false, editing: undefined })
  }

  public content() {
    if (this.state.isAdding) {
      return <OAuthForm onCancel={this.cancel} />
    }

    if (this.state.editing) {
      return <OAuthForm config={this.state.editing} onCancel={this.cancel} />
    }

    const enabled = <p className="m-enabled">Enabled</p>
    const disabled = <p className="m-disabled">Disabled</p>

    return (
      <>
        <PageTitle title="OAuth Providers" subtitle="You can use these section to add any authentication provider thats supports the OAuth2 protocol." />
        <p className="text-muted">
          Additional information is available in our{" "}
          <a rel="noopener" target="_blank" href="https://getfider.com/docs/configuring-oauth/">
            OAuth Documentation
          </a>
          .
        </p>
        <Segment>
          <List divided={true}>
            {this.props.providers.map((o) => (
              <ListItem key={o.provider}>
                {o.isCustomProvider && (
                  <>
                    {Fider.session.user.isAdministrator && (
                      <Button onClick={this.edit.bind(this, o.provider)} size="tiny" className="right">
                        <IconPencilAlt />
                        <span>Edit</span>
                      </Button>
                    )}
                    <Button onClick={this.startTest.bind(this, o.provider)} size="tiny" className="right">
                      <IconPlay />
                      <span>Test</span>
                    </Button>
                  </>
                )}
                <div className="l-provider">
                  <OAuthProviderLogo option={o} />
                  <strong>{o.displayName}</strong>
                  {o.isEnabled ? enabled : disabled}
                </div>
                {o.isCustomProvider && (
                  <span className="text-muted">
                    <strong>Client ID:</strong> {o.clientID} <br />
                    <strong>Callback URL:</strong> {o.callbackURL}
                  </span>
                )}
              </ListItem>
            ))}
          </List>
        </Segment>
        {Fider.session.user.isAdministrator && (
          <Button variant="primary" onClick={this.addNew}>
            Add new
          </Button>
        )}
      </>
    )
  }
}
