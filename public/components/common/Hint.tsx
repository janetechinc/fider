import "./Hint.scss"

import React, { useState } from "react"
import IconX from "@fider/assets/images/heroicons-x.svg"
import IconInformationCircle from "@fider/assets/images/heroicons-information-circle.svg"
import { HStack } from "@fider/components/layout"
import { cache } from "@fider/services"

interface HintProps {
  permanentCloseKey?: string
  condition?: boolean
}

export const Hint: React.FC<HintProps> = (props) => {
  const cacheKey: string | undefined = props.permanentCloseKey ? `Hint-Closed-${props.permanentCloseKey}` : undefined
  const [isClosed, setIsClosed] = useState<boolean>(cacheKey ? cache.local.has(cacheKey) : false)

  const close = () => {
    if (cacheKey) {
      cache.local.set(cacheKey, "true")
    }
    setIsClosed(true)
  }

  if (props.condition === false || isClosed) {
    return null
  }
  return (
    <HStack className="c-hint">
      <IconInformationCircle height="16" /> <span>{props.children}</span>
      {cacheKey && <IconX onClick={close} className="c-hint-close" />}
    </HStack>
  )
}
