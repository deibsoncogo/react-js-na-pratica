/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */

import { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const button = tv({
  base: "inline-flex items-center gap-1.5 text-xs font-medium disabled:opacity-75",

  variants: {
    variant: {
      default: "rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-zinc-300 hover:border-zinc-700",
      primary: "rounded-full bg-teal-400 px-2 py-1 text-teal-950 hover:bg-teal-500",
    },

    size: {
      default: "",
      icon: "p-1.5",
    },
  },

  defaultVariants: {
    variant: "default",
  },
})

export interface ButtonProps
  extends ComponentProps<"button">,
  VariantProps<typeof button> { }

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, size, className })} />
}
