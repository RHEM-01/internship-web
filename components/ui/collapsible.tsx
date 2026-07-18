"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

/**
 * Renders a collapsible container.
 *
 * @param props - Props forwarded to the collapsible root component.
 */
function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Renders a trigger for a collapsible section.
 *
 * @param props - Properties forwarded to the collapsible trigger.
 */
function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

/**
 * Renders the content panel for a collapsible component.
 *
 * @param props - Properties forwarded to the collapsible content panel.
 */
function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
