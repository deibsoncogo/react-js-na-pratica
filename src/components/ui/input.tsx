/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */

import { ComponentProps, createContext, ReactNode, useContext } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const input = tv({
  slots: {
    root: "border border-zinc-700 bg-zinc-800/50",
    control: "text-zinc-100 placeholder-zinc-500",
  },

  variants: {
    variant: {
      default: {},
      filter: {
        root: "flex items-center gap-1.5 rounded-full border-dashed px-3 py-1.5 text-xs leading-tight text-zinc-500 focus-within:border-zinc-600",
        control: "flex-1 bg-transparent outline-none",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const inputContext = createContext({} as VariantProps<typeof input>)

export function Input({
  children,
  variant,
}: { children: ReactNode } & VariantProps<typeof input>) {
  const { root } = input({ variant })

  return (
    <inputContext.Provider value={{ variant }}>
      <div className={root()}>{children}</div>
    </inputContext.Provider>
  )
}

export interface ControlProps extends ComponentProps<"input"> { }

export function Control({ className, ...props }: ControlProps) {
  const { variant } = useContext(inputContext)
  const { control } = input({ variant })

  return <input className={control({ className })} {...props} />
}
