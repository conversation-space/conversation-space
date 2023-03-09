import './Chatroom.less'

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import useSwr from 'swr'
import { Button, Drawer } from 'tdesign-react/esm'
import { User } from 'conversation-space/types'
import { DSChatroom } from 'conversation-space/plugins'
import { datasourceContext } from 'conversation-space/contexts/datasource'
import Sender from 'conversation-space/components/Sender'
import Message from 'conversation-space/components/Message'
import ChatroomConfiguration from 'conversation-space/components/ChatroomConfiguration'
import Loading from 'conversation-space/components/Loading'

export interface ChatroomProps extends DSChatroom {
}

function useChatroom(chatroom: DSChatroom) {
  const datasourceCtx = useContext(datasourceContext)
  if (!datasourceCtx)
    throw new Error('Datasource context not found')

  const getMessagesCallback = useCallback(
    () => datasourceCtx.getMessages(chatroom),
    [chatroom]
  )
  const {
    data: messages = [],
    isLoading,
    mutate,
    error
  } = useSwr(['messages', chatroom], getMessagesCallback)

  const getUsersCallback = useCallback(
    () => datasourceCtx.getChatroomUsers(chatroom, chatroom.members),
    [chatroom]
  )
  const {
    data: users,
    isLoading: isLoadingUsers,
  } = useSwr(['users', chatroom], getUsersCallback)

  const userMap = useMemo<Record<string, User>>(() => users?.reduce((acc, u) => ({
    [u.id]: u,
    ...acc,
  }), {}) ?? {}, [users])

  useEffect(() => {
    const onMessage: Parameters<typeof datasourceCtx.on>[2] = function (chatroomId, message) {
      mutate();
    }
    datasourceCtx.on('message', chatroom, onMessage)
    return () => datasourceCtx.off('message', chatroom, onMessage)
  }, [datasourceCtx])

  return {
    isLoading: isLoading || isLoadingUsers,
    messages: messages.map(m => ({
      ...m,
      user: userMap[m.userId],
    })),
    refetchMessages: mutate,
  }
}

export default function (props: ChatroomProps) {
  const datasourceCtx = useContext(datasourceContext)
  if (!datasourceCtx)
    throw new Error('Datasource context not found')

  const { ...chatroom } = props

  const { messages, isLoading, refetchMessages } = useChatroom(chatroom)

  const messagesRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (messagesRef.current && !isLoading) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messagesRef.current, isLoading])

  const [showConfiguration, setShowConfiguration] = useState(false)

  function keepBottom() {
    const element = messagesRef.current
    const isBottom = !!element && Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 10
    setTimeout(() => {
      if (element && isBottom) {
        element.scrollTop = element.scrollHeight
      }
    }, 10)
  }

  return <div className='chatroom'>
    <Drawer
      visible={showConfiguration}
      header='聊天室配置'
      onClose={() => setShowConfiguration(false)}
      size='medium'
    >
      {showConfiguration && <ChatroomConfiguration chatroom={chatroom} />}
    </Drawer>
    <div className='chatroom__header'>
      <div className='chatroom__header-content'>
        <div className='chatroom__title'>
          {chatroom.title}
        </div>
        <pre className='chatroom__desc'>
          {chatroom.description ?? '暂无简介'}
        </pre>
      </div>
      <div className='chatroom__header-opts'>
        <Button
          variant='text'
          shape='square'
          onClick={() => setShowConfiguration(true)}
        >
          <span className='material-icons'>settings</span>
        </Button>
      </div>
    </div>
    <div className='chatroom__body'>
      <div
        ref={messagesRef}
        className='messages'
      >
        {isLoading
          ? <div style={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}>
              <Loading />
            </div>
          : messages.map((message, index) => <Message
              key={message.id}
              mode='text'
              {...message}
            />)}
      </div>
      <Sender
        onChange={keepBottom}
        onSend={async message => {
          await datasourceCtx?.send(chatroom, message)
          await refetchMessages()
          setTimeout(() => keepBottom(), 10)
        }}
      />
    </div>
    <div className='chatroom__footer'>
    </div>
  </div>
}
