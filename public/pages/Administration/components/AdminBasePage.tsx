import "./AdminBasePage.scss"

import React from "react"
import { PageTitle } from "@fider/components"
import { SideMenu, SideMenuToggler } from "./SideMenu"
import { HStack } from "@fider/components/layout"

export abstract class AdminBasePage<P, S> extends React.Component<P, S> {
  public abstract id: string
  public abstract name: string
  public abstract title: string
  public abstract subtitle: string
  public abstract content(): JSX.Element

  private toggleSideMenu = (active: boolean) => {
    const classes = ["sm:hidden", "md:hidden"]
    const el = document.querySelector(".c-side-menu") as HTMLElement
    if (el && active) {
      el.classList.remove(...classes)
    } else if (el && !active) {
      el.classList.add(...classes)
    }
  }

  public render() {
    return (
      <div id={this.id} className="page container">
        <HStack justify="between">
          <PageTitle title={this.title} subtitle={this.subtitle} />
          <SideMenuToggler onToggle={this.toggleSideMenu} />
        </HStack>

        <div className="c-admin-basepage">
          <SideMenu className="sm:hidden md:hidden" activeItem={this.name} />
          <div>{this.content()}</div>
        </div>
      </div>
    )
  }
}
