import './Message.less'

import { Popup, Tag, Alert } from 'tdesign-react/esm'
import { Message, User } from 'conversation-space'
import UserCard from './UserCard'
import UserAvatar from './UserAvatar'

export interface MessageProps extends Omit<Message, 'userId'>{
  user: User
  mode?: 'text' | 'bubble'
}

export default function (props: MessageProps) {
  return (
    <div id={props.id}
         className={['message', props.mode ?? 'text'].join(' ')}>
      {props.user
        ? <>
          <Popup
            placement='right'
            showArrow
            trigger='click'
            content={<UserCard user={props.user}/>}
          >
            <UserAvatar {...props.user} />
          </Popup>
          <div className='message__body'>
            <div className='message__header'>
              <div className='message__title'>{props.user.name}</div>
              {props.user.tags?.map((tag, index) => <Tag
                key={index}
                size='small'
                theme='primary'
                variant='outline'
              >
                {tag}
              </Tag>)}
            </div>
            <pre className='message__content'>
          {props.content}
        </pre>
            <div className='message__footer'>
              <div className="message__actions">
                {props.actions?.map((action, key) => <Tag
                  key={key}
                  theme='success'
                  variant='outline'
                  style={{
                    fontSize: '1.3rem',
                  }}
                >
                  {action}
                </Tag>)}
                <Tag
                  theme='success'
                  variant='outline'
                  className='message__add-action'
                >
              <span className='material-icons'
                    style={{
                      marginTop: '5px',
                      fontSize: '1.3rem',
                    }}
              >add_reaction</span>
                </Tag>
              </div>
              <div className='message__datetime'>{props.datetime}</div>
            </div>
          </div>
        </>
        : <Alert
          close={false}
          message={`ID 为 ${props.id} 的消息不存在用户，无法展示。消息内容为：「${props.content}」`}
          theme='error'
          style={{ width: '100%' }}
        />
      }
    </div>
  )
}
