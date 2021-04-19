import React from "react"
import { PageTitle } from "@fider/components"
import { SideMenu, SideMenuToggler } from "./SideMenu"

export abstract class AdminBasePage<P, S> extends React.Component<P, S> {
  public abstract id: string
  public abstract name: string
  public abstract title: string
  public abstract subtitle: string
  public abstract content(): JSX.Element

  private toggleSideMenu = (active: boolean) => {
    const el = document.querySelector(".lg:hidden .c-side-menu") as HTMLElement
    if (el) {
      el.style.display = active ? "" : "none"
    }
  }

  public render() {
    return (
      <div id={this.id} className="page container">
        <PageTitle title={this.title} subtitle={this.subtitle} />
        <SideMenuToggler onToggle={this.toggleSideMenu} />

        <div className="row">
          <div className="col-lg-2 sm:hidden md:hidden">
            <SideMenu visible={true} activeItem={this.name} />
          </div>
          <div className="col-lg-10 col-md-12">
            <SideMenu className="lg:hidden xl:hidden" visible={false} activeItem={this.name} />
            {this.content()}
          </div>
        </div>
      </div>
    )
  }
}
