import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-base shadow-sm backdrop-blur-sm transition-all outline-none resize-none focus-visible:border-gray-400 focus-visible:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:border-red-400 aria-invalid:bg-red-50/30",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
