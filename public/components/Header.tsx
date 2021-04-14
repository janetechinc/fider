import "./Header.scss"

import React, { useState } from "react"
import { SignInModal, Avatar, TenantLogo, DevBanner, NotificationIndicator } from "@fider/components"
import { useFider } from "@fider/hooks"
import { HStack } from "./layout"

export const Header = () => {
  const fider = useFider()
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const showModal = () => {
    if (!fider.session.isAuthenticated) {
      setIsSignInModalOpen(true)
    }
  }

  const hideModal = () => setIsSignInModalOpen(false)

  const items = fider.session.isAuthenticated && (
    <div className="c-menu-user">
      <div className="c-menu-user-heading">
        <span>{fider.session.user.name}</span>
      </div>
      <a href="/settings" className="c-menu-user-item">
        My Settings
      </a>
      <div className="c-menu-user-divider" />
      {fider.session.user.isCollaborator && [
        <div key={1} className="c-menu-user-heading">
          <span>Administration</span>
        </div>,
        <a key={2} href="/admin" className="c-menu-user-item">
          Site Settings
        </a>,
        <div key={5} className="c-menu-user-divider" />,
      ]}
      <a href="/signout?redirect=/" className="c-menu-user-item signout">
        Sign out
      </a>
    </div>
  )

  // const showRightMenu = fider.session.isAuthenticated || !fider.session.tenant.isPrivate
  return (
    <>
      <DevBanner />
      <div id="c-header">
        <SignInModal isOpen={isSignInModalOpen} onClose={hideModal} />
        <div className="c-menu shadow">
          <div className="container">
            <a href="/" className="c-menu-item-title">
              <TenantLogo size={100} />
              <h1 className="text-display">{fider.session.tenant.name}</h1>
            </a>
            {fider.session.isAuthenticated && (
              <HStack onClick={showModal} className="c-menu-item-signin">
                <NotificationIndicator />
                <Avatar user={fider.session.user} />
                {items}
              </HStack>
            )}
            {!fider.session.isAuthenticated && (
              <HStack onClick={showModal} className="c-menu-item-signin">
                <span>Sign in</span>
              </HStack>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
