import { useEffect, useState } from 'react'

export function classnames(...args: (string | undefined | null | false)[]) {
  return args.filter(Boolean).join(' ')
}

export interface UseValueProps<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

export function useValue<T>(props: UseValueProps<T>) {
  const [value, setValue] = useState(props.defaultValue)

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value)
    }
  }, [props.value])

  return [value, props.onChange || setValue] as const
}
