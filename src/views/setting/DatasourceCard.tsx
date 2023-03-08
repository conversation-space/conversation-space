import './DatasourceCard.less'

import { CSSProperties } from 'react'
import { User } from 'conversation-space'
import UserCard from 'conversation-space/components/UserCard'
import { Datasource } from 'conversation-space/plugins'
import { classnames, useValue } from 'conversation-space/utils'
import FormCard from 'conversation-space/components/FormCard'

export interface UsersConfigureProps {
  value?: User[]
  defaultValue?: User[]
  onChange?: (value: User[]) => void
}

export function UsersConfigure(props: UsersConfigureProps) {
  const [users = [], setValue] = useValue(props)

  return <div className='users'>
    共 {users.length} 人（向下滚动查看更多）
    {users.map(u => <UserCard
      key={u.id}
      user={u}
      onlyHeader
    />)}
  </div>
}

export interface DatasourceCardProps extends Pick<
  Datasource,
  | 'type'
  | 'me'
> {
  className?: string
  style?: CSSProperties
}

export default function (props: DatasourceCardProps) {
  const t = [
    {
      id: '1',
      name: '一介',
      avatar: 'https://avatars.githubusercontent.com/u/51358815?v=4'
    },
    {
      id: '2',
      name: '菜月昂',
      avatar: 'https://i04piccdn.sogoucdn.com/289e9290e9a4b967'
    },
    {
      id: '3',
      name: '春日野悠',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcxxP-Iw570BQ1cjculGqchJuXFAZ9KPCzv5K9cnLqHg&s'
    },
    {
      id: '4',
      name: '桐人',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDeT0GFqD8D9OAEZqyzDP4OpsIINoosS8DOAy4hsc&s'
    },
  ]
  return <FormCard
    title={props.type}
    actions={{ switchEnable: true }}
    className={classnames('datasource-card', props.className)}
    style={props.style}
  >
    <FormCard.Item
      uKey='users'
      isTall
      label='用户'
      description='该数据源配置的多个用户'
    >
      <UsersConfigure />
    </FormCard.Item>
  </FormCard>
}
