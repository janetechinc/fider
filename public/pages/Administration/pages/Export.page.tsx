import React from "react"

import { Button, Form, Field, Segment, Icon } from "@fider/components"
import { AdminBasePage } from "../components/AdminBasePage"
import IconDownload from "@fider/assets/images/heroicons-download.svg"

export default class ExportPage extends AdminBasePage<any, any> {
  public id = "p-admin-export"
  public name = "export"
  public title = "Export"
  public subtitle = "Download your data"

  public content() {
    return (
      <Form>
        <Segment>
          <Field label="Export Posts">
            <p className="text-muted">
              Use this button to download a CSV file with all posts in this site. This can be useful to analyse the data with an external tool or simply to back
              it up.
            </p>
          </Field>
          <Field>
            <Button variant="secondary" href="/admin/export/posts.csv">
              <Icon sprite={IconDownload} />
              <span>posts.csv</span>
            </Button>
          </Field>
        </Segment>
        <Segment>
          <Field label="Backup your data">
            <p className="text-muted">
              Use this button to download a ZIP file with your data in JSON format. This is a full backup and contains all of your data.
            </p>
          </Field>
          <Field>
            <Button variant="secondary" href="/admin/export/backup.zip">
              <Icon sprite={IconDownload} />
              <span>backup.zip</span>
            </Button>
          </Field>
        </Segment>
      </Form>
    )
  }
}
