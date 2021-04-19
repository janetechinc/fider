import React from "react"
import { Button } from "@fider/components"
import { actions } from "@fider/services"

interface APIKeyFormState {
  apiKey?: string
}

export class APIKeyForm extends React.Component<any, APIKeyFormState> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  private regenerate = async () => {
    const result = await actions.regenerateAPIKey()
    if (result.ok) {
      this.setState({ apiKey: result.data.apiKey })
    }
  }

  private showAPIKey() {
    return (
      <>
        <p className="text-muted">
          Your new API Key is: <code>{this.state.apiKey}</code>
        </p>
        <p className="text-muted">Stored it securely on your servers and never store it in the client side of your app.</p>
      </>
    )
  }

  public render() {
    return (
      <div>
        <h4 className="text-title mb-1">API Key</h4>
        <p className="text-muted">
          The API Key is only shown whenever generated. If your Key is lost or has been compromised, generated a new one and take note of it.
        </p>
        <p className="text-muted">
          To learn how to use the API, read the{" "}
          <a className="text-link" rel="noopener" href="https://getfider.com/docs/api" target="_blank">
            official documentation
          </a>
          .
        </p>
        <p>
          <Button size="small" onClick={this.regenerate}>
            Regenerate API Key
          </Button>
        </p>
        {this.state.apiKey && this.showAPIKey()}
      </div>
    )
  }
}
