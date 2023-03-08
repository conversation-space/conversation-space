import './Sender.less'

import { useState } from 'react'
import { Button, Textarea } from 'tdesign-react/esm'

interface SenderProps {
  onChange?: (message: string) => void | Promise<void>
  onSend?: (message: string) => void | Promise<void>
}

export default function (props: SenderProps) {
  const [message, setMessage] = useState('')
  function changeMessage(m: string) {
    setMessage(m)
    props.onChange?.(m)
  }
  return (
    <div className='sender'>
      <div className='sender__header'>
        <div className="material-icons action emotion">emoji_emotions</div>
      </div>
      <div className='sender__body'>
        <Textarea
          autosize={{ maxRows: 5 }}
          value={message}
          onChange={changeMessage}
          onKeydown={async (v, { e }) => {
            if ((e.ctrlKey || e.metaKey) && e.which === 13) {
              await props.onSend?.(message.trim())
              setMessage('')
            }
          }}
        />
        <Button
          size='medium'
          icon={<span className="material-icons">send</span>}
          onClick={async () => {
            await props.onSend?.(message.trim())
            setMessage('')
          }}
        />
      </div>
    </div>
  )
}
