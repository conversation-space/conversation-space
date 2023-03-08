import './index.less'

import { Children, cloneElement, ReactNode, useState } from 'react'
import { Card, CardProps, Switch } from 'tdesign-react/esm'
import { classnames } from 'conversation-space/utils'
import { FormCardItem } from 'conversation-space/components/FormCard/FormCardItem'

export interface Form {
  defaultValue: any
  value: any
  onChange: (value: any) => void
}

export interface FormCardProps extends Omit<CardProps, 'actions'> {
  actions?: {
    switchEnable?: boolean
  }
  children: ReactNode
}

export default function FormCard(props: FormCardProps) {
  const {
    children, actions = {}, className,
    ...rest
  } = props
  const form = {
    value: {},
    defaultValue: {},
    onChange() {}
  }
  const [enable, setEnable] = useState(true)
  return <Card
    className={classnames('form-card', className)}
    actions={Object.keys(actions).length > 0 ? <>
      {actions?.switchEnable && <Switch
        value={enable}
        onChange={setEnable}
      />}
    </> : null}
    {...rest}
  >
    {enable && Children.map(children, child => {
      if (child === null || child === undefined)
        return null
      if (
        typeof child === 'string'
        || typeof child === 'number'
        || typeof child === 'boolean'
      )
        return child

      return cloneElement(child as any, {
        form: form,
      })
    })}
  </Card>
}

FormCard.Item = FormCardItem
