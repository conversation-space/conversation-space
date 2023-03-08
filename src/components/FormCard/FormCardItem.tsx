import { Children, cloneElement, ReactNode } from 'react'
import { Form } from 'conversation-space/components/FormCard'
import { classnames } from 'conversation-space/utils'

export interface FormCardItemProps {
  uKey: string
  form?: Form
  label?: string
  description?: ReactNode
  isTall?: boolean
  children: ReactNode
}

export function FormCardItem(props: FormCardItemProps) {
  const { uKey, label, description, form, isTall, children } = props

  return <div className={classnames(
    'form-card__item',
    uKey,
    isTall ? 'tall' : undefined,
  )}>
    {label && <div className='label'>
      {label}
      {description && <div className='desc'>{description}</div>}
    </div>}
    <div className='input'>
      {form
        ? cloneElement(Children.only(children) as any, {
          value: form.value[uKey],
          defaultValue: form.defaultValue[uKey],
          onChange: (value: any) => {
            form.onChange({
              ...form.value,
              [uKey]: value
            })
          }
        })
        : children}
    </div>
  </div>
}
