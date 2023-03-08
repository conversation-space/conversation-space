import './TouchBar.less'

import { Button } from 'tdesign-react/esm'
import { StyledProps } from 'tdesign-react/esm/common'
import UserAvatar from './UserAvatar'
import { DSChatroom } from '../plugins'
import { classnames } from '../utils'
import Loading from './Loading'
import { useHistory } from '../hooks/history'

export interface TouchBarProps extends StyledProps {
  isLoading: boolean
  chatrooms: DSChatroom[]
  index: number
  onSelect: (index: number) => void
}

export default function (props: TouchBarProps) {
  const history = useHistory()

  return <div className='touch-bar' style={props.style}>
    <div className='touch-bar__chatrooms'>
      <div className='trigger add'
           onClick={() => history.goto('/create-chatroom')}
      >
        <Button className='btn create'
                variant='text'
                size='medium'
                shape='square'
        >
          <span className='material-icons'>add</span>
        </Button>
        <div className='content'>
          <div className='title'>
            创建聊天室
          </div>
        </div>
      </div>
      {props.isLoading
        ? <Loading />
        : props.chatrooms.map((chatroom, index) => (
          <div key={chatroom.id}
               className={classnames(
                 'trigger',
                 index === props.index ? 'active' : undefined
               )}
               onClick={() => {
                 history.goto('/chatrooms')
                 props.onSelect(index)
               }}
          >
            <UserAvatar name={chatroom.title} shape='round' />
            <div className='content'>
              <div className='title'>
                {chatroom.title}
              </div>
              <div className='desc'>
                {chatroom.description}
              </div>
            </div>
          </div>
        ))}
    </div>
    <div className='touch-bar__opts'>
      <Button className='btn change-theme'
              variant='text'
              size='medium'
      >
        <span className='material-icons'>light</span>
        <span className='desc'>改变主题</span>
      </Button>
      <Button className='btn settings'
              variant='text'
              size='medium'
              onClick={() => history.goto('/settings')}
      >
        <span className='material-icons'>settings</span>
        <span className='desc'>系统配置</span>
      </Button>
      <Button className='btn about'
              variant='text'
              size='medium'
              onClick={() => history.goto('/about')}
      >
        <span className='material-icons'>info</span>
        <span className='desc'>关于应用</span>
      </Button>
      <Button className='btn logout'
              variant='text'
              size='medium'
      >
        <span className='material-icons'>logout</span>
        <span className='desc'>退出登陆</span>
      </Button>
    </div>
  </div>
}
