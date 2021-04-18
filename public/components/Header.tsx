import React, { useState } from "react"
import { SignInModal, TenantLogo, DevBanner, NotificationIndicator, UserMenu } from "@fider/components"
import { useFider } from "@fider/hooks"
import { HStack } from "./layout"

export const Header = () => {
  const fider = useFider()
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const showModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSignInModalOpen(true)
  }

  const hideModal = () => setIsSignInModalOpen(false)

  return (
    <>
      <DevBanner />
      <div id="c-header">
        <SignInModal isOpen={isSignInModalOpen} onClose={hideModal} />
        <HStack className="c-menu shadow h-12">
          <HStack justify="between" className="container">
            <a href="/" className="c-menu-item-title">
              <TenantLogo size={100} />
              <h1 className="text-display">{fider.session.tenant.name}</h1>
            </a>
            {fider.session.isAuthenticated && (
              <HStack spacing={2}>
                <NotificationIndicator />
                <UserMenu />
              </HStack>
            )}
            {!fider.session.isAuthenticated && (
              <a href="#" className="uppercase text-caption" onClick={showModal}>
                Sign in
              </a>
            )}
          </HStack>
        </HStack>
      </div>
    </>
  )
}
