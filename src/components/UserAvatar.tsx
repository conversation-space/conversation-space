import './UserAvatar.less'

import { UserIcon } from 'tdesign-icons-react'
import { Avatar, ShapeEnum } from 'tdesign-react/esm'

export interface UserAvatarProps {
  name?: string
  shape?: ShapeEnum
  avatar?: string
  className?: string
}

export default function (props: UserAvatarProps) {
  const { name, shape, avatar, className, ...rest } = props
  return <>
    {props.avatar
    ? <Avatar {...rest}
              shape={shape}
              className={[props.className, 'user-avatar'].filter(Boolean).join(' ')}
              image={props.avatar} />
    : props.name
    ? <Avatar {...rest}
              shape={shape}
              className={[props.className, 'user-avatar'].filter(Boolean).join(' ')}
        >{props.name[0]}</Avatar>
    : <Avatar {...rest}
              shape={shape}
              className={[props.className, 'user-avatar'].filter(Boolean).join(' ')}
              icon={<UserIcon />} />}
  </>
}
