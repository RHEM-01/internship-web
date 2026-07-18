import { cn } from "@/lib/utils"

/**
 * Renders a styled placeholder for loading content.
 *
 * @param className - Additional CSS classes to apply to the placeholder
 * @param props - Additional properties forwarded to the underlying `div`
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-xl bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
