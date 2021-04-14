import React from "react"
import { useFider } from "@fider/hooks"

export const FiderVersion = () => {
  const fider = useFider()

  return (
    <p className="text-muted text-center hidden-sm hidden-md">
      Support our{" "}
      <a className="text-link" rel="noopener" target="_blank" href="http://opencollective.com/fider">
        OpenCollective
      </a>
      <br />
      Fider v{fider.settings.version}
    </p>
  )
}
