import { Form, Input, Textarea } from 'tdesign-react/esm'
import { DSChatroom } from '../plugins'

export interface ChatroomConfigurationProps {
  chatroom: DSChatroom
}

export default function ({
  chatroom
}: ChatroomConfigurationProps) {
  return <Form
    labelAlign='right'
    labelWidth='100px'
    layout='vertical'
    resetType='empty'
    showErrorMessage
    preventSubmitDefault
  >
    <Form.FormItem
      initialData={chatroom.title}
      label='标题'
      name='title'
    >
      <Input
        type='text'
        align='left'
        placeholder='请输入内容'
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={chatroom.description}
      label='介绍'
      name='description'
    >
      <Textarea
        placeholder='请输入介绍'
        autosize={{
          maxRows: 5,
          minRows: 1,
        }}
      />
    </Form.FormItem>
  </Form>
}
