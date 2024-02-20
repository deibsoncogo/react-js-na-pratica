/* eslint-disable react/jsx-props-no-spreading */

import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const badge = tv({
  base: "inline-block rounded-full px-2 py-1 text-[0.625rem] font-semibold",

  variants: {
    variant: {
      ghost: "bg-zinc-800 text-zinc-500",
      primary: "bg-teal-950 text-teal-300",
    },
  },

  defaultVariants: {
    variant: "ghost",
  },
})

interface BadgeProps
  extends ComponentProps<"span">,
  VariantProps<typeof badge> { }

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badge({ variant, className })} {...props} />
}
