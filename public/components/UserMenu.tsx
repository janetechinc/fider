import React from "react"
import { useFider } from "@fider/hooks"
import { Avatar, Dropdown2 } from "./common"

export const UserMenu = () => {
  const fider = useFider()

  return (
    <Dropdown2 position="left" renderHandle={<Avatar user={fider.session.user} />}>
      <div className="p-2 text-medium uppercase">{fider.session.user.name}</div>
      <Dropdown2.ListItem href="/settings">My Settings</Dropdown2.ListItem>
      <Dropdown2.Divider />

      {fider.session.user.isCollaborator && (
        <>
          <div className="p-2 text-medium uppercase">Administration</div>
          <Dropdown2.ListItem href="/admin">Site Settings</Dropdown2.ListItem>
          <Dropdown2.Divider />
        </>
      )}
      <Dropdown2.ListItem href="/signout?redirect=/">Sign out</Dropdown2.ListItem>
    </Dropdown2>
  )
}
