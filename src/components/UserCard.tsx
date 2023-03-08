import './UserCard.less'

import { Drawer, Tag } from 'tdesign-react/esm'
import { User } from 'conversation-space'
import UserAvatar from './UserAvatar'
import UserConfiguration from './UserConfiguration'
import { useState } from 'react'

export interface UserCardProps {
  user: User
  onlyHeader?: boolean
}

export default function (props: UserCardProps) {
  const { user, onlyHeader = false } = props
  const { name, avatar, tags, ...items } = user
  const [userConfigurationDrawerVisble, setUserConfigurationDrawerVisble] = useState<boolean>(false)
  return <div className='user-card'>
    <Drawer
      size='medium'
      zIndex={6000}
      visible={userConfigurationDrawerVisble}
      onClose={() => setUserConfigurationDrawerVisble(false)}
      header='用户配置'
    >
      {userConfigurationDrawerVisble && <UserConfiguration user={user} />}
    </Drawer>
    <div className='user-card__header'>
      <UserAvatar {...props.user} />
      <div className='user-card__name'>{name}</div>
      <span className='material-icons setting'
            onClick={() => setUserConfigurationDrawerVisble(true)}
      >settings</span>
    </div>
    {!onlyHeader && <>
      {tags && <div className='user-card__tags'>
        {tags?.map((tag, index) => <Tag
          key={index}
          size='small'
          theme='primary'
          variant='outline'
        >
          {tag}
        </Tag>)}
      </div>}
      <div className='user-card__body'>
        {Object.entries(items).map(([key, value]) => {
          return <div className='user-card__item' key={key}>
            <div className='user-card__item__key'>{key}</div>
            <div className='user-card__item__value'>{value}</div>
          </div>
        })}
      </div>
    </>}
  </div>
}
