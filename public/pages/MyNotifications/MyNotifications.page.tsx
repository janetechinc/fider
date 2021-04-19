import React from "react"

import { Notification } from "@fider/models"
import { MultiLineText, Moment, PageTitle } from "@fider/components"
import { actions } from "@fider/services"
import { HStack, VStack } from "@fider/components/layout"

interface MyNotificationsPageProps {
  notifications: Notification[]
}

interface MyNotificationsPageState {
  unread: Notification[]
  recent: Notification[]
}

export default class MyNotificationsPage extends React.Component<MyNotificationsPageProps, MyNotificationsPageState> {
  constructor(props: MyNotificationsPageProps) {
    super(props)

    const [unread, recent] = (this.props.notifications || []).reduce(
      (result, item) => {
        result[item.read ? 1 : 0].push(item)
        return result
      },
      [[] as Notification[], [] as Notification[]]
    )

    this.state = {
      unread,
      recent,
    }
  }

  private items(notifications: Notification[]): JSX.Element[] {
    return notifications.map((n) => {
      return (
        <div key={n.id}>
          <a className="text-link block" href={`/notifications/${n.id}`}>
            <MultiLineText text={n.title} style="full" />
          </a>
          <span className="text-muted">
            <Moment date={n.createdAt} />
          </span>
        </div>
      )
    })
  }

  private markAllAsRead = async (e: React.MouseEvent) => {
    e.preventDefault()

    const response = await actions.markAllAsRead()
    if (response.ok) {
      location.reload()
    }
  }

  public render() {
    return (
      <div id="p-my-notifications" className="page container">
        <PageTitle title="Notifications" subtitle="Stay up to date with what's happening" />

        <HStack spacing={4} className="mt-8 mb-2">
          <h4 className="text-title">Unread</h4>
          {this.state.unread.length > 0 && (
            <a href="#" className="text-link text-xs" onClick={this.markAllAsRead}>
              Mark All as Read
            </a>
          )}
        </HStack>

        <VStack spacing={8}>
          {this.state.unread.length > 0 && this.items(this.state.unread)}
          {this.state.unread.length === 0 && <span className="text-muted">No unread notifications.</span>}
        </VStack>

        {this.state.recent.length > 0 && (
          <>
            <h4 className="text-title mt-8 mb-2">Read on last 30 days</h4>
            <VStack spacing={4}>{this.items(this.state.recent)}</VStack>
          </>
        )}
      </div>
    )
  }
}
